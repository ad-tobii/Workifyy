import { create } from 'zustand'
import api from '../api/axios.api'
import { getBrowserLocation } from '../utils/geoLocation.utils'

const CLIENT_JOB_STATUS_ORDER = {
  awaiting_review: 0,
  ongoing: 1,
  open: 2,
  completed: 3,
}

const sortClientJobsByStatus = jobs => {
  if (!Array.isArray(jobs)) return []

  return [...jobs].sort((a, b) => {
    const aOrder = CLIENT_JOB_STATUS_ORDER[a?.status] ?? Number.MAX_SAFE_INTEGER
    const bOrder = CLIENT_JOB_STATUS_ORDER[b?.status] ?? Number.MAX_SAFE_INTEGER

    if (aOrder !== bOrder) {
      return aOrder - bOrder
    }

    const createdAtDiff = new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0)
    if (createdAtDiff !== 0) {
      return createdAtDiff
    }

    return (a?._id || '').localeCompare(b?._id || '')
  })
}

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
        const updatedJobs = [...state.jobs]
        updatedJobs[existingIndex] = { ...updatedJobs[existingIndex], ...job }
        return { jobs: sortClientJobsByStatus(updatedJobs) }
      } else {
        return { jobs: sortClientJobsByStatus([job, ...state.jobs]) }
      }
    })
  },

  // --- ACTIONS ---
  setJobs: jobs => set({ jobs: sortClientJobsByStatus(jobs) }),

  addJob: job =>
    set(state => ({
      jobs: sortClientJobsByStatus([job, ...state.jobs]),
    })),

  removeJob: jobId =>
    set(state => ({
      jobs: state.jobs.filter(job => job._id !== jobId),
    })),

  updateJobStatus: (jobId, status) => {
    set(state => ({
      jobs: sortClientJobsByStatus(state.jobs.map(job => (job._id === jobId ? { ...job, status } : job))),
    }))
  },

  updateJob: (jobId, updates) => {
    set(state => ({
      jobs: sortClientJobsByStatus(
        state.jobs.map(job => (job._id === jobId ? { ...job, ...updates } : job))
      ),
    }))
    const currentJob = get().job
    if (currentJob && currentJob._id === jobId) {
      set({ job: { ...currentJob, ...updates } })
    }
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
          data[key].forEach(file => {
            formData.append('images', file)
          })
        } else if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key])
        }
      })
      const res = await api.post('/job/post-job', formData)

      if (res.data?.data) {
        get().addJob(res.data.data)
      }
      set({ loading: false })

      return res.data
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to post job'
      set({ error: errorMsg, loading: false })

      console.error('Store Error:', errorMsg)
      throw error
    }
  },

  fetchJob: async jobId => {
    set({ loading: true, error: null })

    try {
      if (!jobId) throw new Error('Job ID is required')

      const res = await api.get(`/job/${jobId}`)

      if (!res.data?.success) {
        throw new Error(res.data?.message || 'Failed to fetch job')
      }

      set({ job: res.data.data, loading: false })

      return res.data.data
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Failed to fetch job'
      set({ error: errorMsg, loading: false })
      console.error('Store Error:', errorMsg)
      throw error
    }
  },

  fetchOngoingJobs: async () => {
    set({ loading: true, error: null })

    try {
      const res = await api.get('/job/ongoing')

      if (!res.data?.success) {
        throw new Error(res.data?.message || 'Failed to fetch ongoing jobs')
      }

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

  submitWork: async (jobId, images, message) => {
    set({ loading: true, error: null })

    try {
      const formData = new FormData()
      formData.append('jobId', jobId)
      formData.append('message', message || '')

      images.forEach(file => {
        formData.append('images', file)
      })

      const res = await api.post('/job/submit-work', formData)

      if (!res.data?.success) {
        throw new Error(res.data?.message || 'Failed to submit work')
      }

      get().updateJob(jobId, {
        status: 'awaiting_review',
        submission: res.data.data.submission,
      })

      set({ loading: false })
      return res.data
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Failed to submit work'
      set({ error: errorMsg, loading: false })
      console.error('Store Error:', errorMsg)
      throw error
    }
  },

  acceptWork: async (jobId, rating, review) => {
    set({ loading: true, error: null })

    try {
      const res = await api.post('/job/accept-work', { jobId, rating, review })

      if (!res.data?.success) {
        throw new Error(res.data?.message || 'Failed to accept work')
      }

      get().updateJob(jobId, { status: 'completed' })

      set({ loading: false })
      return res.data
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Failed to accept work'
      set({ error: errorMsg, loading: false })
      console.error('Store Error:', errorMsg)
      throw error
    }
  },

  requestRedo: async (jobId, message) => {
    set({ loading: true, error: null })

    try {
      const res = await api.post('/job/request-redo', { jobId, message })

      if (!res.data?.success) {
        throw new Error(res.data?.message || 'Failed to request redo')
      }

      get().updateJob(jobId, {
        status: 'ongoing',
        submission: undefined,
        redoRequest: res.data.data.redoRequest,
      })

      set({ loading: false })
      return res.data
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Failed to request redo'
      set({ error: errorMsg, loading: false })
      console.error('Store Error:', errorMsg)
      throw error
    }
  },

  cancelJob: async jobId => {
    set({ loading: true, error: null })

    try {
      const res = await api.post('/job/cancel-job', { jobId })

      if (!res.data?.success) {
        throw new Error(res.data?.message || 'Failed to cancel job')
      }

      get().removeJob(jobId)

      set({ loading: false })
      return res.data
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Failed to cancel job'
      set({ error: errorMsg, loading: false })
      console.error('Store Error:', errorMsg)
      throw error
    }
  },

  clearJob: () => set({ job: null, error: null }),
}))

export default useJobStore
