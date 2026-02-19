import { useState } from 'react'
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import useJobStore from '../../../../store/useJobStore'

const RedoRequestModal = ({ isOpen, onClose, jobId, professionalName }) => {
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const requestRedo = useJobStore(state => state.requestRedo)
  const loading = useJobStore(state => state.loading)

  const handleSubmit = async () => {
    setError(null)

    if (!message.trim()) {
      setError('Please explain what needs to be redone')
      return
    }

    try {
      await requestRedo(jobId, message)
      setSuccess(true)
    } catch (err) {
      setError('Failed to request redo. Please try again.')
    }
  }

  const handleClose = () => {
    setMessage('')
    setSuccess(false)
    setError(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-3xl bg-[#131314] p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            {success ? 'Request Sent!' : 'Request Redo'}
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
            <CheckCircleIcon className="mb-4 h-16 w-16 text-amber-500" />
            <p className="mb-2 text-lg font-semibold text-white">Redo request sent!</p>
            <p className="mb-8 text-center text-sm text-zinc-400">
              {professionalName} has been notified to make the requested changes
            </p>
            <button
              onClick={handleClose}
              className="rounded-2xl bg-amber-500 px-8 py-3 text-sm font-bold text-black transition-all hover:bg-amber-600 active:scale-95"
            >
              Close
            </button>
          </div>
        ) : (
          // Form
          <>
            {/* Professional Name */}
            <p className="mb-6 text-center text-sm text-zinc-400">
              Explain what needs to be fixed to{' '}
              <span className="font-semibold text-white">{professionalName}</span>
            </p>

            {/* Message */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-white">
                What needs to be redone? <span className="text-red-500">*</span>
              </label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={5}
                placeholder="Be specific about what needs to be changed or improved..."
                className="w-full resize-none rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-amber-500"
              />
              <p className="mt-2 text-xs text-zinc-500">
                The job will revert to "ongoing" status after you submit this request
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/20 p-3">
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
                disabled={loading || !message.trim()}
                className="flex-1 rounded-2xl bg-amber-500 py-3 text-sm font-bold text-black transition-all hover:bg-amber-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Request Redo'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default RedoRequestModal