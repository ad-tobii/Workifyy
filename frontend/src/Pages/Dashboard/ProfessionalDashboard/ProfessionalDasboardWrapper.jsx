import { useEffect, useMemo, useState } from 'react'
import { Outlet } from 'react-router-dom'
import useSocketStore from '../../../store/useSocketStore'
import { getBrowserLocation, watchLocation } from '../../../utils/geoLocation.utils'

const OVERLAY_MESSAGES = {
  initial: 'Getting your location… Please wait',
  prompt: 'Location access needed – please allow',
  denied: 'Location permission denied. Please enable it in browser settings to continue.',
  failed: 'Unable to detect location. Please turn on GPS/location services.',
}

// This is a wrapper component for the professional dashboard.
// step 1 set up the socket connection
// step 2 watch the user's location
const ProfessionalDasboardWrapper = () => {
  const isConnected = useSocketStore(state => state.isConnected)
  const [isLocating, setIsLocating] = useState(true)
  const [hasCoordinates, setHasCoordinates] = useState(false)
  const [messageKey, setMessageKey] = useState('initial')

  useEffect(() => {
    const initializeSocket = useSocketStore.getState().initializeSocket
    const cleanup = useSocketStore.getState().cleanup

    let watchId = null
    let isMounted = true

    const startProfessionalSession = async () => {
      if (!('geolocation' in navigator)) {
        setMessageKey('failed')
        setIsLocating(false)
        return
      }

      setMessageKey('initial')

      try {
        const permissionStatus = await navigator.permissions?.query({ name: 'geolocation' })

        if (permissionStatus?.state === 'denied') {
          setMessageKey('denied')
          setIsLocating(false)
          return
        }

        if (permissionStatus?.state === 'prompt') {
          setMessageKey('prompt')
        }
      } catch {
        // Safari can throw for navigator.permissions. We'll continue with geolocation request.
      }

      try {
        const location = await getBrowserLocation()
        if (!isMounted) {
          return
        }

        setHasCoordinates(true)
        await initializeSocket(location)
        watchId = watchLocation()
      } catch (error) {
        if (!isMounted) {
          return
        }

        const deniedPermission =
          error?.code === 1 ||
          `${error?.message || ''}`.toLowerCase().includes('denied') ||
          `${error?.message || ''}`.toLowerCase().includes('permission')

        setMessageKey(deniedPermission ? 'denied' : 'failed')
        setIsLocating(false)
      }
    }

    startProfessionalSession()

    return () => {
      isMounted = false
      cleanup()
      if (watchId !== null) navigator.geolocation.clearWatch(watchId)
    }
  }, [])

  useEffect(() => {
    if (isConnected && hasCoordinates) {
      setIsLocating(false)
    }
  }, [hasCoordinates, isConnected])

  const locationReady = isConnected && hasCoordinates
  const isBlocked = !locationReady && !isLocating
  const loaderMessage = useMemo(
    () => OVERLAY_MESSAGES[messageKey] || OVERLAY_MESSAGES.initial,
    [messageKey]
  )

  if (!locationReady) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-[#060b22] px-6 text-center text-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/25 border-t-white" />
        <p className="max-w-md text-base font-medium">{loaderMessage}</p>
        {isBlocked && messageKey === 'denied' ? (
          <a
            href="https://support.google.com/chrome/answer/142065"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-blue-300 underline"
          >
            How to enable location access
          </a>
        ) : null}
      </div>
    )
  }

  return <Outlet />
}

export default ProfessionalDasboardWrapper
