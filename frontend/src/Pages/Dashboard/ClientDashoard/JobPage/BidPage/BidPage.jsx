import { useEffect } from 'react'
import useBidStore from '../../../../../store/useBidStore'
import BidCard from './BidCard'

const BidPage = () => {
  const clientBids = useBidStore(state => state.clientBids)
  const getClientBids = useBidStore(state => state.getClientBids)
  const loading = useBidStore(state => state.loading)
  const error = useBidStore(state => state.error)

  useEffect(() => {
    getClientBids()
  }, [])

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center text-gray-400">Loading bids...</div>
    )
  }

  if (error) {
    return <div className="flex h-40 items-center justify-center text-red-400">{error}</div>
  }

  if (!clientBids.length) {
    return <div className="flex h-40 items-center justify-center text-gray-400">No bids yet.</div>
  }

  return (
    <div className="mx-auto w-[90%] space-y-4">
      {clientBids.map(bid => (
        <BidCard key={bid._id} bid={bid} />
      ))}
    </div>
  )
}

export default BidPage
