import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import Nav from '../../Components/Nav'

const ResetPassword = () => {
  const { token } = useParams()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const newPassword = watch('password')

  const onSubmit = data => {
    console.log('Password reset submitted:', data)
    alert(`Password would be reset for token: ${token}\nNew Password: ${data.password}`)
  }

  return (
    <>
      <Nav />
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Reset Your Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">Choose a new strong password.</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="password_reset" className="sr-only">
                New Password
              </label>
              <input
                id="password_reset"
                type="password"
                autoComplete="new-password"
                required
                {...register('password', {
                  required: 'New password is required',
                  minLength: { value: 8, message: 'Password must be at least 8 characters' },
                })}
                className={`relative block w-full appearance-none rounded-md border px-3 py-3 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                placeholder="New Password"
              />
              {errors.password && (
                <p className="mt-2 text-xs text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="passwordConfirm_reset" className="sr-only">
                Confirm New Password
              </label>
              <input
                id="passwordConfirm_reset"
                type="password"
                autoComplete="new-password"
                required
                {...register('passwordConfirm', {
                  required: 'Please confirm your new password',
                  validate: value => value === newPassword || 'Passwords do not match',
                })}
                className={`relative block w-full appearance-none rounded-md border px-3 py-3 ${
                  errors.passwordConfirm ? 'border-red-500' : 'border-gray-300'
                } text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                placeholder="Confirm New Password"
              />
              {errors.passwordConfirm && (
                <p className="mt-2 text-xs text-red-600">{errors.passwordConfirm.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={!token}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
              >
                Reset Password
              </button>
            </div>
          </form>

          <div className="text-center text-sm">
            <Link to="/auth/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
              Back to Sign in
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
