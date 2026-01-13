import React from 'react'

const BidPanel = () => {
  return (
    <div className="sticky top-6 w-full max-w-sm rounded-3xl border border-zinc-800 bg-[#131314] p-6 shadow-2xl shadow-black/50">
      {/* 1. Client's Budget Header */}
      <div className="mb-6 flex items-baseline gap-2">
        <span className="text-2xl font-medium text-zinc-500">Client's Budget : </span>{' '}
        <span className="text-2xl font-bold text-[#32cd32]">₦25,000</span>
      </div>

      {/* 2. Bidding Input Section */}
      <div className="mb-4 overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-950">
        <div className="p-4">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            Your Asking Price
          </label>
          <div className="mt-1 flex items-center gap-1">
            <span className="text-lg font-semibold text-[#32cd32]">₦</span>
            <input
              type="number"
              placeholder="0.00"
              className="w-full bg-transparent text-lg font-semibold text-white outline-none placeholder:text-zinc-700"
            />
          </div>
        </div>

        {/* Sub-note like the guest selector */}
        <div className="border-t border-zinc-800 bg-zinc-900/50 p-3">
          <p className="text-[10px] leading-tight text-zinc-500">
            Workifyy takes a 5% service fee on completed jobs.
          </p>
        </div>
      </div>

      {/* 3. Action Button */}
      <button className="w-full rounded-2xl bg-[#32cd32] py-4 text-sm font-bold text-black transition-transform hover:bg-[#2eb32e] active:scale-95">
        Place Bid Now
      </button>

      {/* 4. Footer Note */}
      <p className="mt-4 text-center text-xs text-zinc-500">
        You can withdraw your bid at any time
      </p>

      {/* 5. Report Link */}
      <div className="mt-8 flex justify-center border-t border-zinc-800 pt-4">
        <button className="flex items-center gap-2 text-[11px] font-medium text-zinc-600 hover:text-zinc-400">
          <span>🚩</span> Report this listing
        </button>
      </div>
    </div>
  )
}

export default BidPanel
