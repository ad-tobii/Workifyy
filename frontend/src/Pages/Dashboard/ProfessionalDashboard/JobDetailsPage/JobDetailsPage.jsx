import TopBar from '../TopBar'
import JobImages from './JobImages'
import JobDescription from './JobDescription'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import BidPanel from './BidPanel'
import BidModal from './BidModal'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useJobStore from '../../../../store/useJobStore'

const JobDetailsPage = () => {
  const { jobId } = useParams()
  const navigate = useNavigate()

  const fetchJob = useJobStore(state => state.fetchJob)
  const job = useJobStore(state => state.job)
  const loading = useJobStore(state => state.loading)

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (jobId) {
      fetchJob(jobId)
    }
  }, [jobId, fetchJob])

  // 🔒 Block page render until job is fetched
  if (loading || !job) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f0f10] text-zinc-400">
        Loading job…
      </div>
    )
  }

  // 🇳🇬 Proper currency formatting
  const formattedBudget = new Intl.NumberFormat('en-NG').format(job.budget)

  return (
    <div className="min-h-screen bg-[#0f0f10]">
      {isOpen && <BidModal setIsOpen={setIsOpen} />}

      {/* Top bar (desktop only) */}
      <div className="hidden sm:block">
        <TopBar />
      </div>

      <div className="mx-auto w-[90%] px-2 py-4 text-zinc-400">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800/50 text-zinc-300 shadow-sm transition-colors duration-200 hover:bg-zinc-700/70 hover:text-white hover:shadow-md active:scale-95"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>

        {/* Job title */}
        <h1 className="mb-6 text-xl font-medium tracking-wide text-zinc-400 sm:text-3xl">
          {job.title}
        </h1>

        {/* Job images */}
        <div className="w-full">
          <JobImages />
        </div>

        {/* ✅ Client Budget (centered between images & description) */}
        <div className="my-10 flex w-full flex-col items-center justify-center gap-1 rounded-xl bg-zinc-800/40 py-4 backdrop-blur sm:hidden sm:flex-row sm:gap-2">
          <span className="text-xs uppercase tracking-widest text-zinc-400">Client Budget</span>
          <span className="text-xl font-semibold text-[#32cd32]">₦ {formattedBudget}</span>
        </div>

        {/* Description + Bid panel */}
        <div className="mt-8 flex flex-col gap-10 xl:flex-row xl:items-start">
          {/* Left */}
          <div className="w-full xl:flex-[1.5]">
            <JobDescription />
          </div>

          {/* Right */}
          <div className="w-full xl:w-auto">
            <div className="w-full xl:ml-auto xl:w-[380px]">
              <BidPanel setIsOpen={setIsOpen} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetailsPage
