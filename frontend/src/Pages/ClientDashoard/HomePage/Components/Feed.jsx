import { ChevronRightIcon } from '@heroicons/react/24/solid'

const Feed = () => {
  return (
    <div className="mt-6 w-[90%]">
      {/* Section title */}
      <h3 className="mb-3 text-sm font-semibold text-white/80">My Jobs</h3>

      {/* Ongoing Job Card */}
      <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#242427]/80 px-4 py-4 text-white shadow-lg ">
        {/* Top */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">Build Landing Page for Startup</p>
            <p className="mt-2 text-xs text-white/60">Client: Greenfield Labs</p>
          </div>

          {/* Status badge */}
          <span className="rounded-full bg-[#32cd32]/20 px-3 py-1 text-xs font-medium text-[#32cd32]">
            Ongoing
          </span>
        </div>

        {/* Middle */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-white/60">Payment</p>
            <p className="text-sm font-semibold">₦ 85,000</p>
          </div>

          <div>
            <p className="text-xs text-white/60">Deadline</p>
            <p className="text-sm font-semibold text-red-600">Aug 24</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-4 flex items-center justify-between rounded-xl bg-[#151517]/80 px-3 py-2">
          <span className="text-sm font-medium">View Job</span>
          <ChevronRightIcon className="h-5 w-5 text-white/70" />
        </div>
      </div>
    </div>
  )
}

export default Feed
