import useSocketStore from '../../../store/useSocketStore'
import { useEffect } from 'react'
import { watchLocation } from '../../../utils/geoLocation.utils'
import { Outlet } from 'react-router-dom'

// This is a wrapper component for the professional dashboard.
// step 1 set up the socket connection
// step 2 watch the user's location
const ProfessionalDasboardWrapper = () => {
  useEffect(() => {
    const initializeSocket = useSocketStore.getState().initializeSocket
    const cleanup = useSocketStore.getState().cleanup
    const isConnected = useSocketStore.getState().isConnected

    let watchId = null
    if (!isConnected) {
      initializeSocket()
      watchId = watchLocation()
    }

    return () => {
      cleanup()
      if (watchId !== null) navigator.geolocation.clearWatch(watchId)
    }
  }, [])
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default ProfessionalDasboardWrapper
