import { socket } from './socket.utils'

export const GEOLOCATION_ERROR_CODES = {
  PERMISSION_DENIED: 1,
  POSITION_UNAVAILABLE: 2,
  TIMEOUT: 3,
}

const createGeolocationError = ({ code, message, originalError }) => {
  const error = new Error(message)
  error.code = code
  error.originalError = originalError
  return error
}

const DEFAULT_GEO_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 8000,
  maximumAge: 0,
}

const getSinglePosition = options => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(
        createGeolocationError({
          code: GEOLOCATION_ERROR_CODES.POSITION_UNAVAILABLE,
          message: 'Geolocation is not supported by your browser.',
        })
      )
    }

    const safeTimeout = Math.max(Number(options?.timeout) || DEFAULT_GEO_OPTIONS.timeout, 1000)
    const manualTimeout = window.setTimeout(() => {
      reject(
        createGeolocationError({
          code: GEOLOCATION_ERROR_CODES.TIMEOUT,
          message: 'Location request timed out before the browser returned a response.',
        })
      )
    }, safeTimeout + 2000)

    navigator.geolocation.getCurrentPosition(
      position => {
        window.clearTimeout(manualTimeout)
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      },
      error => {
        window.clearTimeout(manualTimeout)
        reject(
          createGeolocationError({
            code: error?.code,
            message: `Failed to get location. Error: ${error?.message || 'Unknown geolocation error.'}`,
            originalError: error,
          })
        )
      },
      options
    )
  })
}

export const getBrowserLocation = async (options = {}) => {
  const mergedOptions = { ...DEFAULT_GEO_OPTIONS, ...options }

  try {
    return await getSinglePosition(mergedOptions)
  } catch (error) {
    const timedOutOrUnavailable =
      error?.code === GEOLOCATION_ERROR_CODES.TIMEOUT ||
      error?.code === GEOLOCATION_ERROR_CODES.POSITION_UNAVAILABLE

    if (!mergedOptions.enableHighAccuracy || !timedOutOrUnavailable) {
      throw error
    }

    const fallbackOptions = {
      ...mergedOptions,
      enableHighAccuracy: false,
      timeout: Math.max(mergedOptions.timeout, 15000),
      maximumAge: Math.max(mergedOptions.maximumAge ?? 0, 30000),
    }

    console.info('[geolocation] Retrying with reduced accuracy options.', {
      initialOptions: mergedOptions,
      fallbackOptions,
      errorCode: error?.code,
      errorMessage: error?.message,
    })

    return getSinglePosition(fallbackOptions)
  }
}

// 1. check if supported

export const watchLocation = () => {
  if (!('geolocation' in navigator)) {
    throw new Error('Geolocation is not supported by your browser.')
  }
  const watchId = navigator.geolocation.watchPosition(
    position => {
      if (socket.connected) {
        socket.emit('update-location', {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        })
      }
    },
    error => console.log(`Failed to get location. Error: ${error.message}`),
    { enableHighAccuracy: true, timeout: 8000, distanceFilter: 500 }
  )

  return watchId
}
