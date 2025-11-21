'use client'
import SignupForm from './SignupForm'
import SignupImage from './SignupImage'

export default function SignupPage({ role }) {
  return (
    <div className="flex h-screen pt-2 justify-center bg-[#0f0f10] ">
      {/* Left Section - Form */}
      <div className="scrollbar-hide flex w-full justify-center overflow-y-auto px-4 py-8 sm:px-8 lg:w-1/2">
        <div className="w-full max-w-md">
          <SignupForm role={role} />
        </div>
      </div>

      {/* Right Section - Image (Hidden on mobile) */}
      {/* Right Section - Image (Hidden on mobile) */}
      <div className="relative m-4 hidden  items-center justify-center overflow-hidden rounded-2xl px-8 py-8 lg:flex">
        {/* Glassy background with green glint */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 backdrop-blur-xl"></div>

        {/* Green glint overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#32cd32]/10 via-transparent to-[#32cd32]/5"></div>

        {/* Border glow */}
        <div className="absolute inset-0 rounded-2xl border border-white/10 shadow-[0_0_80px_rgba(50,205,50,0.15)]"></div>

        {/* Content */}
        <div className="relative z-10">
          <SignupImage />
        </div>
      </div>
    </div>
  )
}
