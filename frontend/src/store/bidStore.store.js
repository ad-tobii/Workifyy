import { create } from 'zustand'
import api from '../api/axios.api'
import useJobStore from './jobStore.store'
import useUserStore from './userStore.store'

const useBidStore = create((set, get) => ({
  bids: [],
  loading: false,
  error: null,
  hasFetched: false,

  // fetch professional bids
  getProBids: async () => {
    const { hasFetched, loading } = get()
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

  // Place a bid
  placeBid: async (jobId, amount, message) => {
    set({ loading: true, error: null })
    try {
      const res = await api.post('/bid/place', { jobId, amount, message })
      if (!res.data.success) {
        set({ error: res.data.message })
      } else {
        set(state => ({ bids: [res.data.data, ...state.bids] }))
        const jobs = useJobStore.getState().jobs
        const newJobs = jobs.filter(job => job._id !== jobId)
        useJobStore.setState({ jobs: newJobs })
      }
      return res.data
    } catch (error) {
      set({ error: error.response?.data?.message || 'Server Error' })
      throw error
    } finally {
      set({ loading: false })
    }
  },

  // Accept a bid
  acceptBid: async bidId => {
    set({ loading: true, error: null })
    try {
      const res = await api.patch('/bid/accept', { bidId })
      if (!res.data.success) {
        set({ error: res.data.message })
        return res.data
      }

      // Optimistic update: mark bid as accepted
      set(state => ({
        bids: state.bids.map(b => (b._id === bidId ? { ...b, status: 'accepted' } : b)),
      }))

      return res.data
    } catch (error) {
      set({ error: error.response?.data?.message || 'Server error' })
      throw error
    } finally {
      set({ loading: false })
    }
  },

  // Reject a bid
  rejectBid: async bidId => {
    set({ loading: true, error: null })
    try {
      const res = await api.patch('/bid/reject', { bidId })
      if (!res.data.success) {
        set({ error: res.data.message })
        return res.data
      }

      if (useUserStore.getState().user.role === 'professional') {
        set(state => ({
          bids: state.bids.map(b => (b._id === bidId ? { ...b, status: 'withdrawn' } : b)),
        }))
      } else {
        set(state => ({
          bids: state.bids.map(b => (b._id === bidId ? { ...b, status: 'rejected' } : b)),
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

  // Counter a bid
  counterBid: async (bidId, offer, message) => {
    set({ loading: true, error: null })
    try {
      const res = await api.patch('/bid/counter', { bidId, offer, message })
      if (!res.data.success) {
        set({ error: res.data.message })
        return res.data
      }

      // Optimistic update: update currentAmount, last message, awaitingResponseFrom
      set(state => ({
        bids: state.bids.map(b =>
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
