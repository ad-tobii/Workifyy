import JobTabs from './Components/JobTabs'
import useProStore from '../../../store/proStore.store'
import useJobStore from '../../../store/jobStore.store'
import JobCard from '../JobCard'

const JobPage = () => {
  const jobTab = useProStore(state => state.jobTab)
  const jobs = useJobStore(state => state.jobs)

  return (
    <div className="mt-4 flex flex-col items-center space-y-6 pb-48 text-white">
      <JobTabs />
      {jobTab === 'Find Jobs' && jobs.map(job => <JobCard key={job._id} job={job} />)}
    </div>
  )
}

export default JobPage
