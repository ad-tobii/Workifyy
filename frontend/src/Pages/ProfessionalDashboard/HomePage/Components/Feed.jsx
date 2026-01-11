import { ChevronRightIcon } from '@heroicons/react/24/solid'
import useJobStore from '../../../../store/jobStore.store'

const Feed = () => {
  const jobs = useJobStore(state => state.jobs)
  return (
    <div className="mt-6 w-[90%]">
      {/* Section title */}
      <h3 className="mb-3 text-sm font-semibold text-white/80">Ongoing Job</h3>

      {/* Ongoing Job Card */}
      {jobs &&
        jobs.map(job => (
          <div
            key={job._id}
            className="flex flex-col my-6 justify-between rounded-2xl border border-white/10 bg-[#242427]/80 px-4 py-4 text-white shadow-lg"
          >
            {/* Top */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">{job.title}</p>
                <p className="mt-2 text-xs text-white/60">
                  {job.client.firstname + ' ' + job.client.lastname}
                </p>
              </div>

              {/* Status badge */}
              <span className="rounded-full bg-[#32cd32]/20 px-3 py-1 text-xs font-medium text-[#32cd32]">
                Ongoing
              </span>
            </div>

            {/* Middle */}
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-white/60">Payment</p>
                <p className="text-sm font-semibold">₦ {job.budget}</p>
              </div>

              <div>
                <p className="text-xs text-white/60">Deadline</p>
                <p className="text-sm font-semibold text-red-600">{job.scheduledAt}</p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-4 flex items-center justify-between rounded-xl bg-[#151517]/80 px-3 py-2">
              <span className="text-sm font-medium">View Job</span>
              <ChevronRightIcon className="h-5 w-5 text-white/70" />
            </div>
          </div>
        ))}
    </div>
  )
}

export default Feed
