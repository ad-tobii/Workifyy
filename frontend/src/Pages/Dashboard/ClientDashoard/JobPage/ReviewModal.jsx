import { useState } from 'react'
import { XMarkIcon, StarIcon, CheckCircleIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarOutline } from '@heroicons/react/24/outline'
import useJobStore from '../../../../store/useJobStore'

const ReviewModal = ({ isOpen, onClose, jobId, professionalName }) => {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [review, setReview] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [isRetrying, setIsRetrying] = useState(false)

  const acceptWork = useJobStore(state => state.acceptWork)
  const loading = useJobStore(state => state.loading)

  const handleSubmit = async () => {
    setError(null)
    setIsRetrying(false)

    if (rating === 0) {
      setError('Please select a rating')
      return
    }

    try {
      await acceptWork(jobId, rating, review)
      setSuccess(true)
    } catch (err) {
      setError('We could not submit your review. Please try again.')
      setIsRetrying(true)
    }
  }

  const handleClose = () => {
    setRating(0)
    setHover(0)
    setReview('')
    setSuccess(false)
    setError(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-[#131314] p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            {success ? 'Review Submitted!' : 'Accept Work & Review'}
          </h2>
          <button
            onClick={handleClose}
            className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {success ? (
          // Success State
          <div className="flex flex-col items-center justify-center py-12">
            <CheckCircleIcon className="mb-4 h-16 w-16 text-[#32cd32]" />
            <p className="mb-2 text-lg font-semibold text-white">Work accepted successfully!</p>
            <p className="mb-8 text-center text-sm text-zinc-400">
              Your review has been submitted and the job is now complete
            </p>
            <button
              onClick={handleClose}
              className="rounded-2xl bg-[#32cd32] px-8 py-3 text-sm font-bold text-black transition-all hover:bg-[#2eb32e] active:scale-95"
            >
              Close
            </button>
          </div>
        ) : (
          // Form
          <>
            {/* Professional Name */}
            <p className="mb-6 text-center text-sm text-zinc-400">
              Rate your experience with{' '}
              <span className="font-semibold text-white">{professionalName}</span>
            </p>

            {/* Star Rating */}
            <div className="mb-6">
              <label className="mb-3 block text-center text-sm font-medium text-white">
                Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className="transition-transform hover:scale-110"
                  >
                    {star <= (hover || rating) ? (
                      <StarIcon className="h-10 w-10 text-yellow-400" />
                    ) : (
                      <StarOutline className="h-10 w-10 text-zinc-600" />
                    )}
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="mt-2 text-center text-sm text-zinc-400">
                  {rating === 1 && 'Poor'}
                  {rating === 2 && 'Fair'}
                  {rating === 3 && 'Good'}
                  {rating === 4 && 'Very Good'}
                  {rating === 5 && 'Excellent'}
                </p>
              )}
            </div>

            {/* Review Text */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-white">Review (Optional)</label>
              <textarea
                value={review}
                onChange={e => setReview(e.target.value)}
                rows={4}
                placeholder="Share your experience working with this professional..."
                className="w-full resize-none rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-[#32cd32]"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleClose}
                className="flex-1 rounded-2xl border border-zinc-700 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading || rating === 0}
                className="flex-1 rounded-2xl bg-[#32cd32] py-3 text-sm font-bold text-black transition-all hover:bg-[#2eb32e] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (isRetrying ? 'Retrying...' : 'Submitting...') : 'Accept & Submit'}
              </button>
            </div>

            {error && (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="mt-3 w-full rounded-2xl border border-[#32cd32]/40 py-3 text-sm font-semibold text-[#32cd32] transition-colors hover:bg-[#32cd32]/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Retrying...' : 'Retry'}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ReviewModal
