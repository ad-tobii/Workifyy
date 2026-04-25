import { create } from 'zustand'
import api from '../api/axios.api'

const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,

  fetchNotifications: async () => {
    set({ loading: true })
    try {
      const res = await api.get('/notification')
      if (res.data?.success) {
        const notifications = res.data.data || []
        const unreadCount = notifications.filter(n => !n.read).length
        set({ notifications, unreadCount, loading: false })
      } else {
        set({ loading: false })
      }
    } catch {
      set({ loading: false })
    }
  },

  addNotification: notification => {
    set(state => ({
      notifications: [notification, ...state.notifications],
      unreadCount: notification.read ? state.unreadCount : state.unreadCount + 1,
    }))
  },

  markAsRead: async id => {
    // Optimistic update — change UI immediately before the API responds
    set(state => {
      const target = state.notifications.find(n => n._id === id)
      if (!target || target.read) return state
      return {
        notifications: state.notifications.map(n => n._id === id ? { ...n, read: true } : n),
        unreadCount: Math.max(0, state.unreadCount - 1),
      }
    })
    try {
      await api.patch(`/notification/${id}/read`)
    } catch {
      // silently ignore — optimistic update already applied
    }
  },

  markAllAsRead: async () => {
    try {
      const res = await api.patch('/notification/mark-all-read')
      if (res.data?.success) {
        set(state => ({
          notifications: state.notifications.map(n => ({ ...n, read: true })),
          unreadCount: 0,
        }))
      }
    } catch {
      // silently fail
    }
  },

  deleteNotification: async id => {
    // Optimistic remove
    set(state => {
      const target = state.notifications.find(n => n._id === id)
      return {
        notifications: state.notifications.filter(n => n._id !== id),
        unreadCount: target && !target.read
          ? Math.max(0, state.unreadCount - 1)
          : state.unreadCount,
      }
    })
    try {
      await api.delete(`/notification/${id}`)
    } catch {
      // silently ignore — optimistic removal already applied
    }
  },
}))

export default useNotificationStore
