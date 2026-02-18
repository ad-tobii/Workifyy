import { useEffect } from 'react'
import useBidStore from '../../../../../store/useBidStore'
import BidCard from './BidCard'

const BidPage = () => {
  const bids = useBidStore(state => state.bids)
  const getClientBids = useBidStore(state => state.getClientBids)
  const loading = useBidStore(state => state.loading)
  const hasFetched = useBidStore(state => state.hasFetched)
  const error = useBidStore(state => state.error)

  useEffect(() => {
    getClientBids()
  }, [])

  // Show loading only on initial fetch
  if (!hasFetched && loading) {
    return (
      <div className="flex h-40 items-center justify-center text-gray-400">Loading bids...</div>
    )
  }

  // Show error only if fetch failed (not action errors)
  if (!hasFetched && error) {
    return (
      <div className="flex h-40 flex-col items-center justify-center gap-2">
        <p className="text-red-400">Error fetching bids.</p>
        <p className="text-sm text-gray-500">Please try refreshing the page.</p>
      </div>
    )
  }

  // Show empty state if fetched successfully but no bids
  if (hasFetched && !bids.length) {
    return <div className="flex h-40 items-center justify-center text-gray-400">No bids yet.</div>
  }

  return (
    <div className="mx-auto w-[90%] space-y-4">
      {bids.map(bid => (
        <BidCard key={bid._id} bid={bid} />
      ))}
    </div>
  )
}

export default BidPage
