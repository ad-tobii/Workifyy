import { StarIcon } from '@heroicons/react/24/solid'
const StatCards = () => {
  return (
    <div className="flex w-[90%] justify-between">
      <div className="flex h-32 w-[47%] flex-col justify-between rounded-2xl bg-[#242427] px-3 py-2 text-white">
        <div className="flex justify-between">
          <span className="w-20 text-sm font-semibold">Earnings this week</span>{' '}
          <span className="flex h-9 w-9 flex-col items-center justify-center rounded-full bg-[#151517] text-xl font-bold text-[#798179]">
            ₦
          </span>
        </div>

        <span className="text-[1.2rem] font-semibold">123,285.00</span>
      </div>

      <div className="flex h-32 w-[47%] flex-col justify-between rounded-2xl border-2 border-dashed border-[#32cd32] px-3 py-2 text-white">
        <div className="flex justify-between">
          <span className="w-20 text-sm font-semibold">Jobs Completed</span>{' '}
          <span className="flex h-9 w-9 flex-col items-center justify-center rounded-full bg-[#151517] text-xl font-bold text-[#798179]">
            <StarIcon className="h-7 w-7" />
          </span>
        </div>

        <span className="text-[1.2rem] font-semibold">24</span>
      </div>
    </div>
  )
}

export default StatCards
