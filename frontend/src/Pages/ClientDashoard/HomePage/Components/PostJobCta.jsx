import React from 'react'

const PostJobCta = () => {
  return (
    <div className="flex h-40 w-[90%] items-center justify-between rounded-2xl bg-[#171718] px-4">
      <div className="flex flex-col space-y-2 text-gray-300">
        <h2 className="text-[1rem] font-bold sm:text-2xl">Need a job done?</h2>
        <span className="max-w-[11rem] text-[0.65rem] sm:max-w-[18rem] sm:text-sm">
          Connect with a pro near you and get the job done effortlessly! 🎉
        </span>
        <button className="w-16 rounded-2xl bg-[#32cd32]  p-2 text-xs sm:w-24 sm:text-sm">
          Post job{' '}
        </button>
      </div>
      <div>
        <img
          src="/assets/client-cta.png"
          className="-mt-8 h-48 min-w-fit object-cover sm:w-auto md:w-auto lg:w-auto xl:w-auto"
          alt="Man wearing jacket"
        />
      </div>
    </div>
  )
}

export default PostJobCta
