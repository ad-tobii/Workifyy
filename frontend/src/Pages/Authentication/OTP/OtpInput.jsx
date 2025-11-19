import { useRef, useState, useEffect } from 'react'
import useUserStore from '../../../store/userStore.store'
import { useNavigate } from 'react-router-dom'
export default function OTPInput({ length = 6 }) {
  const [otp, setOtp] = useState(new Array(length).fill(''))
  const inputRefs = useRef([])

  const verifyAccount = useUserStore(state => state.verifyAccount)
  const loading = useUserStore(state => state.loading)
  const error = useUserStore(state => state.error)
  const successMessage = useUserStore(state => state.successMessage)
  const user = useUserStore(state => state.user)

  const navigate = useNavigate()

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const newOtp = [...otp]
      newOtp[index] = ''
      setOtp(newOtp)
      if (index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleVerify = async () => {
    if (otp.every(d => d)) {
      const result = await verifyAccount({ otp: otp.join('') })
      if (result.success) {
        navigate(user.role === 'professional' ? '/Onboarding' : '/dashboard/clientdashboard')
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="rounded-lg p-8">
        <h1 className="mb-8 text-center text-2xl font-bold text-white">Enter Verification Code</h1>

        <div className="mb-8 flex justify-center gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={e => handleChange(e.target.value, index)}
              onKeyDown={e => handleKeyDown(e, index)}
              className="h-16 w-14 rounded-lg border-2 border-lime-500 bg-black text-center text-2xl font-bold text-lime-500 transition-all duration-200 hover:border-lime-400 focus:border-lime-300 focus:shadow-lg focus:shadow-lime-500/50 focus:outline-none"
              placeholder="•"
              disabled={loading.verifyAccount}
            />
          ))}
        </div>

        {error && (
          <div className="mb-4 rounded border border-red-500 bg-red-900/30 p-3 text-center text-sm text-red-400">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 rounded border border-lime-500 bg-green-900/30 p-3 text-center text-sm text-lime-400">
            {successMessage}
          </div>
        )}

        <div className="text-center">
          <p className="mb-4 text-sm text-gray-400">
            Code: <span className="font-mono text-lime-500">{otp.join('') || 'waiting...'}</span>
          </p>
          <button
            onClick={handleVerify}
            disabled={!otp.every(d => d) || loading.verifyAccount}
            className="rounded-lg bg-lime-500 px-6 py-2 font-semibold text-black transition-all duration-200 hover:bg-lime-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-lime-500"
          >
            {loading.verifyAccount ? 'Verifying...' : 'Verify'}
          </button>
        </div>
      </div>
    </div>
  )
}
