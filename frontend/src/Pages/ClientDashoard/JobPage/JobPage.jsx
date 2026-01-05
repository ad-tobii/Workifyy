import JobTabs from './Components/JobTabs'
import PostJobPage from './PostJobPage/PostJob'
import useClientStore from '../../../store/clientStore.store'

const JobPage = () => {
  const jobTab = useClientStore(state => state.jobTab)
  return (
    <div className="mt-4 flex flex-col items-center space-y-6 pb-48 text-white">
      <JobTabs />

      {jobTab === 'Post Jobs' && <PostJobPage />}
    </div>
  )
}

export default JobPage
