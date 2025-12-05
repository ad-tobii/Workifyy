'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import PasswordInput from './PasswordInput'
import api from '../../../api/axios.api'
import { FcGoogle } from 'react-icons/fc'
import useUserStore from '../../../store/userStore.store'
import toast from 'react-hot-toast'

export default function SignupForm({ role }) {
  const navigate = useNavigate()
  const signup = useUserStore(state => state.signup)

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
        const res = await api.get(`/auth/check-email?email=${emailValue}`)
        const data = res.data
        console.log(res.data)
        // if the email is available, set the isUsedMail to false and clear the email error
        if (data.available) {
          setIsUsedMail(false)
          clearErrors('email')
        } else {
          setIsUsedMail(true)
          // if the email is not available, set the isUsedMail to true and set the email error
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
      setStrength('fair')
      clearErrors('password')
    } else if (score === 4) {
      setStrength('strong')
      clearErrors('password')
    }
  }, [password, setError, clearErrors])

  const onSubmit = async formData => {
    clearErrors()
    try {
      // Create the payload to send to the API
      const payload = { ...formData, role }

      // Make the API call
      const result = await signup(payload)

      // Handle API errors returned in the result
      if (result?.error) {
        toast.error(result.error)
        return setError('submit', { message: result.error })
      }

      // Success
      toast.success('Signup successful')
      navigate('/auth/otp')
    } catch (error) {
      // Handle network or unexpected errors

      const message = error?.message || 'Something went wrong'
      toast.error(message)
      setError('submit', { message })
    }
  }

  return (
    <div className="space-y-6 bg-[#0f0f10]">
      {/* Header */}
      <div>
        <img src="/assets/workifyy-logo.png" className="w-72" />
      </div>
      <div>
        <h1 className="mb-2 text-4xl font-bold text-white">Sign up</h1>
        <p className="text-gray-400">Sign up to hire professionals.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* First Name & Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="firstname" className="text-sm font-medium text-gray-300">
              First Name
            </label>
            <input
              id="firstname"
              placeholder="Enter your first name"
              className="w-full rounded-lg border-2 border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-white transition-colors focus:border-[#32cd32] focus:outline-none"
              {...register('firstname', { required: 'First name is required' })}
            />
            {errors.firstName && <p className="text-xs text-red-400">{errors.firstName.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="lastname" className="text-sm font-medium text-gray-300">
              Last Name*
            </label>
            <input
              id="lastname"
              placeholder="Enter your last name"
              className="w-full rounded-lg border-2 border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-white transition-colors focus:border-[#32cd32] focus:outline-none"
              {...register('lastname', { required: 'Last name is required' })}
            />
            {errors.lastName && <p className="text-xs text-red-400">{errors.lastName.message}</p>}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-300">
            Email*
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className={`w-full rounded-lg border-2 bg-zinc-900 px-3 py-2.5 text-sm text-white transition-colors focus:outline-none ${
              isUsedMail || errors.email
                ? 'border-red-500 focus:border-red-600'
                : 'border-zinc-700 focus:border-[#32cd32]'
            }`}
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
        </div>

        <PasswordInput
          strength={strength}
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 8, message: 'Minimum 8 characters' },
          })}
        />

        {/* Create Account Button */}
        <button
          type="submit"
          disabled={isSubmitting || isUsedMail || strength !== 'strong'}
          className="mt-6 w-full rounded-lg bg-[#32cd32] py-2.5 font-semibold text-white transition-colors hover:bg-green-700 disabled:bg-gray-700"
        >
          {isSubmitting ? 'Creating...' : 'Create account'}
        </button>
      </form>

      {/* Google Signup */}
      <div className="pt-2">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-700 bg-gray-800 py-2.5 font-medium text-gray-300 transition-colors hover:bg-gray-700"
        >
          <FcGoogle />
          <span>Sign up with Google</span>
        </button>
      </div>

      {/* Sign In Link */}
      <div className="pb-8  text-center">
        <p className="text-sm text-gray-400">
          Already have an account?{' '}
          <a href="#" className="pb-4 font-medium text-[#32cd32] hover:text-green-700">
            Sign in
          </a>
        </p>
      </div>

      {errors.submit && <p className="text-center text-xs text-red-400">{errors.submit.message}</p>}
    </div>
  )
}
