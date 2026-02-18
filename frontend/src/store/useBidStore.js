import { create } from 'zustand'
import api from '../api/axios.api'
import useJobStore from './useJobStore'
import useUserStore from './useUserStore'

// Bid store handles all bid-related state and actions
const useBidStore = create((set, get) => ({
  // ===== STATE =====
  bids: [], // all bids belonging to the current user
  loading: false, // global loading flag for any bid action
  error: null, // last error message from any bid action
  hasFetched: false, // prevents refetching bids multiple times unnecessarily

  // ===== HELPER: Sort bids (pending at bottom) =====
  sortBids: bids => {
    return [...bids].sort((a, b) => {
      // Pending bids go to bottom
      if (a.status === 'pending' && b.status !== 'pending') return 1
      if (a.status !== 'pending' && b.status === 'pending') return -1
      // Keep original order for same status
      return 0
    })
  },

  // ===== SOCKET HELPERS (exposed for socket store) =====

  // Add new bid to list (used when client receives a new bid from professional)
  addBid: newBid => {
    set(state => {
      const exists = state.bids.some(b => b._id === newBid._id)
      if (exists) return state // Prevent duplicates

      const updatedBids = [newBid, ...state.bids]
      return { bids: state.sortBids(updatedBids) }
    })
  },

  // Update existing bid (used for counteroffers)
  updateBid: (bidId, updatedData) => {
    set(state => {
      const updatedBids = state.bids.map(bid =>
        bid._id === bidId ? { ...bid, ...updatedData } : bid
      )
      return { bids: state.sortBids(updatedBids) }
    })
  },

  // Remove bid from list (used when accepted/rejected/withdrawn)
  removeBid: bidId => {
    set(state => ({
      bids: state.bids.filter(b => b._id !== bidId),
    }))
  },

  // ===== ACTIONS =====

  // Fetch all bids for the logged-in professional
  getProBids: async () => {
    const { hasFetched, loading } = get()

    // Prevent duplicate requests if already fetched or currently loading
    if (hasFetched || loading) return

    set({ loading: true, error: null })
    try {
      const res = await api.get('/bid/professional')

      if (!res.data.success) {
        set({ error: res.data.message })
        return
      }

      set({ bids: res.data.data, hasFetched: true })
      return res.data
    } catch (error) {
      set({ error: error.response?.data?.message || 'Server error' })
      throw error
    } finally {
      set({ loading: false })
    }
  },

  // Fetch all pending bids on the logged-in client's jobs
  getClientBids: async () => {
    const { hasFetched, loading } = get()

    // Prevent duplicate requests if already fetched or currently loading
    if (hasFetched || loading) return

    set({ loading: true, error: null })
    try {
      const res = await api.get('/bid/client')

      if (!res.data.success) {
        set({ error: res.data.message })
        return
      }

      set({ bids: res.data.data, hasFetched: true })
      return res.data
    } catch (error) {
      set({ error: error.response?.data?.message || 'Server error' })
      throw error
    } finally {
      set({ loading: false })
    }
  },

  // Place a new bid on a job
  placeBid: async (jobId, amount, message) => {
    set({ loading: true, error: null })
    try {
      const res = await api.post('/bid/place', { jobId, amount, message })

      if (!res.data.success) {
        set({ error: res.data.message })
      } else {
        // Add new bid to the top of local bids list (optimistic insert)
        set(state => ({ bids: [res.data.data, ...state.bids] }))

        // Remove that job from the global job list
        // so the user doesn't see jobs they've already bid on
        useJobStore.getState().removeJob(jobId)
      }

      return res.data
    } catch (error) {
      set({ error: error.response?.data?.message || 'Server Error' })
      throw error
    } finally {
      set({ loading: false })
    }
  },

  acceptBid: async bidId => {
    set({ loading: true, error: null })
    try {
      const res = await api.patch('/bid/accept', { bidId })

      if (!res.data.success) {
        set({ error: res.data.message })
        return res.data
      }

      // Remove accepted bid from list and sort remaining
      set(state => {
        const updatedBids = state.bids.filter(b => b._id !== bidId)
        return { bids: state.sortBids(updatedBids) }
      })

      // Update job status to ongoing in jobs store
      const acceptedBid = get().bids.find(b => b._id === bidId)
      if (acceptedBid?.job) {
        const jobId = typeof acceptedBid.job === 'object' ? acceptedBid.job._id : acceptedBid.job
        useJobStore.getState().updateJobStatus(jobId, 'ongoing')
      }

      return res.data
    } catch (error) {
      set({ error: error.response?.data?.message || 'Server error' })
      throw error
    } finally {
      set({ loading: false })
    }
  },

  // Reject or withdraw a bid
  rejectBid: async (bidId, reason) => {
    set({ loading: true, error: null })
    try {
      const role = useUserStore.getState().user.role
      let res
      if (role === 'professional') {
        res = await api.patch('/bid/reject', { bidId })
      } else if (role === 'client') {
        res = await api.patch('/bid/reject', { bidId, reason })
      }

      if (!res.data.success) {
        set({ error: res.data.message })
        return res.data
      }

      // Remove rejected bid from list and sort remaining
      set(state => {
        const updatedBids = state.bids.filter(b => b._id !== bidId)
        return { bids: state.sortBids(updatedBids) }
      })

      return res.data
    } catch (error) {
      set({ error: error.response?.data?.message || 'Server error' })
      throw error
    } finally {
      set({ loading: false })
    }
  },

  // Counter a bid with a new offer
  counterBid: async (bidId, offer, message) => {
    set({ loading: true, error: null })
    try {
      const res = await api.patch('/bid/counter', { bidId, offer, message })

      if (!res.data.success) {
        set({ error: res.data.message })
        return res.data
      }

      // Update bid with new values and sort (countered bids stay pending, but turn changes)
      set(state => {
        const updatedBids = state.bids.map(bid =>
          bid._id === bidId
            ? {
                ...bid,
                currentAmount: offer,
                message: message || bid.message,
                awaitingResponseFrom:
                  bid.awaitingResponseFrom === 'professional' ? 'client' : 'professional',
              }
            : bid
        )
        return { bids: state.sortBids(updatedBids) }
      })

      return res.data
    } catch (error) {
      set({ error: error.response?.data?.message || 'Server error' })
      throw error
    } finally {
      set({ loading: false })
    }
  },
}))

export default useBidStore
