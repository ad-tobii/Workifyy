'use client'

import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import PasswordInput from './PasswordInput'

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
)

export default function Signup({ role = 'professional' }) {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm()

  const [isUsedMail, setIsUsedMail] = useState(false)
  const [strength, setStrength] = useState('')
  const password = watch('password')
  const email = watch('email')

  const checkEmailAvailability = useCallback(
    async emailValue => {
      try {
        const res = await fetch(`/api/auth/check-email?email=${emailValue}`)
        const data = await res.json()

        if (data.available) {
          setIsUsedMail(false)
          clearErrors('email')
        } else {
          setIsUsedMail(true)
          setError('email', { message: 'Email already in use' })
        }
      } catch (error) {
        console.error(error)
      }
    },
    [clearErrors, setError]
  )

  const debouncedCheckEmailAvailability = useMemo(() => {
    let timeoutId
    return emailValue => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => checkEmailAvailability(emailValue), 500)
    }
  }, [checkEmailAvailability])

  useEffect(() => {
    if (!email) return
    setIsUsedMail(false)
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)

    if (!isValid) {
      setError('email', { message: "Looks like this email isn't complete" })
      return
    } else {
      clearErrors('email')
    }

    debouncedCheckEmailAvailability(email)
  }, [email, clearErrors, setError, debouncedCheckEmailAvailability])

  useEffect(() => {
    if (!password) {
      setStrength('')
      clearErrors('password')
      return
    }

    let score = 0
    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++

    if (score <= 1) {
      setStrength('weak')
      setError('password', { message: 'Password too weak' })
    } else if (score === 2 || score === 3) {
      setStrength('medium')
      clearErrors('password')
    } else if (score === 4) {
      setStrength('strong')
      clearErrors('password')
    }
  }, [password, setError, clearErrors])

  const onSubmit = async formData => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role }),
      })

      const result = await response.json()
      if (result.success) {
        console.log('Signup successful')
      } else {
        setError('submit', { message: result.message || 'Something went wrong' })
      }
    } catch (err) {
      console.error(err)
      setError('submit', { message: 'Something went wrong, try again' })
    }
  }

  return (
    <main className="  h-screen overflow-hidden bg-black">
      <div className="flex h-full">
        {/* LEFT SIDE */}
        <div className="no-scrollbar flex-1 overflow-y-auto p-4 lg:p-8 lg:pr-6">
          {/* Logo */}
          <h1 className="mb-2 text-center font-logoFonts text-3xl tracking-wider text-[#32cd32] lg:text-4xl">
            Workifyy
          </h1>

          {/* Form container */}
          <div className="flex flex-1 flex-col justify-center gap-4">
            <div className="mb-4">
              <h2 className="mb-1 text-2xl font-bold text-white lg:text-3xl">
                Sign up to hire professionals
              </h2>
            </div>

            {/* Google button */}
            <button
              type="button"
              className="group flex w-full items-center justify-center gap-3 rounded-full border-2 border-zinc-700 bg-zinc-900/50 px-5 py-2.5 text-sm text-white transition-all hover:bg-zinc-800"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            {/* Divider */}
            <div className="my-2 flex items-center gap-3">
              <div className="h-px flex-1 bg-zinc-800" />
              <span className="text-xs text-gray-500">or</span>
              <div className="h-px flex-1 bg-zinc-800" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Names */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-sm text-gray-300">First name</label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full rounded-lg border-2 border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-white focus:border-[#32cd32]"
                    {...register('firstname', { required: 'First name is required' })}
                  />
                  {errors.firstname && (
                    <p className="text-xs text-red-500">{errors.firstname.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm text-gray-300">Last name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full rounded-lg border-2 border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-white focus:border-[#32cd32]"
                    {...register('lastname', { required: 'Last name is required' })}
                  />
                  {errors.lastname && (
                    <p className="text-xs text-red-500">{errors.lastname.message}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-1 block text-sm text-gray-300">Work email</label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  className={`w-full rounded-lg border-2 bg-zinc-900 px-3 py-2.5 text-sm text-white ${
                    isUsedMail || errors.email
                      ? 'border-red-500'
                      : 'border-zinc-700 focus:border-[#32cd32]'
                  }`}
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
              </div>

              <PasswordInput
                strength={strength}
                error={errors.password?.message}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 8, message: 'Minimum 8 characters' },
                })}
              />

              {/* Checkboxes */}
              <label className="flex cursor-pointer items-start gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 border-2 border-zinc-600 bg-zinc-900 accent-[#32cd32]"
                  {...register('newsAccepted')}
                />
                <span className="text-xs text-gray-300">Send me hiring tips.</span>
              </label>

              <label className="flex cursor-pointer items-start gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 border-2 border-zinc-600 bg-zinc-900 accent-[#32cd32]"
                  {...register('terms', { required: 'You must agree' })}
                />
                <span className="text-xs text-gray-300">
                  I agree to the <a className="text-[#32cd32] underline">Terms</a> and{' '}
                  <a className="text-[#32cd32] underline">Privacy Policy</a>.
                </span>
              </label>

              {errors.terms && <p className="text-xs text-red-500">{errors.terms.message}</p>}
              {errors.submit && <p className="text-xs text-red-500">{errors.submit.message}</p>}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting || isUsedMail || strength !== 'strong' || !watch('terms')}
                className="w-full rounded-lg bg-[#32cd32] py-2.5 text-base font-semibold text-black hover:bg-[#28a028] disabled:bg-gray-700"
              >
                {isSubmitting ? 'Creating...' : 'Create my account'}
              </button>
            </form>

            <p className="mt-2 text-center text-xs text-gray-400">
              Already have an account? <a className="text-[#32cd32] underline">Log in</a>
            </p>
          </div>

          {/* footer */}
          <div className="mt-2 text-center text-[10px] text-gray-600">
            <p>By creating an account you accept our</p>
            <p>
              <a className="hover:text-gray-400">Terms & Conditions</a> •
              <a className="hover:text-gray-400"> Privacy Policy</a>
            </p>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="relative hidden w-1/2 xl:block">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/assets/happy-user.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black via-black/40 to-black" />
        </div>
      </div>
    </main>
  )
}
