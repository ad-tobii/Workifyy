import useBidStore from '../../../../../../store/bidStore.store'
import { useEffect } from 'react'
import BidCard from './BidCards'
import React from 'react'

const BidPage = () => {
  const bids = useBidStore(state => state.bids)
  const getProBids = useBidStore(state => state.getProBids)
  const bidLoading = useBidStore(state => state.loading)

  // Only fetch once when component mounts
  useEffect(() => {
    getProBids()
  }, [getProBids])

  return (
    <div className="mx-auto w-[90%] space-y-4">
      {bidLoading && <div className="text-center text-gray-400">Loading bids...</div>}

      {!bidLoading && bids.length === 0 && (
        <div className="text-center text-gray-500">No bids yet</div>
      )}

      {bids.length > 0 && bids.map(bid => <BidCard key={bid._id} bid={bid} />)}
    </div>
  )
}

export default BidPage
