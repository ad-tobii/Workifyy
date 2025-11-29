'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import OTPInput from './OtpInput.jsx'
import useUserStore from '../../../store/userStore.store.js'
import { Lock } from 'lucide-react'

export default function Otp() {
  const [showOTP, setShowOTP] = useState(false)

  const requestVerificationEmail = useUserStore(state => state.requestVerificationEmail)
  const loading = useUserStore(state => state.loading)
  const error = useUserStore(state => state.error)
  const successMessage = useUserStore(state => state.successMessage)
  const [email, setEmail] = useState(null)
  function maskEmail(email) {
    const [local, domain] = email.split('@')
    if (!local || !domain) return email // fallback if not valid

    // Keep first 2 and last character of local part, mask the rest
    const visibleStart = 2
    const visibleEnd = 1
    const maskedLocal =
      local.length <= visibleStart + visibleEnd
        ? '*'.repeat(local.length)
        : local.slice(0, visibleStart) +
          '*'.repeat(local.length - visibleStart - visibleEnd) +
          local.slice(-visibleEnd)

    return `${maskedLocal}@${domain}`
  }

  const handleRequestCode = async () => {
    const result = await requestVerificationEmail()
 

    if (result.success) {
      setEmail(maskEmail(result?.data?.email || 'No email!!'))
      setShowOTP(true)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  if (showOTP) return <OTPInput length={6} email={email} />

  return (
    <div className="min-h-screen w-full bg-[#0f0f10]">
      {/* Desktop: Split Screen */}
      <div className="hidden lg:flex lg:min-h-screen">
        {/* Left Glass Panel */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex w-1/2 items-center justify-center p-8"
        >
          <div className="relative h-full w-full overflow-hidden rounded-2xl px-8 py-8">
            {/* Glass background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 backdrop-blur-xl"></div>
            {/* Green glint overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#32cd32]/10 via-transparent to-[#32cd32]/5"></div>
            {/* Border glow */}
            <div className="absolute inset-0 rounded-2xl border border-white/10 shadow-[0_0_80px_rgba(50,205,50,0.15)]"></div>
            {/* Corner glows */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#32cd32] blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-[#32cd32] blur-3xl" />
            {/* Content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="flex items-center justify-center"
              >
                <img
                  src="/assets/otp-svg.svg"
                  alt="Security verification"
                  className="w-full max-w-sm object-contain drop-shadow-2xl"
                />
              </motion.div>
              <div className="text-center">
                <h2 className="text-balance text-xl font-bold text-white">
                  Find Trusted Professionals
                </h2>
                <p className="mt-2 text-balance text-sm text-gray-400">
                  Discover skilled professionals near you at the best rates.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: OTP Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex w-1/2 items-center justify-center p-8"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-md"
          >
            <div className="mb-10 flex justify-center">
              <img src="/assets/workifyy-logo.png" className="w-56 " />
            </div>
            <div className="mb-8 flex items-center justify-center gap-3">
              <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-3">
                <Lock className="h-6 w-6 text-green-500" />
              </div>

              <h1 className="text-3xl font-bold text-white">Verify Account</h1>
            </div>

            <motion.div variants={itemVariants} className="space-y-4">
              {error && (
                <div className="rounded-lg border border-red-500/50 bg-red-950/30 p-4 text-sm text-red-400">
                  {error}
                </div>
              )}

              {successMessage && !showOTP && (
                <div className="rounded-lg border border-green-500/50 bg-green-950/30 p-4 text-sm text-green-400">
                  {successMessage}
                </div>
              )}

              <button
                onClick={handleRequestCode}
                disabled={loading.requestVerificationEmail}
                className="w-full rounded-lg bg-green-500 px-6 py-3 font-semibold text-black transition-all duration-300 hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-green-500 disabled:hover:shadow-none"
              >
                {loading.requestVerificationEmail ? (
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Sending...
                  </motion.span>
                ) : (
                  'Request Verification Code'
                )}
              </button>
            </motion.div>

            <p className="mt-6 text-center text-sm text-gray-500">
              A verification code will be generated and sent to you
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile: Stacked Layout */}
      <div className="flex min-h-screen flex-col items-center justify-center p-4 lg:hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-6"
        >
          {/* Mobile Glass Panel */}
          <div className="flex justify-center">
            <img src="/assets/otp-svg.svg" alt="Security verification" className=" w-72 " />
          </div>

          <div className="mb-10 flex justify-center">
            <img src="/assets/workifyy-logo.png" className="w-72 " />
          </div>

          {/* Mobile Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <div className="mb-8 flex  items-center justify-center gap-2">
              <div className="rounded-lg border border-[#32cd32] bg-green-500/10 p-2">
                <Lock className="h-3 w-3 text-[#32cd32]" />
              </div>
              <h1 className="text-xl font-bold text-white">Verify Account</h1>
            </div>

            {error && (
              <motion.div
                variants={itemVariants}
                className="rounded-lg border border-red-500/50 bg-red-950/30 p-3 text-sm text-red-400"
              >
                {error}
              </motion.div>
            )}

            {successMessage && !showOTP && (
              <motion.div
                variants={itemVariants}
                className="rounded-lg border border-green-500/50 bg-green-950/30 p-3 text-sm text-green-400"
              >
                {successMessage}
              </motion.div>
            )}

            <motion.button
              variants={itemVariants}
              onClick={handleRequestCode}
              disabled={loading.requestVerificationEmail}
              className="w-full rounded-lg bg-green-500 px-6 py-3 font-semibold text-black transition-all duration-300 hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-green-500"
            >
              {loading.requestVerificationEmail ? 'Sending...' : 'Request Verification Code'}
            </motion.button>

            <p className="text-center text-xs text-gray-500">
              A verification code will be generated and sent to your browser
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
