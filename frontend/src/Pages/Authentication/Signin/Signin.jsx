import { Mail, Lock } from 'lucide-react'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import useUserStore from '../../../store/userStore.store'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import toast from 'react-hot-toast'

// TO DO : edit so login redirects to dashboard if already loggedIn

export default function Signin() {
  const login = useUserStore(state => state.login)
  const loading = useUserStore(state => state.loading.login)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm()

  const onSubmit = async data => {
    clearErrors()

    // EMAIL VALIDATION
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(data.email)) {
      return setError('email', {
        type: 'manual',
        message: 'Enter a valid email address',
      })
    }

    try {
      const { success, error, user } = await login(data)
      if (success) {
        console.log('user in signin_user.jsx', user)
        if (user.isVerified) {
          if (user.isOnboarded) {
            navigate(
              `/Dashboard/${user.role === 'professional' ? 'professionalDashboard' : 'clientDashboard'}`
            )

          } else {
            navigate('/Onboarding/welcome')
          }
        } else {
          navigate('/Auth/otp')
        }
      } else {
        setError('password', {
          type: 'manual',
          message: error,
        })
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="flex min-h-screen bg-[#0f0f10] text-white">
      {/* LEFT SIDE */}
      <div className="hidden w-1/2 p-4 lg:flex">
        <div className="relative h-full w-full">
          <img
            src="/assets/HeroSection.jpg"
            alt="Background"
            className="h-full w-full rounded-3xl object-cover"
          />
          <div className="absolute inset-0 rounded-3xl bg-black/40"></div>

          <div className="absolute bottom-10 left-10">
            <h1 className="text-4xl font-light">Where hardworking people</h1>
            <h1 className="text-4xl font-semibold">
              deliver true <span className="text-[#32cd32]">Quality.</span>
            </h1>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full flex-col items-center justify-center px-8 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="flex justify-center">
            <img src="/assets/workifyy-logo.png" className="w-72" />
          </div>

          <h2 className="mt-5 text-center text-3xl font-semibold">Login</h2>
          <p className="mt-3 text-center text-gray-400">
            Enter your credentials to access your account
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-6">
            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-gray-300">Email</label>
              <div
                className={`flex items-center rounded-xl bg-black/40 px-4 py-3 ${errors.email && 'ring-1 ring-red-500'} `}
              >
                <Mail className="mr-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="example@email.com"
                  className="w-full bg-transparent text-gray-200 focus:outline-none"
                  {...register('email', { required: 'Email is required' })}
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="mb-2 block text-gray-300">Password</label>
              <div
                className={`flex items-center rounded-xl bg-black/40 px-4 py-3 ${errors.password && 'ring-1 ring-red-500'} `}
              >
                <Lock className="mr-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-transparent text-gray-200 focus:outline-none"
                  {...register('password', { required: 'Password is required' })}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>

            {/* REMEMBER ME */}
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-300">Remember me</span>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold text-black transition ${loading ? 'cursor-not-allowed bg-[#32cd32]/60' : 'bg-[#32cd32] hover:bg-[#2cb52c]'} `}
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
              ) : (
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
              )}
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* SIGNUP */}
          <p className="mt-6 text-center text-gray-400">
            Don't have an Account?{' '}
            <Link
              to="/auth/signup"
              className="cursor-pointer font-medium text-[#32cd32] hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
