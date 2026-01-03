import React, { useState } from 'react'
import { MapPin } from 'lucide-react'
import getBrowserLocation from '../../../../utils/geoLocation.utils'

const Step4 = ({ updateFormData }) => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleGetLocation = async () => {
    setError(null)
    setLoading(true)

    try {
      const location = await getBrowserLocation()
      updateFormData('latitude', location?.latitude)
      updateFormData('longitude', location?.longitude)
      setLoading(false)
    } catch (error) {
      console.error('Error getting location:', error)
      setError('Unable to retrieve location. Please check your permissions.')
      updateFormData('latitude', null)
      updateFormData('longitude', null)
      setLoading(false)
    }
  }
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
        disabled={loading || (!!latitude && !!longitude)}
        className={`mb-4 rounded-lg px-6 py-3 text-lg font-semibold text-white transition ${
          latitude && longitude
            ? 'cursor-default bg-green-600'
            : loading
              ? 'cursor-wait bg-zinc-600'
              : 'bg-[#32cd32] hover:bg-green-500'
        }`}
      >
        {loading
          ? 'Getting Location...'
          : latitude && longitude
            ? 'Location Captured ✓'
            : 'Share My Location'}
      </button>

      {latitude && longitude && (
        <p className="text-center text-sm text-zinc-400 lg:text-left">
          Lat: {latitude.toFixed(4)}, Lng: {longitude.toFixed(4)}
        </p>
      )}

      {error && <p className="text-center text-sm text-red-500 lg:text-left">{error}</p>}
    </div>
  )
}

export default Step4
