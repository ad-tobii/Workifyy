import { create } from 'zustand'
import api from '../api/axios.api'
import getBrowserLocation from '../utils/geoLocation.utils'

const useJobStore = create((set, get) => ({
  // --- STATE ---
  jobs: [],
  loading: false,
  error: null,

  // --- ACTIONS ---
  postJob: async data => {
    set({ loading: true, error: null })

    try {
      const formData = new FormData()
      const location = await getBrowserLocation()
      formData.append('latitude', location.latitude)
      formData.append('longitude', location.longitude)

      Object.keys(data).forEach(key => {
        if (key === 'images' && Array.isArray(data[key])) {
          // Loop and append each file individually
          data[key].forEach(file => {
            formData.append('images', file)
          })
        } else if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key])
        }
      })
      const res = await api.post('/job/post-job', formData)

      // 2. Update the local jobs list with the new job from server
      set(state => ({
        jobs: [res.data?.data, ...state.jobs],
        loading: false,
      }))

      return res.data // Return to the component for success handling (e.g., redirect)
    } catch (error) {
      // 3. Always reset loading on error and save the error message
      const errorMsg = error.response?.data?.message || 'Failed to post job'
      set({ error: errorMsg, loading: false })

      console.error('Store Error:', errorMsg)
      throw error // Throw so the component's catch block also runs
    }
  },
}))

export default useJobStore
