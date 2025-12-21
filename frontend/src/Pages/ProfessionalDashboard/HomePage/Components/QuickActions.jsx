import {
  BriefcaseIcon,
  ClipboardDocumentListIcon,
  BookmarkIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline'

const QuickActions = () => {
  return (
    <div className="scrollbar-hide mt-6 w-[90%] overflow-x-auto">
      {/* Section title */}
      <h3 className="mb-4 text-sm font-semibold text-white/70">Quick Actions</h3>

      {/* Horizontal scroll */}
      <div className="no-scrollbar overflow-x-auto">
        <div className="flex space-x-4">
          {/* Find Jobs */}
          <div className="flex h-20 w-24 flex-col items-center justify-center rounded-xl bg-[#242427]/80 text-white transition-all duration-200 active:scale-95">
            <BriefcaseIcon className="mb-2 h-7 w-7 text-[#32cd32]" />
            <span className="text-xs font-medium">Find Jobs</span>
          </div>

          {/* My Bids */}
          <div className="flex h-20 w-24 flex-col items-center justify-center rounded-xl bg-[#242427]/80 text-white  transition-all duration-200 active:scale-95">
            <ClipboardDocumentListIcon className="mb-2 h-7 w-7 text-[#32cd32]" />
            <span className="text-xs font-medium">My Bids</span>
          </div>

          {/* Saved Jobs */}
          <div className="flex h-20 w-24 flex-col items-center justify-center rounded-xl bg-[#242427]/80 text-white transition-all duration-200 active:scale-95">
            <BookmarkIcon className="mb-2 h-7 w-7 text-[#32cd32]" />
            <span className="text-xs font-medium">Saved</span>
          </div>

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
