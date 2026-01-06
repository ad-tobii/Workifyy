import { create } from 'zustand'
import api from '../api/axios.api'
import useJobStore from './jobStore.store'

const useDashboardStore = create((set, get) => ({
  loading: false,
  error: null,

  getDashboardData: async () => {
    set({ loading: true, error: null })
    try {
      const res = await api.get('/dashboard')

      useJobStore.setState({ jobs: res.data.data.jobs })

      set({ loading: false })
    } catch (error) {
      const msg = error.response?.data?.message || 'Server Error'
      set({ error: msg, loading: false })
    }
  },
}))

export default useDashboardStore
