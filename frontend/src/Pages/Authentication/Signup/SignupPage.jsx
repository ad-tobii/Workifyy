import SignupForm from './SignupForm'
import SignupImage from './SignupImage'
export default function SignupPage({ role }) {
  return (
    <div className="flex min-h-screen justify-center bg-[#0f0f10] py-4 pb-12 xl:items-center">
      {/* Left Section - Form */}
      <div className="scrollbar-hide flex w-full justify-center overflow-y-auto px-4 py-8 sm:px-8 lg:max-h-[48rem] lg:w-1/2 lg:overflow-visible">
        <div className="w-full max-w-md">
          <SignupForm role={role} />
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="relative m-4 hidden h-screen items-center justify-center overflow-hidden rounded-2xl px-8 py-8 xl:flex xl:max-h-[48rem] xl:w-1/2 xl:max-w-2xl">
        {/* Glassy background with green glint */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 backdrop-blur-xl"></div>

        {/* Green glint overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#32cd32]/10 via-transparent to-[#32cd32]/5"></div>

        {/* Border glow */}
        <div className="absolute inset-0 rounded-2xl border border-white/10 shadow-[0_0_80px_rgba(50,205,50,0.15)]"></div>

        {/* Content */}
        <div className="relative z-10 flex h-full w-full items-center justify-center">
          <SignupImage />
        </div>
      </div>
    </div>
  )
}
