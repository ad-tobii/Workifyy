import useBidStore from '../../../../store/bidStore.store'

const BidCard = ({ bid }) => {
  const { _id, jobTitle, awaitingResponseFrom, status, currentAmount, message } = bid

  const isMyTurn = awaitingResponseFrom === 'professional'

  return (
    <div className="w-[90%] rounded-2xl bg-[#151518] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition hover:translate-y-[-2px]">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold leading-snug text-white">{jobTitle}</h3>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
            status === 'pending'
              ? 'bg-yellow-500/10 text-yellow-400'
              : status === 'accepted'
                ? 'bg-green-500/10 text-green-400'
                : status === 'rejected'
                  ? 'bg-red-500/10 text-red-400'
                  : 'bg-gray-500/10 text-gray-400'
          }`}
        >
          {status}
        </span>
      </div>

      {/* Amount */}
      <div className="mt-3 text-2xl font-semibold text-white">
        ₦{currentAmount.toLocaleString()}
      </div>

      {/* Message */}
      <p className="mt-2 line-clamp-2 text-sm text-gray-400">{message || 'No message attached'}</p>

      {/* Divider */}
      <div className="my-4 h-px bg-white/5" />

      {/* Footer */}
      <div className="flex items-center justify-between">
        {/* State text */}
        <p className="text-xs text-gray-500">
          {status === 'pending'
            ? isMyTurn
              ? 'Your turn to respond'
              : 'Waiting for client response'
            : `Bid ${status}`}
        </p>

        {/* Actions */}
        {status === 'pending' && isMyTurn && (
          <div className="flex gap-2">
            <button className=" rounded-2xl bg-[#32cd32] px-4 py-2 text-xs font-medium text-white hover:bg-green-500/20">
              Accept
            </button>

            <button className="rounded-2xl bg-yellow-500 px-4 py-2 text-xs font-medium text-white hover:bg-yellow-500/20">
              Counter
            </button>

            <button className="rounded-2xl bg-red-500 px-4 py-2 text-xs font-medium text-white hover:bg-red-500/20">
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default BidCard
