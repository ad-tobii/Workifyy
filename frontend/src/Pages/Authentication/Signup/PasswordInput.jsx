'use client'

import React, { useState, useEffect, forwardRef } from 'react'

const EyeIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
)

const EyeOffIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
)

const CheckIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
)

const PasswordInput = forwardRef(({ strength, error, onChange, ...registerProps }, ref) => {
  const [showPassword, setShowPassword] = useState(false)
  const [value, setValue] = useState('')
  const [requirements, setRequirements] = useState({
    minLength: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecial: false,
  })

  useEffect(() => {
    if (!value) {
      setRequirements({
        minLength: false,
        hasUppercase: false,
        hasNumber: false,
        hasSpecial: false,
      })
      return
    }

    setRequirements({
      minLength: value.length >= 8,
      hasUppercase: /[A-Z]/.test(value),
      hasNumber: /[0-9]/.test(value),
      hasSpecial: /[^A-Za-z0-9]/.test(value),
    })
  }, [value])

  const requirementsList = [
    { key: 'minLength', label: 'At least 8 characters' },
    { key: 'hasUppercase', label: 'At least one uppercase letter' },
    { key: 'hasNumber', label: 'At least one number' },
    { key: 'hasSpecial', label: 'At least one special character' },
  ]

  const handleChange = e => {
    setValue(e.target.value)
    if (onChange) {
      onChange(e)
    }
  }

  return (
    <div className="w-full">
      <label htmlFor="password" className="mb-1 block text-xs font-medium text-gray-300 sm:text-sm">
        Password
      </label>

      {/* Password Input Field */}
      <div className="relative mb-2">
        <input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          id="password"
          placeholder="Create a strong password"
          className={`w-full rounded-lg border-2 bg-zinc-900 px-3 py-2 pr-10 text-sm text-white placeholder-gray-500 transition-all duration-300 focus:outline-none ${
            error
              ? 'border-red-500 focus:border-red-600'
              : strength === 'strong' && value
                ? 'border-[#32cd32] focus:border-[#32cd32]'
                : 'border-zinc-700 focus:border-[#32cd32]'
          }`}
          onChange={handleChange}
          {...registerProps}
        />

        {/* Toggle Password Visibility Button */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200 hover:text-[#32cd32]"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
        </button>
      </div>

      {/* Password Requirements */}
      {value && (
        <div className="animate-in fade-in mt-2 space-y-1 rounded-lg bg-zinc-900 p-2.5 duration-300">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Requirements
          </p>

          {requirementsList.map(({ key, label }) => (
            <div
              key={key}
              className={`flex items-center gap-2 transition-all duration-300 ease-out ${
                requirements[key] ? 'opacity-60' : 'opacity-100'
              }`}
            >
              <div
                className={`border-1.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                  requirements[key]
                    ? 'border-[#32cd32] bg-[#32cd32]'
                    : 'border-zinc-600 bg-transparent'
                }`}
              >
                {requirements[key] && <CheckIcon size={12} />}
              </div>

              <span
                className={`text-xs transition-all duration-300 ${
                  requirements[key] ? 'text-gray-400 line-through' : 'text-gray-300'
                }`}
              >
                {label}
              </span>
            </div>
          ))}

          {/* Strength Indicator */}
          <div className="mt-2 pt-1.5">
            <div className="flex items-center gap-2">
              <div className="h-1 flex-1 rounded-full bg-zinc-700">
                <div
                  className={`h-1 rounded-full transition-all duration-300 ${
                    strength === 'weak'
                      ? 'w-1/4 bg-red-500'
                      : strength === 'fair'
                        ? 'w-1/2 bg-yellow-500'
                        : strength === 'strong'
                          ? 'w-full bg-[#32cd32]'
                          : 'w-0 bg-transparent'
                  }`}
                />
              </div>
              <span className="text-xs font-semibold capitalize text-gray-400">
                {strength || 'Weak'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="animate-in fade-in mt-1 text-xs font-medium text-red-500 duration-200">
          {error}
        </p>
      )}
    </div>
  )
})

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput
