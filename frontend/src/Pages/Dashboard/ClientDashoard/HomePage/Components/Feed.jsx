import JobCard from './JobCard'
import useJobStore from '../../../../../store/jobStore.store'
const Feed = () => {
  const jobs = useJobStore(state => state.jobs)
  return (
    <div className="mt-6 w-[90%]">
      {/* Section title */}
      <h3 className="mb-3 text-sm font-semibold text-white/80">My Jobs</h3>

      {/* Ongoing Job Card */}
      {jobs.length > 0 && (
        <div className="flex flex-col gap-4">
          {jobs.map(job => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
      {jobs.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-sm text-white/80">No jobs found</p>
        </div>
      )}
    </div>
  )
}

export default Feed
