import { useMemo } from 'react'

export const LOCATION_OVERLAY_MESSAGES = {
  initial: 'Getting your location… Please wait',
  prompt: 'Location access needed – please allow',
  denied: 'Location permission denied. Please enable it in browser settings to continue.',
  failed: 'Unable to detect location. Please turn on GPS/location services.',
}

const LocationAccessOverlay = ({ messageKey, isBlocked }) => {
  const loaderMessage = useMemo(
    () => LOCATION_OVERLAY_MESSAGES[messageKey] || LOCATION_OVERLAY_MESSAGES.initial,
    [messageKey]
  )

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-[rgb(15,15,16)] px-6 text-center text-white">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#32cd32] border-t-transparent" />
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

export default LocationAccessOverlay
