// CounterOfferModal.jsx
import { useState } from 'react'

const CounterOfferModal = ({
  isOpen,
  onClose,
  onConfirm,
  currentAmount,
  currentMessage,
  loading = false,
}) => {
  const [amount, setAmount] = useState(currentAmount || '')
  const [message, setMessage] = useState(currentMessage || '')

  if (!isOpen) return null

  const handleSubmit = () => {
    if (!amount || amount <= 0) {
      alert('Please enter a valid amount')
      return
    }
    onConfirm(Number(amount), message)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-md rounded-2xl bg-[#1a1a1d] p-6 shadow-2xl">
        {/* Title */}
        <h3 className="mb-4 text-xl font-semibold text-white">Counter Offer</h3>

        {/* Amount Input */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Your Counter Offer Amount
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₦</span>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full rounded-xl bg-[#2a2a2d] px-4 py-3 pl-8 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>

        {/* Message Input */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-300">Message (Optional)</label>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Add a message to explain your counter offer..."
            rows={3}
            className="w-full resize-none rounded-xl bg-[#2a2a2d] px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-xl bg-gray-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-xl bg-yellow-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Counter'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CounterOfferModal
