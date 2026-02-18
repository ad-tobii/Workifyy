import useSocketStore from '../../../store/useSocketStore'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

// This is a wrapper component for the client dashboard.
// Sets up socket connection for real-time bid notifications
const ClientDashboardWrapper = () => {
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
