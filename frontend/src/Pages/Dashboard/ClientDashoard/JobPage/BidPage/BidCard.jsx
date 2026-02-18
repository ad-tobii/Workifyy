import { useState } from 'react'
import { ArrowUpRightIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'
import useBidStore from '../../../../../store/useBidStore'
import ConfirmModal from '@/Pages/Dashboard/ProfessionalDashboard/JobPage/Components/BidPage/ConfirmModal'
import CounterOfferModal from '@/Pages/Dashboard/ProfessionalDashboard/JobPage/Components/BidPage/CounterOfferModal'
import RejectModal from './RejectModal'

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

  // Turn-based logic
  const isMyTurn = awaitingResponseFrom === 'client'
  console.log(bid)
  // TODO: replace with real rating once built
  const DUMMY_RATING = 4

  const latestMessage = negotiationHistory?.at(-1)?.message || ''

  const budgetDiff = currentAmount - job.budget
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
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src={professionalProfile?.photo || ''}
              alt={`${professional.firstname} ${professional.lastname}`}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-zinc-800"
            />
            <div>
              <div className="text-base font-semibold">
                {professional.firstname} {professional.lastname}
              </div>
              {/* TODO: replace DUMMY_RATING with real rating once built */}
              <div className="flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${i < DUMMY_RATING ? 'text-yellow-400' : 'text-zinc-700'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate(`bids/${professional._id}`)}
            className="flex items-center gap-1 rounded-full bg-zinc-800 px-3 py-2 text-xs font-medium text-zinc-300 transition-all hover:bg-zinc-700/60 hover:text-white"
          >
            Details
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Price section */}
        <div className="mb-4">
          <div className="text-3xl font-bold text-gray-200">₦ {currentAmount.toLocaleString()}</div>
          <div className={`text-xs font-medium ${budgetColor}`}>{budgetText}</div>
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

        {/* Footer: Turn Status + Action buttons */}
        <div className="flex items-center justify-between gap-3">
          {/* Turn Status */}
          <div className="flex items-center gap-2">
            {status === 'pending' && (
              <>
                <div
                  className={`h-2 w-2 rounded-full ${isMyTurn ? 'bg-[#32cd32]' : 'bg-yellow-500'}`}
                />
                {isMyTurn ? (
                  <p className="hidden text-sm font-medium text-gray-400 sm:block">Your turn</p>
                ) : (
                  <p className=" text-sm font-medium text-gray-400 ">Waiting for professional</p>
                )}
              </>
            )}
            {status !== 'pending' && (
              <p className="text-sm font-medium capitalize text-gray-500">{status}</p>
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
        message={`Accept ${professional.firstname}'s bid of ₦${currentAmount.toLocaleString()}? This will notify the professional to proceed.`}
        confirmText="Accept Bid"
        confirmVariant="success"
        loading={loading}
        error={acceptError}
      />

      <RejectModal
        isOpen={showRejectModal}
        onClose={handleCloseReject}
        onConfirm={handleReject}
        professionalName={professional.firstname}
        loading={loading}
        error={rejectError}
      />

      <CounterOfferModal
        isOpen={showCounterModal}
        onClose={handleCloseCounter}
        onConfirm={handleCounter}
        currentAmount={currentAmount}
        currentMessage={latestMessage}
        loading={loading}
        error={counterError}
      />
    </>
  )
}

export default BidCard
