import { useEffect, useState } from 'react'
import useJobStore from '../../../../store/useJobStore'
import SubmitWorkModal from './SubmitWorkModal'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const BidPanel = ({ setIsOpen }) => {
  const job = useJobStore(state => state.job)
  const handleClick = () => {
    setIsOpen(true)
  }

  return (
    <div>
      <div className="hidden sm:block">
        <LargeBidPanel handleClick={handleClick} job={job} />
      </div>
      <div className="sm:hidden">
        <SmallBidPanel handleClick={handleClick} job={job} />
      </div>
    </div>
  )
}

// Desktop Panel
const LargeBidPanel = ({ handleClick, job }) => {
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)
  const cancelJob = useJobStore(state => state.cancelJob)
  const loading = useJobStore(state => state.loading)

  const handleCancel = async () => {
    try {
      await cancelJob(job._id)
      // Redirect or show success
      window.history.back()
    } catch (error) {
      console.error('Cancel failed:', error)
    }
  }

  // Open job - show bid button
  if (job.status === 'open') {
    return (
      <div className="w-full rounded-3xl border border-zinc-800 bg-[#131314] p-6 shadow-2xl shadow-black/50 xl:sticky xl:top-6 xl:max-w-[380px]">
        <div className="mb-6 flex items-baseline gap-2">
          <span className="text-2xl font-medium text-zinc-500">Client's Budget:</span>
          <span className="text-2xl font-bold text-[#32cd32]">
            ₦ {job.budget?.toLocaleString()}
          </span>
        </div>

        <button
          onClick={handleClick}
          className="w-full rounded-2xl bg-[#32cd32] py-4 text-sm font-bold text-black transition-transform hover:bg-[#2eb32e] active:scale-95"
        >
          Place Bid Now
        </button>

        <p className="mt-4 text-center text-xs text-zinc-500">
          You can withdraw your bid at any time
        </p>

        <div className="mt-8 flex justify-center border-t border-zinc-800 pt-4">
          <button className="flex items-center gap-2 text-[11px] font-medium text-zinc-600 hover:text-zinc-400">
            <span>🚩</span> Report this listing
          </button>
        </div>
      </div>
    )
  }

  // Ongoing job - show submit & cancel
  if (job.status === 'ongoing') {
    return (
      <>
        <div className="w-full rounded-3xl border border-zinc-800 bg-[#131314] p-6 shadow-2xl shadow-black/50 xl:sticky xl:top-6 xl:max-w-[380px]">
          {/* Redo Request Alert */}
          {job.redoRequest && job.redoRequest.message && (
            <div className="mb-6 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-amber-500">
                Revision Requested
              </p>
              <p className="text-sm text-zinc-300">{job.redoRequest.message}</p>
            </div>
          )}

          <div className="mb-6">
            <p className="mb-1 text-sm text-zinc-500">Job Payment</p>
            <p className="text-3xl font-bold text-white">₦ {job.budget?.toLocaleString()}</p>
          </div>

          <div className="mb-4 space-y-3">
            <button
              onClick={() => setShowSubmitModal(true)}
              className="w-full rounded-2xl bg-[#32cd32] py-4 text-sm font-bold text-black transition-transform hover:bg-[#2eb32e] active:scale-95"
            >
              Submit Work
            </button>

            <button
              onClick={() => setShowCancelConfirm(true)}
              className="w-full rounded-2xl border border-red-500/50 py-4 text-sm font-semibold text-red-400 transition-colors hover:bg-red-500/10"
            >
              Cancel Job
            </button>
          </div>

          <p className="text-center text-xs text-zinc-500">
            Make sure work is complete before submitting
          </p>
        </div>

        <SubmitWorkModal
          isOpen={showSubmitModal}
          onClose={() => setShowSubmitModal(false)}
          jobId={job._id}
        />

        {/* Cancel Confirmation */}
        {showCancelConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-3xl bg-[#131314] p-6">
              <div className="mb-4 flex justify-center">
                <ExclamationTriangleIcon className="h-12 w-12 text-red-500" />
              </div>
              <h3 className="mb-2 text-center text-lg font-bold text-white">Cancel Job?</h3>
              <p className="mb-6 text-center text-sm text-zinc-400">
                This action cannot be undone. The client will be notified.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="flex-1 rounded-2xl border border-zinc-700 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
                >
                  Keep Job
                </button>
                <button
                  onClick={handleCancel}
                  disabled={loading}
                  className="flex-1 rounded-2xl bg-red-500 py-3 text-sm font-bold text-white hover:bg-red-600 disabled:opacity-50"
                >
                  {loading ? 'Cancelling...' : 'Cancel Job'}
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  // Awaiting review - show waiting state
  if (job.status === 'awaiting_review') {
    return (
      <div className="w-full rounded-3xl border border-zinc-800 bg-[#131314] p-6 shadow-2xl shadow-black/50 xl:sticky xl:top-6 xl:max-w-[380px]">
        <div className="mb-6">
          <p className="mb-1 text-sm text-zinc-500">Job Payment</p>
          <p className="text-3xl font-bold text-white">₦ {job.budget?.toLocaleString()}</p>
        </div>

        <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-6 text-center">
          <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/20">
            <svg
              className="h-6 w-6 text-yellow-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="mb-1 text-sm font-semibold text-yellow-500">Awaiting Review</p>
          <p className="text-xs text-zinc-400">The client is reviewing your submission</p>
        </div>

        {/* Show submitted images */}
        {job.submission?.images && job.submission.images.length > 0 && (
          <div className="mt-6">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-zinc-500">
              Your Submission
            </p>
            <div className="grid grid-cols-2 gap-2">
              {job.submission.images.slice(0, 4).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Submission ${idx + 1}`}
                  className="aspect-square rounded-xl object-cover"
                />
              ))}
            </div>
            {job.submission.message && (
              <p className="mt-3 text-sm text-zinc-400">{job.submission.message}</p>
            )}
          </div>
        )}
      </div>
    )
  }

  // Completed - show success state
  if (job.status === 'completed') {
    return (
      <div className="w-full rounded-3xl border border-zinc-800 bg-[#131314] p-6 shadow-2xl shadow-black/50 xl:sticky xl:top-6 xl:max-w-[380px]">
        <div className="mb-6">
          <p className="mb-1 text-sm text-zinc-500">Job Payment</p>
          <p className="text-3xl font-bold text-[#32cd32]">₦ {job.budget?.toLocaleString()}</p>
        </div>

        <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-6 text-center">
          <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
            <svg
              className="h-6 w-6 text-green-500"
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
          <p className="mb-1 text-sm font-semibold text-green-500">Job Completed</p>
          <p className="text-xs text-zinc-400">Payment has been processed</p>
        </div>
      </div>
    )
  }

  return null
}

// Mobile Panel
// Mobile Panel
const SmallBidPanel = ({ handleClick, job }) => {
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)
  const cancelJob = useJobStore(state => state.cancelJob)
  const loading = useJobStore(state => state.loading)

  const handleCancel = async () => {
    try {
      await cancelJob(job._id)
      window.history.back()
    } catch (error) {
      console.error('Cancel failed:', error)
    }
  }

  // Open job - show bid button
  if (job.status === 'open') {
    return (
      <div className="fixed bottom-10 left-1/2 z-40 w-[90%] max-w-md -translate-x-1/2">
        <button
          onClick={handleClick}
          className="flex h-12 w-full items-center justify-center rounded-2xl bg-[#32cd32] text-lg font-semibold text-black shadow-lg active:scale-95"
        >
          Place Bid Now
        </button>
      </div>
    )
  }

  // Ongoing job - show submit and cancel buttons
  if (job.status === 'ongoing') {
    return (
      <>
        <div className="fixed bottom-10 left-1/2 z-40 w-[90%] max-w-md -translate-x-1/2 space-y-3">
          {/* Redo Alert - Mobile */}
          {job.redoRequest && job.redoRequest.message && (
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 backdrop-blur-md">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-amber-500">
                Revision Requested
              </p>
              <p className="line-clamp-2 text-xs text-zinc-300">{job.redoRequest.message}</p>
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => setShowSubmitModal(true)}
              className="flex h-12 flex-1 items-center justify-center rounded-2xl bg-[#32cd32] text-base font-semibold text-black shadow-lg active:scale-95"
            >
              Submit Work
            </button>

            <button
              onClick={() => setShowCancelConfirm(true)}
              className="flex h-12 items-center justify-center rounded-2xl border-2 border-red-500 bg-red-500/10 px-4 text-sm font-semibold text-red-400 shadow-lg active:scale-95"
            >
              Cancel
            </button>
          </div>
        </div>

        <SubmitWorkModal
          isOpen={showSubmitModal}
          onClose={() => setShowSubmitModal(false)}
          jobId={job._id}
        />

        {/* Cancel Confirmation - Mobile */}
        {showCancelConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-3xl bg-[#131314] p-6">
              <div className="mb-4 flex justify-center">
                <ExclamationTriangleIcon className="h-12 w-12 text-red-500" />
              </div>
              <h3 className="mb-2 text-center text-lg font-bold text-white">Cancel Job?</h3>
              <p className="mb-6 text-center text-sm text-zinc-400">
                This action cannot be undone. The client will be notified.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="flex-1 rounded-2xl border border-zinc-700 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
                >
                  Keep Job
                </button>

                <button
                  onClick={handleCancel}
                  disabled={loading}
                  className="flex-1 rounded-2xl bg-red-500 py-3 text-sm font-bold text-white hover:bg-red-600 disabled:opacity-50"
                >
                  {loading ? 'Cancelling...' : 'Cancel Job'}
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  // Awaiting review - show status card
  if (job.status === 'awaiting_review') {
    return (
      <div className="fixed bottom-10 left-1/2 z-40 w-[90%] max-w-md -translate-x-1/2">
        <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4 text-center backdrop-blur-md">
          <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/20">
            <svg
              className="h-5 w-5 text-yellow-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-sm font-semibold text-yellow-500">Awaiting Review</p>
          <p className="text-xs text-zinc-400">Client is reviewing your work</p>
        </div>
      </div>
    )
  }

  // Completed - show success card
  if (job.status === 'completed') {
    return (
      <div className="fixed bottom-10 left-1/2 z-40 w-[90%] max-w-md -translate-x-1/2">
        <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-4 text-center backdrop-blur-md">
          <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20">
            <svg
              className="h-5 w-5 text-green-500"
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
          <p className="text-sm font-semibold text-green-500">Job Completed</p>
          <p className="text-xs text-zinc-400">Payment processed</p>
        </div>
      </div>
    )
  }

  return null
}

export default BidPanel
