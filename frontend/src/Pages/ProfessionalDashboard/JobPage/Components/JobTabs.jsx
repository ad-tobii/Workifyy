import {
  MagnifyingGlassIcon,
  BriefcaseIcon,
  ReceiptPercentIcon,
  BookmarkIcon,
} from '@heroicons/react/24/outline'

import useProStore from '../../../../store/proStore.store'

const tabs = [
  { name: 'Find Jobs', icon: MagnifyingGlassIcon },
  { name: 'Ongoing Jobs', icon: BriefcaseIcon },
  { name: 'Bids', icon: ReceiptPercentIcon },
  { name: 'Saved Jobs', icon: BookmarkIcon },
]

const JobTabs = () => {
  const setJobTab = useProStore(state => state.setJobTab)
  const jobTab = useProStore(state => state.jobTab)
  return (
    <div className="w-[90%]">
      <div className="flex h-20 w-full items-center justify-between rounded-2xl border-2 border-[#1d1d1f] px-1 text-white">
        {tabs.map((tab, idx) => {
          const isActive = jobTab === tab.name
          return (
            <div
              key={idx}
              onClick={() => setJobTab(tab.name)}
              className={`flex h-16 w-16 cursor-pointer items-center justify-center rounded-xl transition-all duration-200 ${isActive ? 'bg-white/10 text-[#32cd32]' : 'hover:bg-white/10 hover:text-[#32cd32]'} `}
            >
              <tab.icon className="h-8 w-8" />
            </div>
          )
        })}
      </div>

      {/* Example usage of active tab name */}
      <div className="mt-4 text-2xl font-semibold text-white/60">{jobTab}</div>
    </div>
  )
}

export default JobTabs
