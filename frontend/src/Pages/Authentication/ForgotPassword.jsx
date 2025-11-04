import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Nav from '../../Components/Nav';

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Forgot password email submitted:', data.email);
    alert('Reset link would be sent to: ' + data.email);
  };

  return (
    <>
      <Nav />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-xl">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
              Forgot Your Password?
            </h2>
            <p className="mt-2 text-sm text-center text-gray-600">
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
                className={`appearance-none rounded-md relative block w-full px-3 py-3 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Email address"
              />
              {errors.email && (
                <p className="mt-2 text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send Reset Link
              </button>
            </div>
          </form>

          <div className="text-sm text-center">
            <Link to="/auth/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
              Remembered your password? Sign in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
