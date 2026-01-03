import { io } from 'socket.io-client'

const URL = 'https://workifyy-cf1c.onrender.com'

export const socket = io(URL, {
  withCredentials: true,
  autoConnect: false,
})
