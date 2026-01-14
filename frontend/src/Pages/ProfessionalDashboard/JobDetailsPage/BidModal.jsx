import { useState } from 'react'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { useParams } from 'react-router-dom'
import useBidStore from '../../../store/bidStore.store'

const formatNumber = num => new Intl.NumberFormat('en-NG').format(num)

const BidModal = ({ setIsOpen, budget }) => {
  const { jobId } = useParams()

  const [amount, setAmount] = useState(25000)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false) // track success

  const placeBid = useBidStore(state => state.placeBid)
  const loading = useBidStore(state => state.loading)
  const error = useBidStore(state => state.error)

  // handle input
  const handleChange = e => {
    const raw = e.target.value.replace(/,/g, '')
    if (!isNaN(raw)) {
      setAmount(Number(raw))
      setSuccess(false) // reset success on input change
    }
  }

  const increment = () => {
    setAmount(prev => prev + 1000)
    setSuccess(false)
  }
  const decrement = () => {
    setAmount(prev => Math.max(0, prev - 1000))
    setSuccess(false)
  }

  // determine feedback based on budget
  const getBudgetFeedback = () => {
    if (amount < budget) return { text: 'Below budget, perfect!', color: 'text-green-400' }
    if (amount === budget) return { text: 'Perfect match!', color: 'text-yellow-400' }
    if (amount > budget) return { text: 'Over budget!', color: 'text-red-400' }
  }

  const handlePlaceBid = async () => {
    try {
      await placeBid(jobId, amount, message)
      setSuccess(true)
    } catch (err) {
      setSuccess(false)
      console.error('Bid failed', err)
    }
  }

  const budgetFeedback = getBudgetFeedback()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-[90%] max-w-sm rounded-3xl bg-[#131314] p-6 shadow-2xl">
        {/* Title */}
        <h2 className="mb-6 text-center text-lg font-semibold text-white">Place Your Bid</h2>

        {/* Amount Input */}
        <div className="relative mb-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-zinc-500">₦</span>

          <input
            type="text"
            value={formatNumber(amount)}
            onChange={handleChange}
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 py-4 pl-10 pr-14 text-lg font-semibold text-white outline-none focus:border-[#32cd32]"
          />

          {/* Arrows */}
          <div className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col">
            <button onClick={increment} className="rounded-md p-1 text-zinc-400 hover:text-white">
              <ChevronUpIcon className="h-4 w-4" />
            </button>
            <button onClick={decrement} className="rounded-md p-1 text-zinc-400 hover:text-white">
              <ChevronDownIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Budget feedback */}
        <p className={`mb-4 text-sm font-medium ${budgetFeedback.color}`}>{budgetFeedback.text}</p>

        {/* Message Input */}
        <div className="mb-4">
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={3}
            placeholder="Add a short message (optional)"
            className="w-full resize-none rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-200 outline-none placeholder:text-zinc-500 focus:border-[#32cd32]"
          />
        </div>

        {/* Status messages */}
        {error && <p className="mb-2 text-center text-xs text-red-500">{error}</p>}
        {!loading && success && (
          <p className="mb-2 text-center text-xs text-green-400">Bid placed successfully!</p>
        )}

        {/* CTA */}
        <button
          onClick={handlePlaceBid}
          disabled={loading}
          className={`w-full rounded-2xl py-4 text-sm font-bold text-black transition-transform ${
            loading
              ? 'cursor-not-allowed bg-zinc-600'
              : 'bg-[#32cd32] hover:bg-[#2eb32e] active:scale-95'
          }`}
        >
          {loading ? 'Placing Bid...' : 'Place Bid'}
        </button>

        {/* Cancel */}
        <button
          onClick={() => setIsOpen(false)}
          className="mt-4 w-full text-center text-xs text-zinc-500 hover:text-zinc-300"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default BidModal
