import {
  BriefcaseIcon,
  ClockIcon,
  ListBulletIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline'
import useClientStore from '../../../../../store/useClientStore'
const QuickActions = () => {
  const setMainTab = useClientStore(state => state.setMainTab)
  const setJobTab = useClientStore(state => state.setJobTab)
  return (
    <div className="mx-auto mt-6 w-[90%]">
      {/* Section title */}
      <h3 className="mb-4 text-sm font-semibold text-white/70">Quick Actions</h3>

      {/* Grid for small screens, horizontal scroll for larger screens */}
      <div className="no-scrollbar grid grid-cols-2 gap-4 overflow-x-auto sm:flex sm:space-x-4">
        {/* Find Jobs */}
        <button
          onClick={() => {
            setMainTab('jobs')
            setJobTab('Ongoing Jobs')
          }}
          className="flex h-20 w-full flex-col items-center justify-center rounded-xl bg-[#242427]/80 text-white transition-all duration-200 active:scale-95 sm:w-24"
        >
          <BriefcaseIcon className="mb-2 h-7 w-7 text-[#32cd32]" />
          <span className="text-center text-xs font-medium">Ongoing</span>
        </button>

        {/* My Bids */}
        <button
          onClick={() => {
            setMainTab('jobs')
            setJobTab('Bids')
          }}
          className="flex h-20 w-full flex-col items-center justify-center rounded-xl bg-[#242427]/80 text-white  transition-all duration-200 active:scale-95 sm:w-24"
        >
          <ListBulletIcon className="mb-2 h-7 w-7 text-[#32cd32]" />
          <span className="text-center text-xs font-medium">Open jobs</span>
        </button>

        {/* Saved Jobs */}
        <button className="flex h-20 w-full flex-col items-center justify-center rounded-xl bg-[#242427]/80 text-white  transition-all duration-200 active:scale-95 sm:w-24">
          <ClockIcon className="mb-2 h-7 w-7 text-[#32cd32]" />
          <span className="text-center text-xs font-medium">History</span>
        </button>

        {/* Post Job */}
        <button className="flex h-20 w-full flex-col items-center justify-center rounded-xl bg-[#32cd32]/15 text-white  transition-all duration-200 active:scale-95 sm:w-24">
          <CreditCardIcon className="mb-2 h-7 w-7 text-[#32cd32]" />
          <span className="text-center text-xs font-medium">Fund wallet</span>
        </button>
      </div>
    </div>
  )
}

export default QuickActions
