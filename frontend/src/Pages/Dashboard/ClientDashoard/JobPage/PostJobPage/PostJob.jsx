import { useEffect, useMemo, useState } from 'react'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'
import Step6 from './Step6'
import Step7 from './Step7'
import useJobStore from '../../../../../store/useJobStore'
import { getBrowserLocation } from '../../../../../utils/geoLocation.utils'

const LOCATION_OVERLAY_MESSAGES = {
  initial: 'Getting your location… Please wait',
  prompt: 'Location access needed – please allow',
  denied: 'Location permission denied. Please enable it in your browser settings to continue.',
  failed: 'Unable to detect location. Please turn on GPS/location services.',
}

export default function PostJobPage() {
  const loading = useJobStore(state => state.loading)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    budget: '',
    description: '',
    address: '',
    images: [],
    previews: [],
    scheduledAt: '',
  })

  const [locationReady, setLocationReady] = useState(false)
  const [isLocating, setIsLocating] = useState(true)
  const [messageKey, setMessageKey] = useState('initial')

  useEffect(() => {
    let isMounted = true

    const initializeLocation = async () => {
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
        // Safari may throw for navigator.permissions
      }

      try {
        await getBrowserLocation()

        if (!isMounted) return

        setLocationReady(true)
        setIsLocating(false)
      } catch (error) {
        if (!isMounted) return

        const deniedPermission =
          `${error?.message || ''}`.toLowerCase().includes('denied') ||
          `${error?.message || ''}`.toLowerCase().includes('permission')

        setMessageKey(deniedPermission ? 'denied' : 'failed')
        setIsLocating(false)
      }
    }

    initializeLocation()

    return () => {
      isMounted = false
    }
  }, [])

  const locationMessage = useMemo(
    () => LOCATION_OVERLAY_MESSAGES[messageKey] || LOCATION_OVERLAY_MESSAGES.initial,
    [messageKey]
  )

  const blockedState = !locationReady && !isLocating

  return (
    <div className="relative w-[90%]">
      {!locationReady && (
        <div className="fixed inset-0 z-[110] flex flex-col items-center justify-center gap-4 bg-[rgb(15,15,16)] px-6 text-center text-white">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#32cd32] border-t-transparent" />
          <p className="max-w-md text-base font-medium">{locationMessage}</p>
          {blockedState ? (
            <p className="max-w-md text-sm text-zinc-300">
              Refresh after enabling location access to continue posting your job.
            </p>
          ) : null}
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/60 backdrop-blur-md transition-all">
          <div className="flex w-[85%] max-w-sm flex-col items-center rounded-3xl bg-[#0f0f10] p-8 shadow-2xl">
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-gray-100 border-t-[#32cd32]"></div>

            <h2 className="mt-6 text-center text-xl font-bold text-[#32cd32]">Publishing Your Job</h2>
            <p className="mt-2 text-center text-sm text-gray-500">
              We&apos;re uploading your images and publishing your job...
            </p>
          </div>
        </div>
      )}

      {locationReady && step === 1 && (
        <Step1 setStep={setStep} setFormData={setFormData} formData={formData} />
      )}
      {locationReady && step === 2 && (
        <Step2 setStep={setStep} setFormData={setFormData} formData={formData} />
      )}
      {locationReady && step === 3 && (
        <Step3 setStep={setStep} setFormData={setFormData} formData={formData} />
      )}
      {locationReady && step === 4 && (
        <Step4 setStep={setStep} setFormData={setFormData} formData={formData} />
      )}
      {locationReady && step === 5 && (
        <Step5 setStep={setStep} setFormData={setFormData} formData={formData} />
      )}
      {locationReady && step === 6 && (
        <Step6 setStep={setStep} setFormData={setFormData} formData={formData} />
      )}
      {locationReady && step === 7 && <Step7 setFormData={setFormData} formData={formData} />}
    </div>
  )
}
