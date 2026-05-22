import { create } from 'zustand'
import api from '../api/axios.api'

const useProfileStore = create((set, get) => ({
  profileData: null,
  loading: false,
  updatingTagline: false,
  error: null,

  fetchProfile: async () => {
    set({ loading: true, error: null })

    try {
      const res = await api.get('/profile')
      set({ profileData: res.data.data, loading: false, error: null })
      return { success: true, data: res.data.data }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to load profile'
      set({ error: message, loading: false })
      return { success: false, error: message }
    }
  },

  updateTagline: async tagline => {
    set({ updatingTagline: true, error: null })

    try {
      const res = await api.patch('/profile/tagline', { tagline })
      const nextTagline = res.data.data.tagline
      const current = get().profileData

      set({
        profileData: current
          ? {
              ...current,
              profile: {
                ...current.profile,
                tagline: nextTagline,
              },
            }
          : current,
        updatingTagline: false,
        error: null,
      })

      return { success: true, tagline: nextTagline }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update tagline'
      set({ error: message, updatingTagline: false })
      return { success: false, error: message }
    }
  },

  resetProfile: () => set({ profileData: null, loading: false, updatingTagline: false, error: null }),
}))

export default useProfileStore
