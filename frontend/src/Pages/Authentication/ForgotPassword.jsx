import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Nav from '../../Components/Nav'

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = data => {
    console.log('Forgot password email submitted:', data.email)
    alert('Reset link would be sent to: ' + data.email)
  }

  return (
    <>
      <Nav />
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Forgot Your Password?
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              No worries! Enter your email address below and we'll send you a link to reset it.
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className={`relative block w-full appearance-none rounded-md border px-3 py-3 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                placeholder="Email address"
              />
              {errors.email && <p className="mt-2 text-xs text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Send Reset Link
              </button>
            </div>
          </form>

          <div className="text-center text-sm">
            <Link to="/auth/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
              Remembered your password? Sign in
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
