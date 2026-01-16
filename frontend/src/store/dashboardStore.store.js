import { create } from 'zustand'
import api from '../api/axios.api'
import useJobStore from './jobStore.store'
import { getBrowserLocation } from '../utils/geoLocation.utils'

const useDashboardStore = create((set, get) => ({
  loading: false,
  error: null,

  getDashboardData: async () => {
    set({ loading: true, error: null })
    try {
      const res = await api.get('/dashboard')

      useJobStore.setState({ jobs: res.data.data.jobs })
     

      set({ loading: false, error: null })
    } catch (error) {
      const msg = error.response?.data?.message || 'Server Error'
      set({ error: msg, loading: false })
    }
  },

  getProDashboardData: async () => {
    set({ loading: true, error: false })

    try {
      console.log('Aiit starting now')
      const { longitude, latitude } = await getBrowserLocation()
      const result = await api.get(`/job/get-jobs?longitude=${longitude}&latitude=${latitude}`)

      if (result.data.success) {
        useJobStore.setState({ jobs: result.data.data })
        set({ loading: false, error: null })
        return true // Now this ONLY happens after connection
      } else {
        set({ loading: false, error: result.data.message || 'Server error' })
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to fetch job'
      set({ loading: false, error: errorMsg })
      console.log(error)
    }
  },
}))

export default useDashboardStore
