import { create } from 'zustand'
import api from '../api/axios.api'

const useUserStore = create((set, get) => ({
  user: null,
  sessionChecked: false,
  loading: {
    login: false,
    signup: false,
    logout: false,
    requestVerificationEmail: false,
    verifyAccount: false,
    onboardUser: false,
  },
  error: null,
  successMessage: null,

  setLoading: (key, value) =>
    set(state => ({
      loading: { ...state.loading, [key]: value },
    })),

  // Core function to handle authentication-related API calls
  handleAuthCall: async (action, params) => {
    const { setLoading } = get()

    // action map for the API calls
    const actionMap = {
      login: '/login',
      signup: '/signup',
      logout: '/logout',
      requestVerificationEmail: '/send-verification-mail',
      verifyAccount: '/verify-email',
      onboardUser: '/create-profile',
    }

    // set the relevant loading state to true
    setLoading(action, true)
    set({ error: null, successMessage: null })

    try {
      const method = 'post'

      // Special handling for onboardUser with file upload
      if (action === 'onboardUser') {
        const formData = new FormData()

        // Append all fields to FormData
        Object.keys(params).forEach(key => {
          if (params[key] !== null && params[key] !== undefined) {
            formData.append(key, params[key])
          }
        })

        console.log('Sending FormData for onboarding:')
        for (let [key, value] of formData.entries()) {
          console.log(key, value instanceof File ? `File: ${value.name}` : value)
        }

        const res = await api.post(`/auth${actionMap[action]}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        if (!res.data.success) {
          set({ error: res.data.message })
          return { success: false, error: res.data.message }
        }
        // set the user and success message
        const newUser = res.data.data?.user
        if (newUser) {
          set({ user: newUser })
        }
        set({
          successMessage: 'Profile created successfully',
        })

        return { success: true, user: res.data.data?.user || get().user, data: res.data.data }
      }

      // Regular handling for other actions
      // make the API call
      const res = await api[method](
        `/auth${actionMap[action]}`,
        method === 'post' ? params || {} : undefined
      )

      if (!res.data.success) {
        // set the error message
        set({ error: res.data.message })
        return { success: false, error: res.data.message }
      }

      if (action === 'logout') {
        set({ user: null, successMessage: 'Logged out successfully' })
        return { success: true, user: null, data: null }
      }

      // set the user and success message
      const newUser = res.data.data?.user
      if (newUser) {
        set({ user: newUser })
      }
      set({
        successMessage: 'Request successful',
      })
      return { success: true, user: res.data.data?.user || get().user, data: res.data.data }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Something went wrong.'
      set({ error: errorMsg })
      return { success: false, error: errorMsg }
    } finally {
      setLoading(action, false)
    }
  },

  initSession: async () => {
    set({ sessionChecked: false })

    try {
      const res = await api.get('/auth/get-me')

      if (res.data?.success && res.data.data?.user) {
        set({ user: res.data.data.user })
      } else {
        set({ user: null })
      }
    } catch {
      set({ user: null })
    } finally {
      set({ sessionChecked: true })
    }
  },

  login: credentials => get().handleAuthCall('login', credentials),
  signup: data => get().handleAuthCall('signup', data),
  logout: () => get().handleAuthCall('logout'),
  // loadUser: () => get().handleAuthCall('loadUser'),
  verifyAccount: otp => get().handleAuthCall('verifyAccount', otp),
  requestVerificationEmail: () => get().handleAuthCall('requestVerificationEmail'),
  onboardUser: userData => get().handleAuthCall('onboardUser', userData),
}))

export default useUserStore
