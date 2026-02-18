import { create } from 'zustand'
import api from '../api/axios.api'
import { getBrowserLocation } from '../utils/geoLocation.utils'

const useJobStore = create((set, get) => ({
  // --- STATE ---
  jobs: [],
  job: null,
  loading: false,
  error: null,

  // --- HELPERS ---

  // Upsert job: if exists, update it; if not, add it
  upsertJob: job => {
    set(state => {
      const existingIndex = state.jobs.findIndex(j => j._id === job._id)

      if (existingIndex !== -1) {
        // Job exists, update it
        const updatedJobs = [...state.jobs]
        updatedJobs[existingIndex] = { ...updatedJobs[existingIndex], ...job }
        return { jobs: updatedJobs }
      } else {
        // Job doesn't exist, add it
        return { jobs: [job, ...state.jobs] }
      }
    })
  },

  // --- ACTIONS ---
  setJobs: jobs => set({ jobs }),

  addJob: job =>
    set(state => ({
      jobs: [job, ...state.jobs],
    })),

  removeJob: jobId =>
    set(state => ({
      jobs: state.jobs.filter(job => job._id !== jobId),
    })),

  updateJobStatus: (jobId, status) => {
    set(state => ({
      jobs: state.jobs.map(job => (job._id === jobId ? { ...job, status } : job)),
    }))
  },

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

      // Update the local jobs list with the new job from server
      if (res.data?.data) {
        get().addJob(res.data.data)
      }
      set({ loading: false })

      return res.data // Return to the component for success handling
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to post job'
      set({ error: errorMsg, loading: false })

      console.error('Store Error:', errorMsg)
      throw error
    }
  },

  // Fetch a single job by ID
  fetchJob: async jobId => {
    set({ loading: true, error: null })

    try {
      if (!jobId) throw new Error('Job ID is required')

      const res = await api.get(`/job/${jobId}`)

      if (!res.data?.success) {
        throw new Error(res.data?.message || 'Failed to fetch job')
      }

      // Update the store with the fetched job
      set({ job: res.data.data, loading: false })

      return res.data.data
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Failed to fetch job'
      set({ error: errorMsg, loading: false })
      console.error('Store Error:', errorMsg)
      throw error
    }
  },

  // Fetch ongoing jobs and merge into main jobs array
  fetchOngoingJobs: async () => {
    set({ loading: true, error: null })

    try {
      const res = await api.get('/job/ongoing')

      if (!res.data?.success) {
        throw new Error(res.data?.message || 'Failed to fetch ongoing jobs')
      }

      // Upsert each ongoing job into the main jobs array
      const ongoingJobs = res.data.data || []
      ongoingJobs.forEach(job => {
        get().upsertJob(job)
      })

      set({ loading: false })
      return res.data.data
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || error.message || 'Failed to fetch ongoing jobs'
      set({ error: errorMsg, loading: false })
      console.error('Store Error:', errorMsg)
      throw error
    }
  },

  // Clear selected job
  clearJob: () => set({ job: null, error: null }),
}))

export default useJobStore
