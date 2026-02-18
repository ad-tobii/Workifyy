import { useEffect } from 'react'
import useJobStore from '../../../../../../store/useJobStore' 
import JobCard from '../../../JobCard'

const OngoingJobsPage = () => {
  const jobs = useJobStore(state => state.jobs)
  const fetchOngoingJobs = useJobStore(state => state.fetchOngoingJobs)
  const loading = useJobStore(state => state.loading)
  const error = useJobStore(state => state.error)

  useEffect(() => {
    fetchOngoingJobs()
  }, [])

  // Filter jobs to only show ongoing ones
  const ongoingJobs = jobs.filter(job => job.status === 'ongoing')

  if (loading && ongoingJobs.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center text-gray-400">
        Loading ongoing jobs...
      </div>
    )
  }

  if (error && ongoingJobs.length === 0) {
    return (
      <div className="flex h-40 flex-col items-center justify-center gap-2">
        <p className="text-red-400">Error fetching ongoing jobs.</p>
        <p className="text-sm text-gray-500">Please try refreshing the page.</p>
      </div>
    )
  }

  if (ongoingJobs.length === 0) {
    return (
      <div className="flex h-40 flex-col items-center justify-center gap-2">
        <p className="text-xl font-semibold text-gray-400">No ongoing jobs</p>
        <p className="text-sm text-gray-500">Jobs you accept will appear here</p>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col items-center space-y-4 pb-8">
      {/* Header */}
     

      {/* Job Cards */}
      {ongoingJobs.map(job => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  )
}

export default OngoingJobsPage
