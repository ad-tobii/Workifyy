import JobTabs from './Components/JobTabs'
import useProStore from '../../../store/proStore.store'
import useJobStore from '../../../store/jobStore.store'
import useBidStore from '../../../store/bidStore.store'
import { useEffect } from 'react'
import BidCard from './Components/bidCards'
import JobCard from '../JobCard'

const JobPage = () => {
  const jobTab = useProStore(state => state.jobTab)

  const bids = useBidStore(state => state.bids)
  const getProBids = useBidStore(state => state.getProBids)
  const bidLoading = useBidStore(state => state.loading)

  const jobs = useJobStore(state => state.jobs)

  useEffect(() => {
    if (jobTab === 'Bids') {
      getProBids()
      console.log('these are my ', bids)
    }
  }, [jobTab, getProBids, bids])

  return (
    <div className="mt-4 flex flex-col items-center space-y-6 pb-48 text-white">
      <JobTabs />

      {jobTab === 'Find Jobs' && jobs.map(job => <JobCard key={job._id} job={job} />)}

      {jobTab === 'Bids' && bidLoading && <div>Loading bids...</div>}

      {jobTab === 'Bids' && !bidLoading && bids.length === 0 && <div>No bids yet</div>}

      {jobTab === 'Bids' && bids.length > 0 && bids.map(bid => <BidCard key={bid._id} bid={bid} />)}
    </div>
  )
}

export default JobPage
