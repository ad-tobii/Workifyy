import { ClockIcon } from '@heroicons/react/24/outline'
import useJobStore from '../../../../store/useJobStore'
import JobCard from '../HomePage/Components/JobCard'

const HistoryPage = () => {
  const jobs = useJobStore(state => state.jobs)
  const completedJobs = jobs.filter(job => job.status === 'completed')

  if (completedJobs.length === 0) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-3 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800">
          <ClockIcon className="h-8 w-8 text-zinc-500" />
        </div>
        <p className="text-lg font-semibold text-white">No completed jobs</p>
        <p className="text-sm text-zinc-500">Jobs you complete will appear here</p>
      </div>
    )
  }

  return (
    <div className="w-full space-y-4 pb-8">
      {completedJobs.map(job => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  )
}

export default HistoryPage
