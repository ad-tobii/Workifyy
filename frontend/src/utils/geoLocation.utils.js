import { socket } from './socket.utils'

export const getBrowserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error('Geolocation is not supported by your browser.'))
    }

    // Try high accuracy first
    navigator.geolocation.getCurrentPosition(
      position => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      },
      // If high accuracy fails, fall back to low accuracy
      () => {
        navigator.geolocation.getCurrentPosition(
          position => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            })
          },
          error => {
            reject(new Error(`Failed to get location. Error: ${error.message}`))
          },
          { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
        )
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    )
  })
}

// 1. check if supported

export const watchLocation = () => {
  console.log("yh i'm here alright")
  if (!('geolocation' in navigator)) {
    throw new Error('Geolocation is not supported by your browser.')
  }
  const watchId = navigator.geolocation.watchPosition(
    position => {
      if (socket.connected) {
        console.log("yh he's moved")
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
