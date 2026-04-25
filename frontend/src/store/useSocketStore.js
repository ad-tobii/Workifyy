import { create } from 'zustand'
import { socket } from '../utils/socket.utils'
import useJobStore from './useJobStore'
import { getBrowserLocation } from '../utils/geoLocation.utils'
import useBidStore from './useBidStore'
import useNotificationStore from './useNotificationStore'

const useSocketStore = create((set, get) => ({
  isConnected: false,
  hasInitialized: false,

  // Professional socket initialization
  initializeSocket: async initialLocation => {
    if (get().hasInitialized) {
      return
    }

    const location = initialLocation ?? (await getBrowserLocation())
    const { longitude, latitude } = location

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
      useBidStore.getState().removeBid(bid._id)
      if (bid.job) {
        const jobId = typeof bid.job === 'object' ? bid.job._id : bid.job
        useJobStore.getState().updateJobStatus(jobId, 'ongoing')
      }
    })

    socket.on('bidRejected', data => {
      console.log('✗ Bid rejected:', data.reason)
      useBidStore.getState().removeBid(data.bidId)
    })

    socket.on('counterOffer', bid => {
      console.log('💬 Counter offer received')
      useBidStore.getState().updateBid(bid._id, bid)
    })

    // Job workflow events
    socket.on('workAccepted', data => {
      console.log('✓ Work accepted by client')
      useJobStore.getState().updateJob(data.jobId, { status: 'completed' })
    })

    socket.on('redoRequested', data => {
      console.log('↩ Redo requested by client')
      useJobStore.getState().updateJob(data.jobId, {
        status: 'ongoing',
        submission: undefined,
        redoRequest: {
          message: data.message,
          requestedAt: new Date(),
        },
      })
    })

    socket.on('newNotification', notification => {
      useNotificationStore.getState().addNotification(notification)
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
      useBidStore.getState().addBid(newBid)
    })

    socket.on('bidAccepted', bid => {
      console.log('✓ Bid accepted')
      useBidStore.getState().removeBid(bid._id)
      if (bid.job) {
        const jobId = typeof bid.job === 'object' ? bid.job._id : bid.job
        useJobStore.getState().updateJobStatus(jobId, 'ongoing')
      }
    })

    socket.on('bidWithdrawn', data => {
      console.log('↩ Bid withdrawn by professional')
      useBidStore.getState().removeBid(data.bidId)
    })

    socket.on('counterOffer', bid => {
      console.log('💬 Counter offer received')
      useBidStore.getState().updateBid(bid._id, bid)
    })

    // Job workflow events
    socket.on('workSubmitted', data => {
      console.log('📦 Work submitted by professional')
      useJobStore.getState().updateJob(data.jobId, { status: 'awaiting_review' })
    })

    socket.on('jobCancelled', data => {
      console.log('✗ Job cancelled by professional')
      useJobStore.getState().removeJob(data.jobId)
    })

    socket.on('newNotification', notification => {
      useNotificationStore.getState().addNotification(notification)
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
    socket.off('workSubmitted')
    socket.off('workAccepted')
    socket.off('redoRequested')
    socket.off('jobCancelled')
    socket.off('newNotification')
    socket.disconnect()
    set({ isConnected: false, hasInitialized: false })
  },
}))

export default useSocketStore
