'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import PasswordInput from './PasswordInput'
import api from '../../../api/axios.api'
import useUserStore from '../../../store/useUserStore'
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
        if (res.data.available) {
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
    }
    clearErrors('email')
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
      setError('password', { message: 'Password too weak — add uppercase, numbers, and symbols' })
    } else if (score === 2 || score === 3) {
      setStrength('fair')
      clearErrors('password')
    } else {
      setStrength('strong')
      clearErrors('password')
    }
  }, [password, setError, clearErrors])

  const onSubmit = async formData => {
    clearErrors()
    try {
      const result = await signup({ ...formData, role })
      if (result?.error) {
        toast.error(result.error)
        return setError('submit', { message: result.error })
      }
      toast.success('Account created!')
      navigate('/auth/otp')
    } catch (error) {
      const message = error?.message || 'Something went wrong'
      toast.error(message)
      setError('submit', { message })
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-white">
          {role === 'professional' ? 'Start earning.' : 'Hire smarter.'}
        </h1>
        <p className="mt-1.5 text-sm text-white/40">
          {role === 'professional'
            ? 'Create your account and start receiving job bids near you.'
            : 'Sign up to post jobs and receive competitive bids from verified pros.'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* First + Last Name */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-white/40">
              First Name
            </label>
            <input
              placeholder="First name"
              className={`w-full rounded-full border bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none transition-colors ${
                errors.firstname
                  ? 'border-red-500/60'
                  : 'border-white/10 focus:border-[#32CD32]/50'
              }`}
              {...register('firstname', { required: 'Required' })}
            />
            {errors.firstname && (
              <p className="mt-1 text-xs text-red-400">{errors.firstname.message}</p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-white/40">
              Last Name
            </label>
            <input
              placeholder="Last name"
              className={`w-full rounded-full border bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none transition-colors ${
                errors.lastname
                  ? 'border-red-500/60'
                  : 'border-white/10 focus:border-[#32CD32]/50'
              }`}
              {...register('lastname', { required: 'Required' })}
            />
            {errors.lastname && (
              <p className="mt-1 text-xs text-red-400">{errors.lastname.message}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-white/40">
            Email
          </label>
          <input
            type="email"
            placeholder="yourname@email.com"
            className={`w-full rounded-full border bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none transition-colors ${
              isUsedMail || errors.email
                ? 'border-red-500/60'
                : 'border-white/10 focus:border-[#32CD32]/50'
            }`}
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
        </div>

        <PasswordInput
          strength={strength}
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 8, message: 'Minimum 8 characters' },
          })}
        />

        {/* Submit — blocks only on weak password, not fair */}
        <button
          type="submit"
          disabled={isSubmitting || isUsedMail || strength === 'weak'}
          className="mt-2 w-full rounded-full bg-[#32CD32] py-3 text-sm font-black uppercase tracking-widest text-black transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isSubmitting ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      {errors.submit && (
        <p className="text-center text-xs text-red-400">{errors.submit.message}</p>
      )}

      <p className="text-center text-sm text-white/40">
        Already have an account?{' '}
        <Link to="/auth/signin" className="font-bold text-[#32CD32] hover:underline">
          Sign in
        </Link>
      </p>

      <div className="border-t border-white/10 pt-4 pb-6 text-center">
        <p className="text-xs text-white/30">
          {role === 'professional' ? 'Looking to hire instead?' : 'Want to offer your skills?'}{' '}
          <Link
            to={role === 'professional' ? '/auth/ClientSignup' : '/auth/ProfessionalSignup'}
            className="font-bold text-white/50 transition-colors hover:text-white"
          >
            {role === 'professional' ? 'Sign up as a client' : 'Join as a professional'}
          </Link>
        </p>
      </div>
    </div>
  )
}
