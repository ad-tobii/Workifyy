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
  }, [jobId])

  if (loading || !job) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f0f10] text-zinc-400">
        <div className="text-center">
          <div className="mb-4 inline-block h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-[#32cd32]"></div>
          <p>Loading job…</p>
        </div>
      </div>
    )
  }

  const formattedBudget = new Intl.NumberFormat('en-NG').format(job.budget)

  return (
    <div className="min-h-screen bg-[#0f0f10]">
      {isOpen && <BidModal setIsOpen={setIsOpen} />}

      {/* Top bar (desktop only) */}
      <div className="hidden sm:block">
        <TopBar />
      </div>

      {/* Main Container with max-width */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800/50 text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>

        {/* Job title */}
        <h1 className="mb-6 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">{job.title}</h1>

        {/* Job images */}
        <div className="mb-8 w-full">
          <JobImages images={job.images} />
        </div>

        {/* Budget Badge (mobile only) */}
        <div className="mb-8 flex items-center justify-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-4 backdrop-blur-sm sm:hidden">
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
            Client Budget
          </span>
          <span className="text-2xl font-bold text-[#32cd32]">₦ {formattedBudget}</span>
        </div>

        {/* Two Column Layout */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Description */}
          <div className="lg:col-span-2">
            <JobDescription />
          </div>

          {/* Right Column - Bid Panel */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-6">
              <BidPanel setIsOpen={setIsOpen} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetailsPage
