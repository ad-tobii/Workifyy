import { useState } from 'react'
import { ArrowUpRightIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'
import useBidStore from '../../../../../store/useBidStore'
import ConfirmModal from '@/Pages/Dashboard/ProfessionalDashboard/JobPage/Components/BidPage/ConfirmModal'
import CounterOfferModal from '@/Pages/Dashboard/ProfessionalDashboard/JobPage/Components/BidPage/CounterOfferModal'
import RejectModal from './RejectModal'

const getDisplayName = pro => {
  const first = pro?.firstname?.trim()
  const last = pro?.lastname?.trim()
  const full = pro?.fullname?.trim()

  if (first && last) return `${first} ${last}`
  return full || first || 'Professional'
}

const BidCard = ({ bid }) => {
  const navigate = useNavigate()
  const acceptBid = useBidStore(state => state.acceptBid)
  const rejectBid = useBidStore(state => state.rejectBid)
  const counterBid = useBidStore(state => state.counterBid)
  const loading = useBidStore(state => state.loading)

  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [showCounterModal, setShowCounterModal] = useState(false)

  // Local error states for each action
  const [acceptError, setAcceptError] = useState(null)
  const [rejectError, setRejectError] = useState(null)
  const [counterError, setCounterError] = useState(null)

  const {
    professional,
    professionalProfile,
    job,
    currentAmount,
    negotiationHistory,
    awaitingResponseFrom,
    status,
  } = bid || {}

  const professionalName = getDisplayName(professional)
  const professionalFirstName = professional?.firstname?.trim() || professionalName
  const bidAmount = Number(currentAmount || 0)
  const history = negotiationHistory ?? []
  const jobBudget = Number(job?.budget || 0)

  // Turn-based logic
  const isMyTurn = awaitingResponseFrom === 'client'

  const reviews = professionalProfile?.reviews ?? []
  const avgRating = reviews.length > 0
    ? Math.round(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length)
    : 0

  const latestMessage = history.at(-1)?.message || ''

  const previousAmount =
    history.length > 1 ? Number(history.at(-2)?.amount || 0) : jobBudget
  const budgetDiff = bidAmount - previousAmount
  const budgetText =
    budgetDiff === 0
      ? 'Matches your budget'
      : budgetDiff < 0
        ? `₦ ${Math.abs(budgetDiff).toLocaleString()} below your budget`
        : `₦ ${budgetDiff.toLocaleString()} above your budget`

  const budgetColor =
    budgetDiff === 0 ? 'text-gray-400' : budgetDiff < 0 ? 'text-emerald-400' : 'text-red-400'

  const handleAccept = async () => {
    setAcceptError(null)
    try {
      const result = await acceptBid(bid._id)
      if (result?.success) {
        setShowAcceptModal(false)
      } else {
        setAcceptError('There was an error accepting this bid. Please try again.')
      }
    } catch (error) {
      setAcceptError('There was an error accepting this bid. Please try again.')
    }
  }

  const handleReject = async reason => {
    setRejectError(null)
    try {
      const result = await rejectBid(bid._id, reason)
      if (result?.success) {
        setShowRejectModal(false)
      } else {
        setRejectError('There was an error rejecting this bid. Please try again.')
      }
    } catch (error) {
      setRejectError('There was an error rejecting this bid. Please try again.')
    }
  }

  const handleCounter = async (offer, message) => {
    setCounterError(null)
    try {
      const result = await counterBid(bid._id, offer, message)
      if (result?.success) {
        setShowCounterModal(false)
      } else {
        setCounterError('There was an error sending your counteroffer. Please try again.')
      }
    } catch (error) {
      setCounterError('There was an error sending your counteroffer. Please try again.')
    }
  }

  const handleCloseAccept = () => {
    setAcceptError(null)
    setShowAcceptModal(false)
  }

  const handleCloseReject = () => {
    setRejectError(null)
    setShowRejectModal(false)
  }

  const handleCloseCounter = () => {
    setCounterError(null)
    setShowCounterModal(false)
  }
  return (
    <>
      <div className="group relative mx-auto my-4 overflow-hidden rounded-2xl border border-zinc-800/50 bg-[#151518] p-5 text-white shadow-xl transition-all hover:border-zinc-700/50">
        {/* Turn indicator stripe */}
        {status === 'pending' && isMyTurn && (
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#32cd32] to-[#28a428]" />
        )}

        {/* Top row: avatar + name/rating + profile button */}
        <div className="mb-6 flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <img
              src={professionalProfile?.photo || ''}
              alt={professionalName}
              className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-zinc-800"
            />
            <div className="min-w-0">
              <div className="text-sm font-semibold leading-snug line-clamp-2 sm:text-base sm:leading-normal sm:line-clamp-none sm:truncate">
                {professionalName}
              </div>
              {/* TODO: replace DUMMY_RATING with real rating once built */}
              <div className="flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${i < avgRating ? 'text-yellow-400' : 'text-zinc-700'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate(`/Dashboard/clientdashboard/bids/${bid._id}`)}
            className="flex shrink-0 items-center gap-1 rounded-full bg-zinc-800 px-3 py-2 text-xs font-medium text-zinc-300 transition-all hover:bg-zinc-700/60 hover:text-white"
          >
            Details
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Price section */}
        <div className="mb-4">
          <div className="text-3xl font-bold text-gray-200">₦ {bidAmount.toLocaleString()}</div>
          <div className={`text-xs font-medium ${budgetColor}`}>{budgetText}</div>
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

        {/* Footer: Turn Status + Action buttons */}
        <div className="flex items-center justify-between gap-3">
          {/* Turn Status */}
          <div className="flex items-center">
            {status === 'pending' && (
              <div
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold ${
                  isMyTurn
                    ? 'bg-[#32cd32]/15 text-[#32cd32]'
                    : 'bg-zinc-800/80 text-zinc-400'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${isMyTurn ? 'bg-[#32cd32]' : 'bg-yellow-500'}`}
                />
                {isMyTurn ? 'Your turn' : 'Awaiting'}
              </div>
            )}
            {status !== 'pending' && (
              <div className="flex items-center gap-1.5 rounded-xl bg-zinc-800/80 px-3 py-1.5 text-xs font-semibold text-zinc-400">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
                <span className="capitalize">{status}</span>
              </div>
            )}
          </div>

          {/* Action buttons - only show when it's client's turn and status is pending */}
          {status === 'pending' && isMyTurn && (
            <div className="flex gap-2">
              <button
                onClick={() => setShowAcceptModal(true)}
                disabled={loading}
                className="flex-1 rounded-xl bg-[#32cd32] px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-[#2eb82e] hover:shadow-lg hover:shadow-[#32cd32]/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Accept
              </button>
              <button
                onClick={() => setShowCounterModal(true)}
                disabled={loading}
                className="flex-1 rounded-xl bg-amber-500 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-500/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Counter
              </button>
              <button
                onClick={() => setShowRejectModal(true)}
                disabled={loading}
                className="flex-1 rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={showAcceptModal}
        onClose={handleCloseAccept}
        onConfirm={handleAccept}
        title="Accept Bid"
        message={`Accept ${professionalFirstName}'s bid of ₦${bidAmount.toLocaleString()}? This will notify the professional to proceed.`}
        confirmText="Accept Bid"
        confirmVariant="success"
        loading={loading}
        error={acceptError}
      />

      <RejectModal
        isOpen={showRejectModal}
        onClose={handleCloseReject}
        onConfirm={handleReject}
        professionalName={professionalFirstName}
        loading={loading}
        error={rejectError}
      />

      <CounterOfferModal
        isOpen={showCounterModal}
        onClose={handleCloseCounter}
        onConfirm={handleCounter}
        currentAmount={bidAmount}
        currentMessage={latestMessage}
        loading={loading}
        error={counterError}
      />
    </>
  )
}

export default BidCard
