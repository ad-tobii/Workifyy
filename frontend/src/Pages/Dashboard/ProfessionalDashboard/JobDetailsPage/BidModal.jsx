import { useState } from 'react'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { useNavigate, useParams } from 'react-router-dom'
import useBidStore from '../../../../store/useBidStore'
import useJobStore from '../../../../store/useJobStore'

const formatNumber = num => new Intl.NumberFormat('en-NG').format(num)

const BidModal = ({ setIsOpen }) => {
  const job = useJobStore(state => state.job)
  const { jobId } = useParams()
  const navigate = useNavigate()
  const budget = job.budget

  const [amount, setAmount] = useState(0)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [retrying, setRetrying] = useState(false)

  const placeBid = useBidStore(state => state.placeBid)
  const loading = useBidStore(state => state.loading)

  const handleChange = e => {
    const raw = e.target.value.replace(/,/g, '')
    if (!isNaN(raw)) {
      setAmount(Number(raw))
      setSuccess(false)
      setSubmitError(null)
    }
  }

  const increment = () => {
    setAmount(prev => prev + 1000)
    setSuccess(false)
    setSubmitError(null)
  }

  const decrement = () => {
    setAmount(prev => Math.max(0, prev - 1000))
    setSuccess(false)
    setSubmitError(null)
  }

  const getBudgetFeedback = () => {
    if (amount < budget) {
      return {
        text: 'Within the client’s budget.',
        color: 'text-[#32cd32]',
        meter: 'bg-[#32cd32]',
        level: '80%',
      }
    }

    if (amount === budget) {
      return {
        text: 'Matches the client’s budget.',
        color: 'text-yellow-500',
        meter: 'bg-yellow-500',
        level: '100%',
      }
    }

    return {
      text: 'Above the client’s budget.',
      color: 'text-red-600',
      meter: 'bg-red-600',
      level: '100%',
    }
  }

  const budgetFeedback = getBudgetFeedback()

  const handlePlaceBid = async () => {
    setSubmitError(null)

    try {
      await placeBid(jobId, amount, message)
      setSuccess(true)
      setRetrying(false)
    } catch {
      setSuccess(false)
      setRetrying(true)
      setSubmitError('Unable to place your bid right now. Please try again.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-[90%] max-w-sm rounded-3xl bg-[#131314] p-6 shadow-2xl">
        <h2 className="mb-6 text-center text-lg font-semibold text-white">
          {success ? 'Bid Placed' : 'Place Your Bid'}
        </h2>

        {success ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-sm font-medium text-green-400">Bid placed successfully!</p>
            <button
              onClick={() => {
                setIsOpen(false)
                navigate(-1)
              }}
              className="mt-6 w-full rounded-2xl bg-[#32cd32] py-3 text-sm font-bold text-black transition-transform hover:bg-[#2eb32e] active:scale-95"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="relative mb-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-zinc-500">₦</span>
              <input
                type="text"
                value={formatNumber(amount)}
                onChange={handleChange}
                className={`w-full rounded-2xl border border-zinc-800 bg-zinc-900 py-4 pl-10 pr-14 text-lg font-semibold ${budgetFeedback.color} outline-none focus:border-[#32cd32]`}
              />
              <div className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col">
                <button onClick={increment} className="rounded-md p-1 text-zinc-400 hover:text-white">
                  <ChevronUpIcon className="h-4 w-4" />
                </button>
                <button onClick={decrement} className="rounded-md p-1 text-zinc-400 hover:text-white">
                  <ChevronDownIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-zinc-800">
              <div
                className={`h-full transition-all duration-300 ${budgetFeedback.meter}`}
                style={{ width: budgetFeedback.level }}
              />
            </div>

            <p className={`mb-4 mt-2 text-xs ${budgetFeedback.color}`}>{budgetFeedback.text}</p>

            <div className="mb-4">
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={3}
                placeholder="Add a short message (optional)"
                className="w-full resize-none rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-200 outline-none placeholder:text-zinc-500 focus:border-[#32cd32]"
              />
            </div>

            {submitError && <p className="mb-2 text-center text-xs text-red-500">{submitError}</p>}

            <button
              onClick={handlePlaceBid}
              disabled={loading}
              className={`w-full rounded-2xl py-4 text-sm font-bold text-black transition-transform ${
                loading
                  ? 'cursor-not-allowed bg-zinc-600'
                  : 'bg-[#32cd32] hover:bg-[#2eb32e] active:scale-95'
              }`}
            >
              {loading ? (retrying ? 'Retrying...' : 'Placing Bid...') : 'Place Bid'}
            </button>

            {submitError && (
              <button
                onClick={handlePlaceBid}
                disabled={loading}
                className="mt-3 w-full rounded-2xl border border-[#32cd32]/40 py-3 text-sm font-semibold text-[#32cd32] transition-colors hover:bg-[#32cd32]/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Retrying...' : 'Retry'}
              </button>
            )}

            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full text-center text-xs text-zinc-500 hover:text-zinc-300"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default BidModal
