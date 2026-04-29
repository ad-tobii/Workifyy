import { useEffect } from 'react'
import useJobStore from '../../../../store/useJobStore'
import JobCard from '../HomePage/Components/JobCard'

const HistoryPage = () => {
  const jobs = useJobStore(state => state.jobs)
  const fetchJobHistory = useJobStore(state => state.fetchJobHistory)
  const loading = useJobStore(state => state.loading)

  useEffect(() => {
    fetchJobHistory()
  }, [])

  const completedJobs = jobs.filter(job => job.status === 'completed')

  if (loading && completedJobs.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-sm text-zinc-500">Loading history…</p>
      </div>
    )
  }

  if (completedJobs.length === 0) {
    return (
      <div className="flex h-40 flex-col items-center justify-center gap-2">
        <p className="text-sm text-zinc-500">No completed jobs yet</p>
      </div>
    )
  }

  return (
    <div className="w-[90%] pb-8">
      <div className="flex flex-col gap-2">
        {completedJobs.map(job => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  )
}

export default HistoryPage
