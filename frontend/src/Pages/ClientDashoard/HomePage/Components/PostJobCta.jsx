import React from 'react'

const PostJobCta = () => {
  return (
    <div className="flex h-40 w-[90%] items-center justify-between rounded-2xl bg-[#171718] px-4">
      <div className="flex flex-col space-y-2 text-gray-300">
        <h2 className="text-xl font-bold">Need a job done?</h2>
        <span className="max-w-[18rem] text-xs">
          Connect with a pro near you and get the job done effortlessly! 🎉
        </span>
        <button className="w-16 rounded-2xl bg-[#32cd32] p-2 text-xs">Post job </button>
      </div>
      <div>
        <img
          src="/assets/client-cta.png"
          className="  -mt-8  h-48 min-w-28 object-cover sm:w-auto md:w-auto lg:w-auto xl:w-auto"
          alt="Man wearing jacket"
        />
      </div>
    </div>
  )
}

export default PostJobCta
