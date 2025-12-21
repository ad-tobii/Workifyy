import {
  BriefcaseIcon,
  ClockIcon,
  ListBulletIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline'

const QuickActions = () => {
  return (
    <div className="mx-auto mt-6 w-[90%]">
      {/* Section title */}
      <h3 className="mb-4 text-sm font-semibold text-white/70">Quick Actions</h3>

      {/* Grid for small screens, horizontal scroll for larger screens */}
      <div className="no-scrollbar grid grid-cols-2 gap-4 overflow-x-auto sm:flex sm:space-x-4">
        {/* Find Jobs */}
        <div className="flex h-20 w-full flex-col items-center justify-center rounded-xl bg-[#242427]/80 text-white transition-all duration-200 active:scale-95 sm:w-24">
          <BriefcaseIcon className="mb-2 h-7 w-7 text-[#32cd32]" />
          <span className="text-center text-xs font-medium">Ongoing</span>
        </div>

        {/* My Bids */}
        <div className="flex h-20 w-full flex-col items-center justify-center rounded-xl bg-[#242427]/80 text-white  transition-all duration-200 active:scale-95 sm:w-24">
          <ListBulletIcon className="mb-2 h-7 w-7 text-[#32cd32]" />
          <span className="text-center text-xs font-medium">Open jobs</span>
        </div>

        {/* Saved Jobs */}
        <div className="flex h-20 w-full flex-col items-center justify-center rounded-xl bg-[#242427]/80 text-white  transition-all duration-200 active:scale-95 sm:w-24">
          <ClockIcon className="mb-2 h-7 w-7 text-[#32cd32]" />
          <span className="text-center text-xs font-medium">History</span>
        </div>

        {/* Post Job */}
        <div className="flex h-20 w-full flex-col items-center justify-center rounded-xl bg-[#32cd32]/15 text-white  transition-all duration-200 active:scale-95 sm:w-24">
          <CreditCardIcon className="mb-2 h-7 w-7 text-[#32cd32]" />
          <span className="text-center text-xs font-medium">Fund wallet</span>
        </div>
      </div>
    </div>
  )
}

export default QuickActions
