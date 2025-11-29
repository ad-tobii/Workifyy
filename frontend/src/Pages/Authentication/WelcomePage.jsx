import React from 'react'
import { ArrowRight } from 'lucide-react'

const WelcomePage = () => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="flex flex-1 flex-col bg-[#0f0f10] md:relative md:w-1/2 md:flex-row md:items-center md:justify-center md:py-16">
        <div className="flex flex-col md:p-0">
          <div className="flex justify-start p-6 md:absolute md:left-6 md:top-6 md:p-6">
            <img src="/assets/workifyy-logo.png" className="w-40 max-w-full sm:w-48" />
          </div>

          <div className="mb-4 mt-4 flex flex-1 items-center justify-center md:mb-0 md:mt-0">
            <img
              src="/assets/onboarding.png"
              className="w-56 max-w-[80%] sm:w-72 md:w-80 lg:w-96"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 bg-green-600 pt-6 md:flex md:w-1/2 md:flex-col md:justify-center md:py-16">
        <div className="flex flex-col space-y-1 px-8 font-serif sm:space-y-2 sm:px-12 md:px-16 lg:px-20">
          <p className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl">Making —</p>
          <p className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl">Work `Better</p>
        </div>

        <div className="mt-6 flex flex-col items-center space-y-4 md:mt-10">
          <hr className="w-[90%] border border-black sm:w-[23rem] md:w-full md:max-w-xs lg:max-w-md" />
          <p className="px-6 text-center text-lg sm:text-2xl md:px-16 md:text-xl lg:px-20 lg:text-2xl">
            Giving professionals the platform they deserve.
          </p>
          <hr className="w-[90%] border border-black sm:w-[23rem] md:w-full md:max-w-xs lg:max-w-md" />
        </div>

        <div className="mb-6 mt-8 flex justify-end px-6 md:mt-12 md:px-16 lg:px-20">
          <button className="flex h-12 w-40 items-center justify-center space-x-2 rounded-3xl bg-black text-base text-white sm:w-44 sm:text-lg md:h-14 md:w-48 md:text-xl">
            <span>Get Started</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage
