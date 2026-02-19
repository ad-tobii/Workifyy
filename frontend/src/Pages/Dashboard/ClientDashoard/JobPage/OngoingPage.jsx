import { useEffect } from 'react'
import useJobStore from '../../../../store/useJobStore'
import JobCard from '../HomePage/Components/JobCard'

const OngoingPage = () => {
  const jobs = useJobStore(state => state.jobs)
  const fetchOngoingJobs = useJobStore(state => state.fetchOngoingJobs)
  const loading = useJobStore(state => state.loading)
  const error = useJobStore(state => state.error)

  useEffect(() => {
    fetchOngoingJobs()
  }, [])

  // Filter for ongoing jobs
  const ongoingJobs = jobs.filter(job => job.status === 'ongoing')

  // Loading state - only show if we have no jobs yet
  if (loading && ongoingJobs.length === 0) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-[#32cd32]"></div>
          <p className="text-gray-400">Loading ongoing jobs...</p>
        </div>
      </div>
    )
  }

  // Error state - only show if we have no jobs
  if (error && ongoingJobs.length === 0) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="mb-2 text-red-400">Error loading ongoing jobs</p>
          <p className="text-sm text-gray-500">Please try refreshing the page</p>
          <button
            onClick={() => fetchOngoingJobs()}
            className="mt-4 rounded-lg bg-[#32cd32] px-6 py-2 text-sm font-semibold text-black transition-colors hover:bg-[#28a428]"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  // Empty state
  if (ongoingJobs.length === 0) {
    return (
      <div className="flex  h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800">
            <svg
              className="h-8 w-8 text-zinc-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-semibold text-white">No Ongoing Jobs</h3>
          <p className="text-gray-400">Jobs you've assigned will appear here</p>
        </div>
      </div>
    )
  }

  // Main content
  return (
    <div className="space-y-4 pb-8">
      {/* Job Cards */}
      <div className="grid gap-4">
        {ongoingJobs.map((job, index) => (
          <JobCard key={job._id} job={job} index={index} />
        ))}
      </div>
    </div>
  )
}

export default OngoingPage
