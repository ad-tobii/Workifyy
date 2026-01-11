import { create } from 'zustand'
import { socket } from '../utils/socket.utils'
import useJobStore from './jobStore.store'
import { getBrowserLocation } from '../utils/geoLocation.utils'

const useSocketStore = create((set, get) => ({
  isConnected: false,

  initializeSocket: async () => {
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
      useJobStore.setState(state => ({
        jobs: [newJob, ...state.jobs],
      }))
    })

    socket.connect()
  },

  cleanup: () => {
    socket.off('connect')
    socket.off('disconnect')
    socket.off('newJob')
    socket.disconnect()
  },
}))

export default useSocketStore
