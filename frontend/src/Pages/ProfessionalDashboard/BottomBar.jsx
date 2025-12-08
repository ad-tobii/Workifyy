import {
  CreditCardIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline'

const BottomBar = () => {
  return (
    <div className="fixed bottom-12 left-1/2 flex h-20 w-[90%] -translate-x-1/2 justify-between rounded-3xl border border-white/10 bg-white/5 px-4 py-4 text-white shadow-lg shadow-black/20 backdrop-blur-lg sm:hidden">
      <HomeIcon className="h-10 w-10 transition-colors duration-200 hover:text-[#32cd32]" />
      <BriefcaseIcon className="h-10 w-10 transition-colors duration-200 hover:text-[#32cd32]" />
      <CreditCardIcon className="h-10 w-10 transition-colors duration-200 hover:text-[#32cd32]" />
      <QuestionMarkCircleIcon className="h-10 w-10 transition-colors duration-200 hover:text-[#32cd32]" />
    </div>
  )
}

export default BottomBar
