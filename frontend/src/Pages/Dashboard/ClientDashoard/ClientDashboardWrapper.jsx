import useSocketStore from '../../../store/useSocketStore'
import useUserStore from '../../../store/useUserStore'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const ClientDashboardWrapper = () => {
  const user = useUserStore(state => state.user)

  // Let ProtectRoute handle the redirect — don't init socket for unauthenticated users
  if (!user || user.role !== 'client') return <Outlet />

  useEffect(() => {
    const initializeClientSocket = useSocketStore.getState().initializeClientSocket
    const cleanup = useSocketStore.getState().cleanup
    const isConnected = useSocketStore.getState().isConnected

    if (!isConnected) {
      initializeClientSocket()
    }

    return () => {
      cleanup()
    }
  }, [])

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default ClientDashboardWrapper
