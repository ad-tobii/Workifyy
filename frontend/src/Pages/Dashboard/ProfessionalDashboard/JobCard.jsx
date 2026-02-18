import { ArrowUpRightIcon, CalendarIcon, StarIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'

const JobCard = ({ job }) => {
  const navigate = useNavigate()

  return (
    <div className="group relative mt-6 w-[90%] overflow-hidden rounded-2xl border border-zinc-800/50 bg-[#151518] p-5 transition-all hover:border-zinc-700/50 hover:shadow-2xl">
      {/* Ongoing Indicator Stripe */}
      {job?.status === 'ongoing' && (
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#32cd32] to-[#28a428]" />
      )}

      {/* Job Title Section */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="flex-1 text-2xl font-semibold leading-tight text-white">{job.title}</h3>

        {/* Ongoing Badge */}
        {job?.status === 'ongoing' && (
          <span className="flex items-center gap-1.5 rounded-full border border-[#32cd32]/30 bg-[#32cd32]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#32cd32] backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#32cd32] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#32cd32]"></span>
            </span>
            Ongoing
          </span>
        )}
      </div>

      {/* Job Meta Information: Price, Posted Date, and Client Rating */}
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-[#bebec6]">
        {/* Job Price */}
        <span className="text-lg font-bold text-white">
          ₦ {job.budget?.toLocaleString() || '0'}
        </span>

        <span className="hidden sm:inline">•</span>

        {/* Client Info */}
        {job.client && (
          <>
            <span className="hidden sm:inline">
              {job.client.firstname} {job.client.lastname}
            </span>
            <span className="hidden sm:inline">•</span>
          </>
        )}

        {/* Client Rating */}
        <div className="flex items-center gap-1">
          <StarIcon className="h-4 w-4 text-yellow-400" />
          <span>{job.rating || '5.0'}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

      {/* Footer Section: When Job is Needed & Details Button */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* When the job needs to be done */}
        {job.scheduledAt && (
          <div className="flex items-center gap-2 text-sm text-zinc-300">
            <CalendarIcon className="h-4 w-4" />
            <span>
              Scheduled:{' '}
              {new Date(job.scheduledAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
        )}

        {/* Navigate to job details page */}
        <button
          onClick={() => navigate(`jobs/${job._id}`)}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#32cd32] px-5 py-2.5 text-sm font-semibold text-black transition-all hover:bg-[#28a428] hover:shadow-lg hover:shadow-[#32cd32]/20 sm:w-auto"
        >
          Details
          <ArrowUpRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default JobCard
