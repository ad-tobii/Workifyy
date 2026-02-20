import JobTabs from './Components/JobTabs'
import PostJobPage from './PostJobPage/PostJob'
import useClientStore from '../../../../store/useClientStore'
import BidPage from './BidPage/BidPage'

import OngoingPage from './OngoingPage'

const JobPage = () => {
  const jobTab = useClientStore(state => state.jobTab)
  const postJobFlowTrigger = useClientStore(state => state.postJobFlowTrigger)
  return (
    <div className="mt-4 flex flex-col items-center space-y-6 pb-48 text-white">
      <JobTabs />

      {jobTab === 'Post Jobs' && <PostJobPage trigger={postJobFlowTrigger} />}
      {jobTab === 'Bids' && <BidPage />}
      {jobTab === 'Ongoing Jobs' && <OngoingPage />}
    </div>
  )
}

export default JobPage
