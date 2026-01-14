import { create } from 'zustand'
import api from '../api/axios.api'

const useBidStore = create((set, get) => ({
  bids: [],
  error: null,
  loading: false,

  placeBid: async (jobId, amount, message) => {
    set({ loading: true, error: null })

    try {
      const result = await api.post('/bid/place', {
        jobId,
        amount,
        message,
      })

      if (!result.data.success) {
        set({ error: result.data.message })
      } else {
        set(state => ({
          bids: [result.data.data, ...state.bids],
        }))
      }

      return result.data
    } catch (error) {
      const msg = error.response?.data?.message || 'Server Error'
      set({ error: msg })
      throw error
    } finally {
      set({ loading: false })
    }
  },
}))

export default useBidStore
