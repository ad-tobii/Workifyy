import {
  BriefcaseIcon,
  ClipboardDocumentListIcon,
  BookmarkIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline'

import useProStore from '../../../../../store/proStore.store'

const QuickActions = () => {
  const setMainTab = useProStore(state => state.setMainTab)
  const setJobTab = useProStore(state => state.setJobTab)
  return (
    <div className="scrollbar-hide mt-6 w-[90%] overflow-x-auto">
      {/* Section title */}
      <h3 className="mb-4 text-sm font-semibold text-white/70">Quick Actions</h3>

      {/* Horizontal scroll */}
      <div className="no-scrollbar overflow-x-auto">
        <div className="flex space-x-4">
          {/* Find Jobs */}
          <button
            onClick={() => setMainTab('jobs')}
            className="flex h-20 w-24 flex-col items-center justify-center rounded-xl bg-[#242427]/80 text-white transition-all duration-200 active:scale-95"
          >
            <BriefcaseIcon className="mb-2 h-7 w-7 text-[#32cd32]" />
            <span className="text-xs font-medium">Find Jobs</span>
          </button>

          {/* My Bids */}
          <button
            onClick={() => {
              setMainTab('jobs')
              setJobTab('Bids')
            }}
            className="flex h-20 w-24 flex-col items-center justify-center rounded-xl bg-[#242427]/80 text-white  transition-all duration-200 active:scale-95"
          >
            <ClipboardDocumentListIcon className="mb-2 h-7 w-7 text-[#32cd32]" />
            <span className="text-xs font-medium">My Bids</span>
          </button>

          {/* Saved Jobs */}
          <button
            onClick={() => {
              setMainTab('jobs')
              setJobTab('Saved Jobs')
            }}
            className="flex h-20 w-24 flex-col items-center justify-center rounded-xl bg-[#242427]/80 text-white transition-all duration-200 active:scale-95"
          >
            <BookmarkIcon className="mb-2 h-7 w-7 text-[#32cd32]" />
            <span className="text-xs font-medium">Saved</span>
          </button>

          {/* Post Job */}
          <div className="flex h-20 w-24 flex-col items-center justify-center rounded-xl bg-[#32cd32]/15 text-white  transition-all duration-200 active:scale-95">
            <CreditCardIcon className="mb-2 h-7 w-7 text-[#32cd32]" />
            <span className="text-xs font-medium">Withdraw</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickActions
