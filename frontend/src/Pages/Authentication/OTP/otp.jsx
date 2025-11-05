import React, { useState, useRef } from 'react'

const OtpForm = () => {
  const [otp, setOtp] = useState(['', '', '', '', ''])
  const inputRefs = useRef(Array.from({ length: 5 }, () => React.createRef()))

  const handleChange = (e, index) => {
    const value = e.target.value
    if (!/^\d*$/.test(value)) return

    setOtp(prevOtp => {
      const newOtp = [...prevOtp]
      newOtp[index] = value
      return newOtp
    })

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.current?.focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.current?.focus()
    }
  }

  const handleVerifyOtp = () => {
    const otpString = otp.join('')
    if (otpString.length !== 5) {
      alert('Please enter the complete OTP.')
      return
    }
    console.log('OTP entered:', otpString)
    alert(`OTP submitted: ${otpString}`)
  }

  return (
    <div className="mt-12 flex flex-col items-center">
      <h1 className="text-2xl font-semibold">OTP Verification</h1>
      <p className="mt-4">Enter the OTP sent to your email</p>

      <div className="mt-6 flex space-x-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={inputRefs.current[index]}
            className="h-14 w-12 rounded-lg border border-green-500 text-center text-2xl outline-none"
            type="text"
            maxLength={1}
            value={digit}
            onChange={e => handleChange(e, index)}
            onKeyDown={e => handleKeyDown(e, index)}
            aria-label={`OTP digit ${index + 1}`}
          />
        ))}
      </div>

      <button
        className="mt-6 rounded bg-green-500 px-6 py-2 font-bold text-white"
        onClick={handleVerifyOtp}
        disabled={otp.includes('')}
      >
        Verify
      </button>
    </div>
  )
}

export default OtpForm
