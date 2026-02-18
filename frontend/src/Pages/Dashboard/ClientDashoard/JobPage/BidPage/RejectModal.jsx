import { useState } from 'react'

const REASONS = [
  {
    value: 'fit',
    label: 'Not a good fit',
    description: 'This professional is not a match for the project',
  },
  { value: 'other', label: 'Price mismatch', description: "The bid price doesn't work for me" },
]

const RejectModal = ({
  isOpen,
  onClose,
  onConfirm,
  professionalName,
  loading = false,
  error = null,
}) => {
  const [selectedReason, setSelectedReason] = useState(null)

  if (!isOpen) return null

  const handleClose = () => {
    setSelectedReason(null)
    onClose()
  }

  const handleConfirm = () => {
    if (!selectedReason) return
    onConfirm(selectedReason)
    setSelectedReason(null)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-md rounded-2xl bg-[#1a1a1d] p-6 shadow-2xl">
        <h3 className="mb-1 text-xl font-semibold text-white">Reject Bid</h3>
        <p className="mb-5 text-sm text-gray-400">
          Select a reason for rejecting {professionalName}'s bid.
        </p>

        {/* Reason options */}
        <div className="mb-6 space-y-3">
          {REASONS.map(reason => (
            <button
              key={reason.value}
              onClick={() => setSelectedReason(reason.value)}
              className={`w-full rounded-xl border p-4 text-left transition ${
                selectedReason === reason.value
                  ? 'border-red-500 bg-red-500/10'
                  : 'border-zinc-700 bg-[#2a2a2d] hover:border-red-500/40 hover:bg-red-500/5'
              }`}
            >
              <p className="text-sm font-semibold text-white">{reason.label}</p>
              <p className="text-xs text-gray-400">{reason.description}</p>
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleClose}
            disabled={loading}
            className="rounded-xl bg-zinc-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedReason || loading}
            className="rounded-xl bg-red-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Rejecting...' : 'Reject Bid'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default RejectModal
