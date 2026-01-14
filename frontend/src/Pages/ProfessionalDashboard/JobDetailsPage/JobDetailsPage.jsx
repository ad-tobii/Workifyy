import TopBar from '../TopBar'
import JobImages from './JobImages'
import JobDescription from './JobDescription'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import BidPanel from './BidPanel'
import BidModal from './BidModal'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useJobStore from '../../../store/jobStore.store'

const JobDetailsPage = () => {
  const { jobId } = useParams()
  const fetchJob = useJobStore(state => state.fetchJob)

  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    const loadJob = async () => {
      try {
        const res = await fetchJob(jobId)
        console.log(res)
      } catch (err) {
        console.error('Failed to fetch job:', err)
      }
    }

    if (jobId) {
      loadJob()
    }
  }, [jobId, fetchJob])

  return (
    <div className="min-h-screen bg-[#0f0f10]">
      {isOpen && <BidModal setIsOpen={setIsOpen} />}
      <div className="hidden sm:block">
        <TopBar />
      </div>
      <div className="mx-auto w-[90%] px-2 py-4 text-zinc-400">
        <button className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800/50 text-zinc-300 shadow-sm transition-colors duration-200 hover:bg-zinc-700/70 hover:text-white hover:shadow-md active:scale-95">
          <ArrowLeftIcon className="h-5 w-5" />
        </button>

        {/* Title now starts exactly where the images start */}
        <h1 className="mb-6 text-xl font-medium tracking-wide text-zinc-400 sm:text-3xl md:text-3xl lg:text-3xl">
          I no go say person matter no matter
        </h1>

        {/* Job Images */}
        <div className="w-full">
          <JobImages />
        </div>

        <div className="mt-8 flex flex-col gap-10 xl:flex-row xl:items-start">
          {/* Left: Job Description */}
          <div className="w-full xl:flex-[1.5]">
            <JobDescription />
          </div>

          {/* Right: Bid Panel */}
          <div className="w-full xl:w-auto">
            {' '}
            {/* important: full width when column */}
            <div className="w-full xl:ml-auto xl:w-[380px]">
              {' '}
              {/* allow it to stretch < xl */}
              <BidPanel setIsOpen={setIsOpen} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetailsPage
