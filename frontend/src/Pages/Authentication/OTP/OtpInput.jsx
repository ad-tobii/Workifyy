'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import useUserStore from '../../../store/userStore.store'
import { useNavigate } from 'react-router-dom'
import { Clock, CheckCircle } from 'lucide-react'

export default function OTPInput({ length = 6 }) {
  const [otp, setOtp] = useState(new Array(length).fill(''))
  const [timeLeft, setTimeLeft] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef([])

  const verifyAccount = useUserStore(state => state.verifyAccount)
  const loading = useUserStore(state => state.loading)
  const error = useUserStore(state => state.error)
  const successMessage = useUserStore(state => state.successMessage)
  const user = useUserStore(state => state.user)

  const navigate = useNavigate()

  useEffect(() => {
    inputRefs.current[0]?.focus()

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setCanResend(true)
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

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

  const isFilled = otp.every(d => d)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <div className="mb-0 flex justify-center">
        <img src="/assets/workifyy-logo.png" className="mb-10 w-56 " />
      </div>
      <div className="flex items-center justify-center bg-black p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="mb-8 text-center">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-2 text-3xl font-bold text-white"
            >
              Enter Verification Code
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400"
            >
              Check your browser for the code sent to
            </motion.p>
          </div>

          {/* OTP Input Boxes */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-8 flex justify-center gap-3"
          >
            {otp.map((digit, index) => (
              <motion.div key={index} variants={itemVariants} whileHover={{ scale: 1.05 }}>
                <input
                  ref={el => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={e => handleChange(e.target.value, index)}
                  onKeyDown={e => handleKeyDown(e, index)}
                  className="h-14 w-12 rounded-lg border-2 border-green-500/40 bg-slate-900/50 text-center text-2xl font-bold text-green-500 backdrop-blur-sm transition-all duration-200 hover:border-green-500/60 focus:border-green-500 focus:bg-slate-900/80 focus:shadow-lg focus:shadow-green-500/50 focus:outline-none"
                  placeholder="•"
                  disabled={loading.verifyAccount}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Messages */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-6 space-y-3"
          >
            {error && (
              <div className="flex items-center justify-center gap-2 rounded-lg border border-red-500/50 bg-red-950/30 p-4 text-center text-sm text-red-400">
                <div className="h-4 w-4 rounded-full bg-red-500/30" />
                {error}
              </div>
            )}

            {successMessage && !isFilled && (
              <div className="flex items-center justify-center gap-2 rounded-lg border border-green-500/50 bg-green-950/30 p-4 text-center text-sm text-green-400">
                <CheckCircle className="h-4 w-4" />
                {successMessage}
              </div>
            )}
          </motion.div>

          {/* Countdown Timer and Verify Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <button
              onClick={handleVerify}
              disabled={!isFilled || loading.verifyAccount}
              className="w-full rounded-lg bg-green-500 px-6 py-3 font-semibold text-black transition-all duration-300 hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-green-500 disabled:hover:shadow-none"
            >
              {loading.verifyAccount ? (
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  Verifying...
                </motion.span>
              ) : (
                'Verify'
              )}
            </button>

            {/* Resend Code Section */}
            <div className="text-center">
              {!canResend ? (
                <motion.div
                  className="flex items-center justify-center gap-2 text-sm text-gray-400"
                  animate={{ opacity: [0.5, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Clock className="h-4 w-4 text-green-500" />
                  <span>Resend code in {formatTime(timeLeft)}</span>
                </motion.div>
              ) : (
                <button
                  onClick={() => {
                    // Call resend function here
                    setTimeLeft(30)
                    setCanResend(false)
                  }}
                  className="text-sm text-green-500 transition-colors duration-200 hover:text-green-400"
                >
                  Didn't receive code? <span className="font-semibold">Resend</span>
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
