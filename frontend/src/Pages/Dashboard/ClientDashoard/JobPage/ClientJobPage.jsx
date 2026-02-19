import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeftIcon,
  StarIcon,
  CalendarIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/solid'
import useJobStore from '../../../../store/useJobStore'
import ReviewModal from './ReviewModal'
import RedoRequestModal from './RedoRequestModal'
import JobImages from '../../../../Pages/Dashboard/ProfessionalDashboard/JobDetailsPage/JobImages'

const STATUS_CONFIG = {
  open: {
    color: '#fbbf24',
    label: 'Open for Bids',
    gradient: 'from-amber-500/10 to-amber-600/5',
  },
  ongoing: {
    color: '#32cd32',
    label: 'In Progress',
    gradient: 'from-[#32cd32]/10 to-[#28a428]/5',
  },
  awaiting_review: {
    color: '#60a5fa',
    label: 'Awaiting Review',
    gradient: 'from-blue-500/10 to-blue-600/5',
  },
  completed: {
    color: '#10b981',
    label: 'Completed',
    gradient: 'from-emerald-500/10 to-emerald-600/5',
  },
}

const ClientJobPage = () => {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const fetchJob = useJobStore(state => state.fetchJob)
  const job = useJobStore(state => state.job)
  const loading = useJobStore(state => state.loading)

  const [showReviewModal, setShowReviewModal] = useState(false)
  const [showRedoModal, setShowRedoModal] = useState(false)

  useEffect(() => {
    if (jobId) {
      fetchJob(jobId)
    }
  }, [jobId, fetchJob])

  const isCurrentJobLoaded = job && job._id === jobId

  if (!isCurrentJobLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f0f10] text-zinc-400">
        {loading ? 'Loading job…' : 'Fetching latest job data…'}
      </div>
    )
  }

  const statusConfig = STATUS_CONFIG[job.status] || STATUS_CONFIG.open
  const professional = job.chosenProfessional
  const professionalProfile = job.professionalProfile

  // Calculate average rating
  const avgRating = professionalProfile?.reviews?.length
    ? (
        professionalProfile.reviews.reduce((sum, r) => sum + r.rating, 0) /
        professionalProfile.reviews.length
      ).toFixed(1)
    : null

  return (
    <div className="min-h-screen bg-[#0f0f10] pb-20">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-[#131314]">
        <div className="mx-auto w-[90%] max-w-6xl py-4">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800/50 text-zinc-300 transition-colors hover:bg-zinc-700/70 hover:text-white"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>

          {/* Title & Status */}
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">{job.title}</h1>
              <p className="mt-1 text-sm text-zinc-400">
                Posted {new Date(job.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Status Badge */}
            <div
              className="flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5"
              style={{
                borderColor: `${statusConfig.color}40`,
                backgroundColor: `${statusConfig.color}15`,
                color: statusConfig.color,
              }}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                  style={{ backgroundColor: statusConfig.color }}
                />
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ backgroundColor: statusConfig.color }}
                />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider">
                {statusConfig.label}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto w-[90%] max-w-6xl py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Job Details */}
          <div className="space-y-6 lg:col-span-2">
            {/* Images */}
            {(job.status === 'awaiting_review' || job.status === 'completed') &&
            job.submission?.images ? (
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">
                  Submitted Work
                </h3>
                <JobImages images={job.submission.images} />
                {job.submission.message && (
                  <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900/30 p-4">
                    <p className="text-sm text-zinc-300">{job.submission.message}</p>
                  </div>
                )}
              </div>
            ) : job.images?.length > 0 ? (
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">
                  Job Photos
                </h3>
                <JobImages images={job.images} />
              </div>
            ) : null}

            {/* Description */}
            <div>
              <h3 className="mb-3 text-lg font-bold text-white">Description</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{job.description}</p>
            </div>

            {/* Job Details Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4">
                <div className="mb-2 flex items-center gap-2 text-zinc-500">
                  <CurrencyDollarIcon className="h-5 w-5" />
                  <p className="text-xs font-medium uppercase tracking-wide">Budget</p>
                </div>
                <p className="text-2xl font-bold text-white">₦ {job.budget?.toLocaleString()}</p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4">
                <div className="mb-2 flex items-center gap-2 text-zinc-500">
                  <CalendarIcon className="h-5 w-5" />
                  <p className="text-xs font-medium uppercase tracking-wide">Scheduled</p>
                </div>
                <p className="text-lg font-semibold text-white">
                  {new Date(job.scheduledAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Professional Info & Actions */}
          <div className="space-y-6">
            {/* Professional Card */}
            {professional && (
              <div className="rounded-2xl border border-zinc-800 bg-[#131314] p-6">
                <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  {job.status === 'open' ? 'Assigned To' : 'Professional'}
                </p>

                <div className="mb-4 flex items-center gap-3">
                  <img
                    src={professionalProfile?.photo || '/default-avatar.png'}
                    alt={`${professional.firstname} ${professional.lastname}`}
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-zinc-800"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-white">
                      {professional.firstname} {professional.lastname}
                    </p>
                    {professionalProfile?.tagline && (
                      <p className="text-xs text-zinc-400">{professionalProfile.tagline}</p>
                    )}
                    {avgRating && (
                      <div className="mt-1 flex items-center gap-1">
                        <StarIcon className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm font-semibold text-white">{avgRating}</span>
                        <span className="text-xs text-zinc-500">
                          ({professionalProfile.reviews.length} reviews)
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions based on status */}
                <div className="space-y-3">
                  {job.status === 'open' && (
                    <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-center">
                      <p className="text-sm text-amber-400">Waiting for bids...</p>
                    </div>
                  )}

                  {job.status === 'ongoing' && (
                    <div className="rounded-xl border border-[#32cd32]/20 bg-[#32cd32]/10 p-4 text-center">
                      <p className="text-sm font-medium text-[#32cd32]">Work in Progress</p>
                      <p className="mt-1 text-xs text-zinc-400">
                        Professional is working on your job
                      </p>
                    </div>
                  )}

                  {job.status === 'awaiting_review' && (
                    <>
                      <button
                        onClick={() => setShowReviewModal(true)}
                        className="w-full rounded-2xl bg-[#32cd32] py-3 text-sm font-bold text-black transition-all hover:bg-[#2eb32e] active:scale-95"
                      >
                        Accept & Review
                      </button>
                      <button
                        onClick={() => setShowRedoModal(true)}
                        className="w-full rounded-2xl border border-amber-500/50 py-3 text-sm font-semibold text-amber-400 transition-colors hover:bg-amber-500/10"
                      >
                        Request Redo
                      </button>
                    </>
                  )}

                  {job.status === 'completed' && (
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-center">
                      <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
                        <svg
                          className="h-5 w-5 text-emerald-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="text-sm font-semibold text-emerald-500">Job Completed</p>
                      <p className="mt-1 text-xs text-zinc-400">Thank you for using our service</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Job Address */}
            <div className="rounded-2xl border border-zinc-800 bg-[#131314] p-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Location
              </p>
              <p className="text-sm text-zinc-300">{job.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
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
