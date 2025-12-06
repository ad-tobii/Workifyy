'use client'

import { useState, useEffect } from 'react'

export default function Step3({ formData = { latitude: null, longitude: null }, setFormData }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Stop loading if location is already set
  useEffect(() => {
    if (formData?.latitude && formData?.longitude) {
      setLoading(false)
    }
  }, [formData?.latitude, formData?.longitude])

  const handleGetLocation = () => {
    setLoading(true)
    setError('')

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.')
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        setFormData({
          ...formData,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        setLoading(false)
      },
      err => {
        let errorMessage = 'Failed to get location.'
        if (err.code === err.PERMISSION_DENIED) {
          errorMessage = 'Location permission denied. Please enable it in your browser settings.'
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          errorMessage = 'Location information is unavailable.'
        } else if (err.code === err.TIMEOUT) {
          errorMessage = 'Location request timed out.'
        }
        setError(errorMessage)
        setLoading(false)
      }
    )
  }

  const hasLocation = formData?.latitude && formData?.longitude

  return (
    <div className="text-center">
      <h1 className="mb-2 text-4xl font-bold text-gray-300">Location</h1>
      <p className="mb-8 text-gray-500">Where do you work?</p>

      {hasLocation ? (
        <div className="mb-6 rounded-lg p-6 text-center" style={{ backgroundColor: '#1a1a1b' }}>
          <div className="mb-3 text-4xl">📍</div>
          <p className="mb-2 text-sm text-gray-400">Location Captured</p>
          <p className="font-mono text-sm text-white">Lat: {formData?.latitude?.toFixed(4)}</p>
          <p className="font-mono text-sm text-white">Long: {formData?.longitude?.toFixed(4)}</p>
          <button
            onClick={() => setFormData({ ...formData, latitude: null, longitude: null })}
            className="mt-4 rounded-lg px-4 py-2 text-sm font-medium transition-all"
            style={{ backgroundColor: '#32cd32', color: '#0f0f10' }}
          >
            Change Location
          </button>
        </div>
      ) : (
        <div className="mb-6 rounded-lg p-8 text-center" style={{ backgroundColor: '#1a1a1b' }}>
          <div className="mb-4 text-5xl">🗺️</div>
          <p className="mb-4 text-gray-300">Enable location services to help us serve you better</p>
          {error && (
            <p
              className="mb-4 rounded-lg p-3 text-sm text-red-400"
              style={{ backgroundColor: '#2a1a1a' }}
            >
              {error}
            </p>
          )}
          <button
            onClick={handleGetLocation}
            disabled={loading}
            className="w-full rounded-lg px-4 py-3 font-medium transition-all"
            style={{ backgroundColor: '#32cd32', color: '#0f0f10' }}
          >
            {loading ? 'Getting location...' : 'Enable Location'}
          </button>
        </div>
      )}
    </div>
  )
}
