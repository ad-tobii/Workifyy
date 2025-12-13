import {
  MagnifyingGlassIcon,
  BriefcaseIcon,
  ReceiptPercentIcon,
  BookmarkIcon,
} from '@heroicons/react/24/outline'

const tabs = [
  { name: 'Find Jobs', icon: MagnifyingGlassIcon },
  { name: 'Ongoing Jobs', icon: BriefcaseIcon },
  { name: 'Bids', icon: ReceiptPercentIcon },
  { name: 'Saved Jobs', icon: BookmarkIcon },
]

const JobTabs = () => {
  return (
    <div className="w-[90%]">
      <div className="flex h-20 w-full items-center justify-between rounded-2xl border-2 border-[#1d1d1f] px-1 text-white">
        {tabs.map((tab, idx) => (
          <span
            key={idx}
            className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-xl transition-all duration-200 hover:bg-white/10 hover:text-[#32cd32]"
          >
            <tab.icon className="h-8 w-8" />
          </span>
        ))}
      </div>

      {/* Example usage of tab name */}
      <div className="mt-4 text-2xl font-semibold text-white/60">{tabs[2].name}</div>
    </div>
  )
}

export default JobTabs
