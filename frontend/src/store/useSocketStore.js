import { create } from 'zustand'
import { socket } from '../utils/socket.utils'
import useJobStore from './useJobStore'
import { getBrowserLocation } from '../utils/geoLocation.utils'

const useSocketStore = create((set, get) => ({
  isConnected: false,
  hasInitialized: false,

  initializeSocket: async () => {
    if (get().hasInitialized) {
      return
    }
    const { longitude, latitude } = await getBrowserLocation()
    socket.on('connect', () => {
      console.log("yh i'm tapped in")
      socket.emit('update-location', { longitude, latitude })
      set({ isConnected: true })
    })
    socket.on('disconnect', () => {
      console.log("i'm no longer tapped in")
      set({ isConnected: false })
    })
    socket.on('newJob', newJob => {
      console.log('yh  i got a new job')
      useJobStore.getState().addJob(newJob)
    })

    set({ hasInitialized: true })
    socket.connect()
  },

  cleanup: () => {
    socket.off('connect')
    socket.off('disconnect')
    socket.off('newJob')
    socket.disconnect()
    set({ isConnected: false, hasInitialized: false })
  },
}))

export default useSocketStore
