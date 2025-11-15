import { create } from 'zustand'
import api from '../api'

const useUserStore = create((set, get) => ({
  user: null, // The currently logged-in user

  loading: {
    login: false,
    signup: false,
    logout: false, // Loading state for different auth actions
    requestVerificationEmail: false,
    verifyAccount: false,
    loadUser: false,
  },

  error: null, // Error message from the last action

  successMessage: null, // Success message from the last action

  setLoading: (key, value) =>
    set(state => ({
      // Helper function to update the loading state for a specific action
      loading: { ...state.loading, [key]: value },
    })),

  // Core function to handle any authentication-related API call
  handleAuthCall: async (action, params) => {
    const { setLoading } = get() // Get the setLoading function from the store

    const actionMap = {
      login: '/login',
      signup: '/signup',
      logout: '/logout', // Map of actions to their corresponding API endpoints
      requestVerificationEmail: '/send-verification-mail',
      verifyAccount: '/verify-email',
      loadUser: '/get-me',
    }

    setLoading(action, true) // Set loading state for this action to true

    set({ error: null, successMessage: null }) // Reset error and successMessage before making the request

    try {
      const method = action === 'loadUser' ? 'get' : 'post' // Determine HTTP method: GET for loadUser, POST for everything else

      const res = await api[method](
        `/auth${actionMap[action]}`,
        method === 'post' ? params || {} : undefined
      )

      if (!res.data.success) {
        set({ error: res.data.message }) // If API response says failure, set error state
        return
      }

      set({ user: res.data.data?.user || null, successMessage: 'Request successful' }) // On success, store user data and a success message
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message || 'Something went wrong.',
      })
    } finally {
      setLoading(action, false) // Always reset loading state for this action
    }
  },

  login: credentials => get().handleAuthCall('login', credentials),
  signup: data => get().handleAuthCall('signup', data),
  logout: () => get().handleAuthCall('logout'),
  loadUser: () => get().handleAuthCall('loadUser'),
  verifyAccount: otp => get().handleAuthCall('verifyAccount', otp),
  requestVerificationEmail: email => get().handleAuthCall('requestVerificationEmail', email),
}))

export default useUserStore
