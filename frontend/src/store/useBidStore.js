import { create } from 'zustand'
import api from '../api/axios.api'
import useJobStore from './useJobStore'
import useUserStore from './useUserStore'

// Bid store handles all bid-related state and actions
const useBidStore = create((set, get) => ({
  // ===== STATE =====
  bids: [], // all bids belonging to the current user (professional)
  clientBids: [], // all pending bids on the client's jobs
  loading: false, // global loading flag for any bid action
  error: null, // last error message from any bid action
  hasFetched: false, // prevents refetching bids multiple times unnecessarily
  hasFetchedClientBids: false, // prevents refetching client bids unnecessarily

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
    const { hasFetchedClientBids, loading } = get()

    // Prevent duplicate requests if already fetched or currently loading
    if (hasFetchedClientBids || loading) return

    set({ loading: true, error: null })
    try {
      const res = await api.get('/bid/client')

      if (!res.data.success) {
        set({ error: res.data.message })
        return
      }

      set({ clientBids: res.data.data, hasFetchedClientBids: true })
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

      console.log(res.data)

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

  // Accept a bid (usually done by the client)
  acceptBid: async bidId => {
    set({ loading: true, error: null })
    try {
      const res = await api.patch('/bid/accept', { bidId })

      if (!res.data.success) {
        set({ error: res.data.message })
        return res.data
      }

      const role = useUserStore.getState().user.role
      const listKey = role === 'professional' ? 'bids' : 'clientBids'

      set(state => ({
        [listKey]: state[listKey].filter(b => b._id !== bidId),
      }))

      return res.data
    } catch (error) {
      set({ error: error.response?.data?.message || 'Server error' })
      throw error
    } finally {
      set({ loading: false })
    }
  },

  // Reject or withdraw a bid
  rejectBid: async bidId => {
    set({ loading: true, error: null })
    try {
      const res = await api.patch('/bid/reject', { bidId })

      if (!res.data.success) {
        set({ error: res.data.message })
        return res.data
      }

      const role = useUserStore.getState().user.role

      if (role === 'professional') {
        // Professional withdrawing their own bid
        set(state => ({
          bids: state.bids.filter(b => b._id !== bidId),
        }))
      } else {
        // Client rejecting — mark as rejected in clientBids
        set(state => ({
          clientBids: state.clientBids.map(b =>
            b._id === bidId ? { ...b, status: 'rejected' } : b
          ),
        }))
      }

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

      const role = useUserStore.getState().user.role
      const listKey = role === 'professional' ? 'bids' : 'clientBids'

      set(state => ({
        [listKey]: state[listKey].map(b =>
          b._id === bidId
            ? {
                ...b,
                currentAmount: offer,
                message: message || b.message,
                awaitingResponseFrom:
                  b.awaitingResponseFrom === 'professional' ? 'client' : 'professional',
              }
            : b
        ),
      }))

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
