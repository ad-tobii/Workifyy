import { useState } from 'react'
import useBidStore from '../../../../../../store/bidStore.store'
import ConfirmModal from './ConfirmModal'
import CounterOfferModal from './CounterOfferModal'

const BidCard = ({ bid }) => {
  const { _id, jobTitle, awaitingResponseFrom, status, currentAmount, message } = bid
  const isMyTurn = awaitingResponseFrom === 'professional'

  // Modal state
  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [showCounterModal, setShowCounterModal] = useState(false)
  const [acceptSuccess, setAcceptSuccess] = useState(false)

  // Store actions
  const acceptBid = useBidStore(state => state.acceptBid)
  const rejectBid = useBidStore(state => state.rejectBid)
  const counterBid = useBidStore(state => state.counterBid)
  const loading = useBidStore(state => state.loading)

  // Handlers
  const handleAcceptClick = () => setShowAcceptModal(true)
  const handleRejectClick = () => setShowRejectModal(true)
  const handleCounterClick = () => setShowCounterModal(true)

  const handleConfirmAccept = async () => {
    await acceptBid(_id)
    setShowAcceptModal(false)
    setAcceptSuccess(true)
  }

  const handleConfirmReject = async () => {
    await rejectBid(_id)
    setShowRejectModal(false)
  }

  const handleConfirmCounter = async (amount, msg) => {
    await counterBid(_id, amount, msg)
    setShowCounterModal(false)
  }

  return (
    <>
      <div className="w-full rounded-2xl bg-[#151518] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition hover:translate-y-[-2px]">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-snug text-white">{jobTitle}</h3>

          <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium capitalize text-yellow-400">
            {status}
          </span>
        </div>

        {/* Amount */}
        <div className="mt-3 text-2xl font-semibold text-white">
          ₦{currentAmount.toLocaleString()}
        </div>

        {/* Message */}
        <p className="mt-2 line-clamp-2 text-sm text-gray-400">
          {message || 'No message attached'}
        </p>

        {/* Divider */}
        <div className="my-4 h-px bg-white/5" />

        {/* Footer */}
        <div className="flex items-center justify-between">
          <p className="hidden text-sm text-zinc-400 sm:block">
            {isMyTurn ? 'Your turn to respond' : 'Waiting for client response'}
          </p>

          {status === 'pending' && isMyTurn && (
            <div className="flex gap-2">
              <button
                onClick={handleAcceptClick}
                disabled={loading}
                className="rounded-2xl bg-[#32cd32] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#28a428] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Accept
              </button>

              <button
                onClick={handleCounterClick}
                disabled={loading}
                className="rounded-2xl bg-yellow-500 px-4 py-2 text-xs font-medium text-white transition hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Counter
              </button>

              <button
                onClick={handleRejectClick}
                disabled={loading}
                className="rounded-2xl bg-red-500 px-4 py-2 text-xs font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Accept Confirmation Modal */}
      <ConfirmModal
        isOpen={showAcceptModal}
        onClose={() => setShowAcceptModal(false)}
        onConfirm={handleConfirmAccept}
        title="Accept Offer"
        message="Are you sure you want to accept this offer?"
        confirmText="Yes"
        cancelText="No"
        loading={loading}
      />

      {/* Reject Confirmation Modal */}
      <ConfirmModal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        onConfirm={handleConfirmReject}
        title="Reject Offer"
        message="Are you sure you want to reject this offer?"
        confirmText="Yes"
        cancelText="No"
        confirmVariant="danger"
        loading={loading}
      />

      {/* Counter Offer Modal */}
      <CounterOfferModal
        isOpen={showCounterModal}
        onClose={() => setShowCounterModal(false)}
        onConfirm={handleConfirmCounter}
        currentAmount={currentAmount}
        currentMessage={message}
        loading={loading}
      />

      {/* Success Modal */}
      <ConfirmModal
        isOpen={acceptSuccess}
        onClose={() => setAcceptSuccess(false)}
        title="Success!"
        message="Offer successfully accepted!"
        showCancel={false}
        confirmText="Close"
        onConfirm={() => setAcceptSuccess(false)}
      />
    </>
  )
}

export default BidCard
