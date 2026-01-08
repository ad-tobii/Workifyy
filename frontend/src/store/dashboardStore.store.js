import { create } from 'zustand'
import api from '../api/axios.api'
import useJobStore from './jobStore.store'
import getBrowserLocation from '../utils/geoLocation.utils'
import { socket } from '../utils/socket.utils'

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

      // get jobs
      const result = await api.get(`/job/get-jobs?longitude=${longitude}&latitude=${latitude}`)
      if (result.data.success) {
        // set Jobs
        useJobStore.setState({ jobs: result.data.data })

        // connect to socket

        socket.connect()
        // Emit update location
        socket.on('connect', () => {
          console.log('successfully connected to socket')
          socket.emit('update-location', { longitude, latitude })
        })

        set({ loading: false, error: null })
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
