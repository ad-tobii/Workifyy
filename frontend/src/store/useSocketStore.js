import { create } from 'zustand'
import { socket } from '../utils/socket.utils'
import useJobStore from './useJobStore'
import { getBrowserLocation } from '../utils/geoLocation.utils'
import useBidStore from './useBidStore'

const useSocketStore = create((set, get) => ({
  isConnected: false,
  hasInitialized: false,

  // Professional socket initialization
  initializeSocket: async () => {
    if (get().hasInitialized) {
      return
    }

    const { longitude, latitude } = await getBrowserLocation()

    socket.on('connect', () => {
      console.log('✓ Socket connected (Professional)')
      socket.emit('update-location', { longitude, latitude })
      set({ isConnected: true })
    })

    socket.on('disconnect', () => {
      console.log('✗ Socket disconnected (Professional)')
      set({ isConnected: false })
    })

    // Job events
    socket.on('newJob', newJob => {
      console.log('📬 New job received')
      useJobStore.getState().addJob(newJob)
    })

    // Bid events for professionals
    socket.on('bidAccepted', bid => {
      console.log('✓ Bid accepted')
      // Remove bid from list (no longer pending)
      useBidStore.getState().removeBid(bid._id)
    })

    socket.on('bidRejected', data => {
      console.log('✗ Bid rejected:', data.reason)
      // Remove bid from list (rejected by client)
      useBidStore.getState().removeBid(data.jobId)
    })

    socket.on('counterOffer', bid => {
      console.log('💬 Counter offer received')
      // Update bid with new amount and turn
      useBidStore.getState().updateBid(bid._id, {
        currentAmount: bid.currentAmount,
        awaitingResponseFrom: bid.awaitingResponseFrom,
        negotiationHistory: bid.negotiationHistory,
      })
    })

    set({ hasInitialized: true })
    socket.connect()
  },

  // Client socket initialization
  initializeClientSocket: async () => {
    if (get().hasInitialized) {
      return
    }

    socket.on('connect', () => {
      console.log('✓ Socket connected (Client)')
      set({ isConnected: true })
    })

    socket.on('disconnect', () => {
      console.log('✗ Socket disconnected (Client)')
      set({ isConnected: false })
    })

    // Bid events for clients
    socket.on('newBid', newBid => {
      console.log('📬 New bid received')
      // Add new bid to client's list
      useBidStore.getState().addBid(newBid)
    })

    socket.on('bidAccepted', bid => {
      console.log('✓ Bid accepted')
      // Remove bid from list (no longer pending)
      useBidStore.getState().removeBid(bid._id)
    })

    socket.on('bidRejected', data => {
      console.log('✗ Bid rejected')
      // This shouldn't happen on client side (they're the ones rejecting)
      // But if it does, remove the bid
      useBidStore.getState().removeBid(data.jobId)
    })

    socket.on('bidWithdrawn', data => {
      console.log('↩ Bid withdrawn by professional')
      // Remove bid from list (professional withdrew)
      useBidStore.getState().removeBid(data.jobId)
    })

    socket.on('counterOffer', bid => {
      console.log('💬 Counter offer received')
      // Update bid with new amount and turn
      useBidStore.getState().updateBid(bid._id, {
        currentAmount: bid.currentAmount,
        awaitingResponseFrom: bid.awaitingResponseFrom,
        negotiationHistory: bid.negotiationHistory,
      })
    })

    set({ hasInitialized: true })
    socket.connect()
  },

  cleanup: () => {
    socket.off('connect')
    socket.off('disconnect')
    socket.off('newJob')
    socket.off('newBid')
    socket.off('bidAccepted')
    socket.off('bidRejected')
    socket.off('bidWithdrawn')
    socket.off('counterOffer')
    socket.disconnect()
    set({ isConnected: false, hasInitialized: false })
  },
}))

export default useSocketStore
