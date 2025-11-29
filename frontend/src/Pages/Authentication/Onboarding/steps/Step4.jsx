import React, { useState, useCallback } from 'react'
import { MapPin } from 'lucide-react'

const Step4 = ({ formData, updateFormData }) => {
  const location = formData.location
  const [error, setError] = useState(null)
  
  const handleGetLocation = useCallback(() => {
    setError(null)
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.')
      return
    }
    navigator.geolocation.getCurrentPosition(
      position =>
        updateFormData('location', {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }),
      () => {
        setError('Unable to retrieve location.')
        updateFormData('location', null)
      }
    )
  }, [updateFormData])

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mt-10 flex flex-col items-center duration-500 lg:mt-0 lg:items-start">
      <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-zinc-800 lg:h-24 lg:w-24">
        <MapPin className="h-16 w-16 text-zinc-500 lg:h-10 lg:w-10" />
      </div>
      <h3 className="mb-2 text-center text-3xl text-white lg:text-left">Share Your Location</h3>
      <p className="mx-8 mb-6 text-center text-lg text-zinc-400 lg:mx-0 lg:text-left">
        We need your location to connect you with clients nearby.
      </p>
      <button
        onClick={handleGetLocation}
        disabled={!!location}
        className={`mb-4 rounded-lg px-6 py-3 text-lg font-semibold text-white transition ${location ? 'cursor-default bg-green-600' : 'bg-[#32cd32] hover:bg-green-500'}`}
      >
        {location ? 'Location Captured' : 'Share My Location'}
      </button>
      {location && (
        <p className="text-center text-zinc-400 lg:text-left">
          Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
        </p>
      )}
      {error && <p className="text-center text-red-500 lg:text-left">{error}</p>}
    </div>
  )
}

export default Step4