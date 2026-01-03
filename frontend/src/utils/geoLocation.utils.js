const getBrowserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'))
    }
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
      { enableHighAccuracy: true, timeout: 5000 }
    )
  })
}

export default getBrowserLocation
