import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, StarIcon, CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid'
import useJobStore from '../../../../store/useJobStore'
import ReviewModal from './ReviewModal'
import RedoRequestModal from './RedoRequestModal'
import JobImages from '../../../../Pages/Dashboard/ProfessionalDashboard/JobDetailsPage/JobImages'

const STATUS_CONFIG = {
  open:            { color: '#fbbf24', label: 'Open for Bids' },
  ongoing:         { color: '#32cd32', label: 'In Progress' },
  awaiting_review: { color: '#60a5fa', label: 'Awaiting Review' },
  completed:       { color: '#10b981', label: 'Completed' },
}

const SectionLabel = ({ children }) => (
  <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-400">{children}</p>
)

const ClientJobPage = () => {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const fetchJob = useJobStore(state => state.fetchJob)
  const job = useJobStore(state => state.job)
  const loading = useJobStore(state => state.loading)

  const [showReviewModal, setShowReviewModal] = useState(false)
  const [showRedoModal, setShowRedoModal] = useState(false)

  useEffect(() => {
    if (jobId) fetchJob(jobId)
  }, [jobId, fetchJob])

  const isCurrentJobLoaded = job && job._id === jobId

  if (!isCurrentJobLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f0f10] text-sm text-zinc-500">
        {loading ? 'Loading…' : 'Fetching job…'}
      </div>
    )
  }

  const { color, label } = STATUS_CONFIG[job.status] || STATUS_CONFIG.open
  const professional = job.chosenProfessional
  const professionalProfile = job.professionalProfile

  const avgRating = professionalProfile?.reviews?.length
    ? (
        professionalProfile.reviews.reduce((sum, r) => sum + r.rating, 0) /
        professionalProfile.reviews.length
      ).toFixed(1)
    : null

  const hasSubmission =
    (job.status === 'awaiting_review' || job.status === 'completed') && job.submission?.images?.length

  return (
    <div className="min-h-screen bg-[#0f0f10] pb-20">

      {/* ── Header ── */}
      <div className="sticky top-0 z-10 border-b border-zinc-800/60 bg-[#0f0f10]/95 backdrop-blur-md">
        <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
          <button
            onClick={() => navigate(-1)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-800/70 text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </button>

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-bold text-white sm:text-lg">{job.title}</h1>
            <p className="text-[11px] text-zinc-500">
              Posted{' '}
              {new Date(job.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>

          <div
            className="flex h-7 shrink-0 items-center gap-1.5 rounded-xl px-2.5 text-[10px] font-semibold uppercase tracking-wide"
            style={{ backgroundColor: `${color}18`, color }}
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{label.split(' ')[0]}</span>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-3">

          {/* ── Sidebar — first on mobile, right on desktop ── */}
          <div className="order-first space-y-4 lg:order-last">

            {/* Professional card */}
            {professional && (
              <div className="rounded-xl border border-zinc-800 bg-[#151518] p-4">
                <SectionLabel>Professional</SectionLabel>

                <div className="flex items-center gap-3">
                  <img
                    src={professionalProfile?.photo || '/default-avatar.png'}
                    alt={`${professional.firstname} ${professional.lastname}`}
                    className="h-12 w-12 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">
                      {professional.firstname} {professional.lastname}
                    </p>
                    {professionalProfile?.tagline && (
                      <p className="truncate text-xs text-zinc-500">{professionalProfile.tagline}</p>
                    )}
                    {avgRating && (
                      <div className="mt-0.5 flex items-center gap-1">
                        <StarIcon className="h-3 w-3 text-yellow-400" />
                        <span className="text-xs font-semibold text-white">{avgRating}</span>
                        <span className="text-xs text-zinc-600">
                          ({professionalProfile.reviews.length})
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status / Actions */}
                <div className="mt-4 space-y-2">
                  {job.status === 'open' && (
                    <div className="flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                      <p className="text-sm text-amber-400">Waiting for bids</p>
                    </div>
                  )}

                  {job.status === 'ongoing' && (
                    <div className="flex items-center gap-2 rounded-xl border border-[#32cd32]/20 bg-[#32cd32]/10 px-4 py-3">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#32cd32]" />
                      <p className="text-sm text-[#32cd32]">Work in progress</p>
                    </div>
                  )}

                  {job.status === 'awaiting_review' && (
                    <>
                      <button
                        onClick={() => setShowReviewModal(true)}
                        className="w-full rounded-xl bg-[#32cd32] py-2.5 text-sm font-bold text-black transition-colors hover:bg-[#2eb32e]"
                      >
                        Accept & Review
                      </button>
                      <button
                        onClick={() => setShowRedoModal(true)}
                        className="w-full rounded-xl border border-amber-500/40 py-2.5 text-sm font-semibold text-amber-400 transition-colors hover:bg-amber-500/10"
                      >
                        Request Redo
                      </button>
                    </>
                  )}

                  {job.status === 'completed' && (
                    <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                      <p className="text-sm text-emerald-400">Job completed</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Location */}
            <div className="rounded-xl border border-zinc-800 bg-[#151518] p-4">
              <SectionLabel>Location</SectionLabel>
              <p className="text-sm text-zinc-300">{job.address}</p>
            </div>
          </div>

          {/* ── Main content ── */}
          <div className="space-y-6 lg:col-span-2">

            {/* Images */}
            {hasSubmission ? (
              <div>
                <SectionLabel>Submitted Work</SectionLabel>
                <JobImages images={job.submission.images} />
                {job.submission.message && (
                  <div className="mt-3 rounded-xl border border-zinc-800 bg-[#151518] p-4">
                    <p className="text-sm leading-relaxed text-zinc-300">{job.submission.message}</p>
                  </div>
                )}
              </div>
            ) : job.images?.length > 0 ? (
              <div>
                <SectionLabel>Job Photos</SectionLabel>
                <JobImages images={job.images} />
              </div>
            ) : null}

            {/* Description */}
            <div>
              <SectionLabel>Description</SectionLabel>
              <p className="text-sm leading-relaxed text-zinc-400">{job.description}</p>
            </div>

            {/* Budget + Scheduled */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-zinc-800 bg-[#151518] p-4">
                <div className="mb-1.5 flex items-center gap-1.5 text-zinc-500">
                  <CurrencyDollarIcon className="h-4 w-4" />
                  <p className="text-xs font-semibold uppercase tracking-wide">Budget</p>
                </div>
                <p className="text-xl font-bold text-white">
                  ₦{job.budget?.toLocaleString()}
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-[#151518] p-4">
                <div className="mb-1.5 flex items-center gap-1.5 text-zinc-500">
                  <CalendarIcon className="h-4 w-4" />
                  <p className="text-xs font-semibold uppercase tracking-wide">Scheduled</p>
                </div>
                <p className="text-sm font-semibold text-white">
                  {new Date(job.scheduledAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Modals ── */}
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        jobId={job._id}
        professionalName={`${professional?.firstname} ${professional?.lastname}`}
      />
      <RedoRequestModal
        isOpen={showRedoModal}
        onClose={() => setShowRedoModal(false)}
        jobId={job._id}
        professionalName={`${professional?.firstname} ${professional?.lastname}`}
      />
    </div>
  )
}

export default ClientJobPage
