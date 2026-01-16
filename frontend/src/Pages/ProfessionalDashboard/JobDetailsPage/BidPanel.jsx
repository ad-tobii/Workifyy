import { useEffect, useState } from 'react'
import useJobStore from '../../../store/jobStore.store'

const BidPanel = ({ setIsOpen }) => {
  const job = useJobStore(state => state.job)
  const handleClick = () => {
    setIsOpen(true)
  }
  return (
    <div>
      {' '}
      <div className="hidden sm:block">
        <LargeBidPanel handleClick={handleClick} job={job} />
      </div>
      <div className="sm:hidden">
        <SmallBidPanel handleClick={handleClick} />
      </div>
    </div>
  )
}

const LargeBidPanel = ({ handleClick, job }) => {
  return (
    <div className="w-full rounded-3xl border border-zinc-800 bg-[#131314] p-6 shadow-2xl shadow-black/50 xl:sticky xl:top-6 xl:max-w-[380px]">
      <div className="mb-6 flex items-baseline gap-2">
        <span className="text-2xl font-medium text-zinc-500">Client's Budget :</span>
        <span className="text-2xl font-bold text-[#32cd32]">₦ {job.budget}</span>
      </div>

      <button
        onClick={handleClick}
        className="w-full rounded-2xl bg-[#32cd32] py-4 text-sm font-bold text-black transition-transform hover:bg-[#2eb32e] active:scale-95"
      >
        Place Bid Now
      </button>

      <p className="mt-4 text-center text-xs text-zinc-500">
        You can withdraw your bid at any time
      </p>

      <div className="mt-8 flex justify-center border-t border-zinc-800 pt-4">
        <button className="flex items-center gap-2 text-[11px] font-medium text-zinc-600 hover:text-zinc-400">
          <span>🚩</span> Report this listing
        </button>
      </div>
    </div>
  )
}

const SmallBidPanel = ({ handleClick }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 80) // show after scrolling
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-10 left-1/2 w-[90%] max-w-md -translate-x-1/2 transition-all duration-300 ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}
    >
      <button
        onClick={handleClick}
        className="flex h-12 w-full items-center justify-center rounded-2xl bg-[#32cd32] text-lg font-semibold text-black shadow-lg active:scale-95"
      >
        Place Bid Now
      </button>
    </div>
  )
}

export default BidPanel
