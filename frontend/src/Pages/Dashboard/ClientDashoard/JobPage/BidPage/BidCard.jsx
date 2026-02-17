import { useState } from 'react'
import { ArrowUpRightIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'
import useBidStore from '../../../../../store/useBidStore'
import ConfirmModal from '@/Pages/Dashboard/ProfessionalDashboard/JobPage/Components/BidPage/ConfirmModal'
import CounterOfferModal from '@/Pages/Dashboard/ProfessionalDashboard/JobPage/Components/BidPage/CounterOfferModal'

const BidCard = ({ bid }) => {
  const navigate = useNavigate()
  const acceptBid = useBidStore(state => state.acceptBid)
  const rejectBid = useBidStore(state => state.rejectBid)
  const counterBid = useBidStore(state => state.counterBid)
  const loading = useBidStore(state => state.loading)

  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [showCounterModal, setShowCounterModal] = useState(false)

  const { professional, job, currentAmount, negotiationHistory } = bid

  // TODO: replace with real rating once built
  const DUMMY_RATING = 4

  // Get latest message from negotiation history for counter modal pre-fill
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
    await acceptBid(bid._id)
    setShowAcceptModal(false)
  }

  const handleReject = async () => {
    await rejectBid(bid._id)
    setShowRejectModal(false)
  }

  const handleCounter = async (offer, message) => {
    await counterBid(bid._id, offer, message)
    setShowCounterModal(false)
  }

  return (
    <>
      <div className="mx-auto my-4 rounded-2xl border border-zinc-800/50 bg-[#151518] p-5 text-white shadow-xl">
        {/* Top row: avatar + name/rating + profile button */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src={professional.photo}
              alt={`${professional.firstname} ${professional.lastname}`}
              className="h-12 w-12 rounded-full object-cover"
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
            className="flex items-center gap-1 rounded-full bg-zinc-800 px-3 py-3 text-sm font-medium text-zinc-300 transition-all hover:bg-zinc-700/60 hover:text-white"
          >
            Details
            <ArrowUpRightIcon className="h-4 w-4 font-extrabold" />
          </button>
        </div>

        {/* Price section */}
        <div className="mb-6">
          <div className="text-3xl font-bold text-gray-200">₦ {currentAmount.toLocaleString()}</div>
          <div className={`text-xs font-medium ${budgetColor}`}>{budgetText}</div>
        </div>

        <hr className="my-3 border-zinc-800" />

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowAcceptModal(true)}
            className="flex-1 rounded-full bg-[#32cd32] py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#2eb82e] hover:shadow-lg hover:shadow-[#32cd32]/20"
          >
            Accept
          </button>
          <button
            onClick={() => setShowCounterModal(true)}
            className="flex-1 rounded-full bg-amber-500 py-2.5 text-sm font-semibold text-white transition-all hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-500/20"
          >
            Counter
          </button>
          <button
            onClick={() => setShowRejectModal(true)}
            className="flex-1 rounded-full bg-red-600 py-2.5 text-sm font-semibold text-white transition-all hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/20"
          >
            Reject
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={showAcceptModal}
        onClose={() => setShowAcceptModal(false)}
        onConfirm={handleAccept}
        title="Accept Bid"
        message={`Accept ${professional.firstname}'s bid of ₦${currentAmount.toLocaleString()}? This will notify the professional to proceed.`}
        confirmText="Accept Bid"
        confirmVariant="success"
        loading={loading}
      />

      <ConfirmModal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        onConfirm={handleReject}
        title="Reject Bid"
        message={`Are you sure you want to reject ${professional.firstname}'s bid? This action cannot be undone.`}
        confirmText="Reject Bid"
        confirmVariant="danger"
        loading={loading}
      />

      <CounterOfferModal
        isOpen={showCounterModal}
        onClose={() => setShowCounterModal(false)}
        onConfirm={handleCounter}
        currentAmount={currentAmount}
        currentMessage={latestMessage}
        loading={loading}
      />
    </>
  )
}

export default BidCard
