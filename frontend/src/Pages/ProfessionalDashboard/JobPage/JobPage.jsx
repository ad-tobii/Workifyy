import JobTabs from './Components/JobTabs'
import useProStore from '../../../store/proStore.store'
import useJobStore from '../../../store/jobStore.store'
import useBidStore from '../../../store/bidStore.store'
import BidPage from './Components/BidPage/BidPage'
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

      {jobTab === 'Find Jobs' && jobs.map(job => <JobCard key={job._id} job={job} />)}

      {jobTab === 'Bids' && <BidPage />}
    </div>
  )
}

export default JobPage
