import { useState } from 'react'
import useBidStore from '../../../../../../store/useBidStore'
import ConfirmModal from './ConfirmModal'
import CounterOfferModal from './CounterOfferModal'

const BidCard = ({ bid }) => {
  const { _id, jobTitle, awaitingResponseFrom, status, currentAmount, message } = bid
  const isMyTurn = awaitingResponseFrom === 'professional'

  // Modal state
  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [showCounterModal, setShowCounterModal] = useState(false)

  // Local error states
  const [acceptError, setAcceptError] = useState(null)
  const [rejectError, setRejectError] = useState(null)
  const [counterError, setCounterError] = useState(null)

  // Store actions
  const acceptBid = useBidStore(state => state.acceptBid)
  const rejectBid = useBidStore(state => state.rejectBid)
  const counterBid = useBidStore(state => state.counterBid)
  const loading = useBidStore(state => state.loading)

  // Handlers with error handling
  const handleAccept = async () => {
    setAcceptError(null)
    try {
      const result = await acceptBid(_id)
      if (result?.success) {
        setShowAcceptModal(false)
      } else {
        setAcceptError('There was an error accepting this offer. Please try again.')
      }
    } catch (error) {
      setAcceptError('There was an error accepting this offer. Please try again.')
    }
  }

  const handleReject = async () => {
    setRejectError(null)
    try {
      const result = await rejectBid(_id)
      if (result?.success) {
        setShowRejectModal(false)
      } else {
        setRejectError('There was an error rejecting this offer. Please try again.')
      }
    } catch (error) {
      setRejectError('There was an error rejecting this offer. Please try again.')
    }
  }

  const handleCounter = async (amount, msg) => {
    setCounterError(null)
    try {
      const result = await counterBid(_id, amount, msg)
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

  // Status badge styling
  const statusStyles = {
    pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    accepted: 'bg-green-500/10 text-green-400 border-green-500/20',
    rejected: 'bg-red-500/10 text-red-400 border-red-500/20',
  }

  return (
    <>
      <div className="group relative overflow-hidden rounded-2xl border border-zinc-800/50 bg-gradient-to-br from-[#1a1a1d] to-[#151518] p-6 shadow-xl transition-all hover:border-zinc-700/50 hover:shadow-2xl">
        {/* Turn indicator stripe */}
        {status === 'pending' && isMyTurn && (
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#32cd32] to-[#28a428]" />
        )}

        {/* Header: Job Title + Status Badge */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <h3 className="flex-1 text-lg font-semibold leading-tight text-white">{jobTitle}</h3>
          <span
            className={`rounded-full border px-3 py-1 text-xs font-medium capitalize ${statusStyles[status] || statusStyles.pending}`}
          >
            {status}
          </span>
        </div>

        {/* Amount */}
        <div className="mb-3">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Offer Amount</p>
          <p className="text-3xl font-bold text-white">₦{currentAmount.toLocaleString()}</p>
        </div>

        {/* Message */}
        {message && (
          <div className="mb-4 rounded-xl bg-zinc-900/50 p-3">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-1">Client Message</p>
            <p className="line-clamp-2 text-sm leading-relaxed text-gray-300">{message}</p>
          </div>
        )}

        {/* Divider */}
        <div className="my-4 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

        {/* Footer: Turn Status + Actions */}
        <div className="flex items-center justify-between gap-3">
          {/* Turn Status */}
          <div className="flex items-center gap-2">
            {status === 'pending' && (
              <>
                <div
                  className={`h-2 w-2 rounded-full ${isMyTurn ? 'bg-[#32cd32]' : 'bg-yellow-500'}`}
                />
                <p className="text-sm font-medium text-gray-400">
                  {isMyTurn ? 'Your turn' : 'Waiting for client'}
                </p>
              </>
            )}
            {status !== 'pending' && (
              <p className="text-sm font-medium capitalize text-gray-500">{status}</p>
            )}
          </div>

          {/* Action Buttons */}
          {status === 'pending' && isMyTurn && (
            <div className="flex gap-2">
              <button
                onClick={() => setShowAcceptModal(true)}
                disabled={loading}
                className="rounded-xl bg-[#32cd32] px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-[#28a428] hover:shadow-lg hover:shadow-[#32cd32]/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Accept
              </button>

              <button
                onClick={() => setShowCounterModal(true)}
                disabled={loading}
                className="rounded-xl bg-amber-500 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-500/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Counter
              </button>

              <button
                onClick={() => setShowRejectModal(true)}
                disabled={loading}
                className="rounded-xl bg-red-500 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-red-600 hover:shadow-lg hover:shadow-red-600/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Accept Modal */}
      <ConfirmModal
        isOpen={showAcceptModal}
        onClose={handleCloseAccept}
        onConfirm={handleAccept}
        title="Accept Offer"
        message={`Accept this offer of ₦${currentAmount.toLocaleString()} for "${jobTitle}"?`}
        confirmText="Accept Offer"
        confirmVariant="success"
        loading={loading}
        error={acceptError}
      />

      {/* Reject Modal */}
      <ConfirmModal
        isOpen={showRejectModal}
        onClose={handleCloseReject}
        onConfirm={handleReject}
        title="Reject Offer"
        message={`Are you sure you want to reject this offer of ₦${currentAmount.toLocaleString()}?`}
        confirmText="Reject Offer"
        confirmVariant="danger"
        loading={loading}
        error={rejectError}
      />

      {/* Counter Modal */}
      <CounterOfferModal
        isOpen={showCounterModal}
        onClose={handleCloseCounter}
        onConfirm={handleCounter}
        currentAmount={currentAmount}
        currentMessage={message}
        loading={loading}
        error={counterError}
      />
    </>
  )
}

export default BidCard