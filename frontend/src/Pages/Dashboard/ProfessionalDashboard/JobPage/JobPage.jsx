import JobTabs from './Components/JobTabs'
import useProStore from '../../../../store/useProStore'
import useJobStore from '../../../../store/useJobStore'
import useBidStore from '../../../../store/useBidStore'
import BidPage from './Components/BidPage/BidPage'
import OngoingJobsPage from './Components/OngoingPage/OngoingJobsPage'
import { useEffect } from 'react'

import JobCard from '../JobCard'

const JobPage = () => {
  const jobTab = useProStore(state => state.jobTab)

  const bids = useBidStore(state => state.bids)
  const getProBids = useBidStore(state => state.getProBids)
  const bidLoading = useBidStore(state => state.loading)

  const jobs = useJobStore(state => state.jobs)

  return (
    <div className="mt-4 flex flex-col items-center space-y-6 pb-48 text-white">
      <JobTabs />

      {jobTab === 'Find Jobs' &&
        jobs.map((job, index) => <JobCard key={job._id} job={job} index={index} />)}

      {jobTab === 'Bids' && <BidPage />}
      {jobTab === 'Ongoing Jobs' && <OngoingJobsPage />}
      {/* {jobTab === 'Saved Jobs' && <SavedJobs />} */}
    </div>
  )
}

export default JobPage
