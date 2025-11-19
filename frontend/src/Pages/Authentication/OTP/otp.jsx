import { useState } from 'react'
import OTPInput from './OtpInput.jsx'
import useUserStore from '../../../store/userStore.store.js'

export default function Otp() {
  const [showOTP, setShowOTP] = useState(false)

  const requestVerificationEmail = useUserStore(state => state.requestVerificationEmail)
  const loading = useUserStore(state => state.loading)
  const error = useUserStore(state => state.error)
  const successMessage = useUserStore(state => state.successMessage)

  const handleRequestCode = async () => {
    const result = await requestVerificationEmail()
    console.log(result)
    if (result.success) {
      setShowOTP(true)
    }
  }

  if (showOTP) {
    return <OTPInput length={6} />
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-md rounded-lg p-8">
        <h1 className="mb-6 text-center text-3xl font-bold text-white">Verification</h1>

        <div className="space-y-4">
          {error && (
            <div className="rounded border border-red-500 bg-red-900/30 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {successMessage && showOTP === false && (
            <div className="rounded border border-lime-500 bg-green-900/30 p-3 text-sm text-lime-400">
              {successMessage}
            </div>
          )}

          <button
            onClick={handleRequestCode}
            disabled={loading.requestVerificationEmail}
            className="w-full rounded-lg bg-lime-500 px-6 py-3 font-semibold text-black transition-all duration-200 hover:bg-lime-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-lime-500"
          >
            {loading.requestVerificationEmail ? 'Sending...' : 'Request Verification Code'}
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-500">
          A verification code will be generated and sent to your browser
        </p>
      </div>
    </div>
  )
}
