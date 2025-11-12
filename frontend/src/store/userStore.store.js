import { create } from 'zustand'
import api from '../api/axios.api'

const useUserStore = create(set => ({
  user: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null })
    try {
      const res = await api.post('/auth/login', { email, password })

      if (!res.data.success) {
        set({ error: res.data.message, loading: false })
        return
      }
      set({ user: res.data.data.user, loading: false })
    } catch (error) {
      set({
        loading: false,
        error: error?.response?.data?.message || error.message || 'Something went wrong.',
      })
    }
  },

  signup: async (firstname, lastname, password, role, email) => {
    try {
      set({ loading: true, error: null })

      const res = await api.post('/auth/signup', { firstname, lastname, pasword, role, email })

      if (!res.data.success) {
        set({ loading: false, error: res.data.message })
        return
      }

      set({ user: res.data.data.user, loading: false })
    } catch (error) {
      set({
        loading: false,
        error: error?.response?.data?.message || error.message || 'Something went wrong.',
      })
    }
  },

  logout: async () => {
    try {
      set({ loading: true, error: null })
      const res = await api.post('/auth/logout')

      if (!res.data.success) {
        set({ loading: false, error: res.data.message })
        return
      }
      set({ user: null, loading: false })
    } catch (error) {
      set({
        error: error.response.data.message || error.message || 'Something went wrong',
        loading: false,
      })
    }
  },
  requestVerificationEmail: async () => {
    try {
      set({ loading: true, error: null })
      const res = await api.post('/auth/send-verification-email')

      if (!res.data.success) {
        set({ loading: false, error: res.data.message })
        return
      }

      set({ loading: false, successMessage: 'Verification email sent!' })

      setTimeout(() => set({ successMessage: null }), 5000)
    } catch (error) {
      set({
        error: error.response.data.message || error.message || 'Something went wrong',
        loading: false,
      })
    }
  },
  verifyAccount: async email => {
    try {
      set({ loading: true, error: null })
      const res = await api.post('/auth/verify-email', { email })

      if (!res.data.success) {
        set({ loading: false, error: res.data.message })
        return
      }

      set({ loading: false, successMessage: 'Account successfully verified!' })

      setTimeout(() => set({ successMessage: null }), 5000)
    } catch (error) {
      set({
        error: error.response.data.message || error.message || 'Something went wrong',
        loading: false,
      })
    }
  },
  loadUser: async () => {
    try {
      set({ loading: true, error: null })
      const res = await api.post('/auth/', { email })

      if (!res.data.success) {
        set({ loading: false, error: res.data.message })
        return
      }

      set({ loading: false, successMessage: 'Account successfully verified!' })

      setTimeout(() => set({ successMessage: null }), 5000)
    } catch (error) {
      set({
        error: error.response.data.message || error.message || 'Something went wrong',
        loading: false,
      })
    }
  },
}))

export default useUserStore
