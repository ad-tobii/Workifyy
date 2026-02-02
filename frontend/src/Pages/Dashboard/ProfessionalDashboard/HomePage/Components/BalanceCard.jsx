import { ChevronRightIcon } from '@heroicons/react/24/solid'

const BalanceCard = () => {
  return (
    <div className="flex h-20 w-[90%] justify-between rounded-2xl border border-[#32cd32]/40 bg-[#32cd32]/80 px-4 py-4 text-white">
      <div className="flex flex-col">
        {' '}
        <span className="text-sm">My Balance</span>
        <span className="text-2xl font-bold">₦ 1,890.10</span>
      </div>

      <div className="flex h-9 w-9 flex-col items-center justify-center rounded-full bg-zinc-900/60 text-white ">
        <ChevronRightIcon className="h-5 w-5" />
      </div>
    </div>
  )
}

export default BalanceCard
