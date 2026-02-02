import React from 'react'
import { ClockIcon } from '@heroicons/react/24/outline'
import useJobStore from '../../../../store/jobStore.store'

const JobDescription = () => {
  const job = useJobStore(state => state.job)
  return (
    <div className="mt- mb-12 flex flex-col space-y-6 px-1 sm:mb-0">
      {/* 1. The Client Card */}
      <div className="flex h-20 w-full items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/30 p-4 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black bg-gradient-to-tr from-[#32cd32] to-zinc-700 text-xs font-bold text-black">
            BO
          </div>
          <div>
            <h4 className="text-sm font-semibold text-zinc-100">
              {job.client.firstname + ' ' + job.client.lastname}
            </h4>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-[#32cd32]">4.8</span>
            <svg className="h-3 w-3 fill-current text-[#32cd32]" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span className="text-[9px] font-medium uppercase tracking-widest text-zinc-600">
            Verified
          </span>
        </div>
      </div>

      {/* 2. Updated Badges: Deadline & Requirements */}
      <div className="flex flex-wrap gap-2">
        {/* Deadline Badge */}
        <div className="flex items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1">
          <span className="text-[10px] text-red-500">⏳</span>
          <span className="text-xs font-medium text-red-400">Apply by Jan 15</span>
        </div>
        {/* Tools Detail Badge */}
        <div className="flex items-center gap-1.5 rounded-full border border-zinc-700/50 bg-zinc-800/50 px-3 py-1">
          <span className="text-[10px] text-[#32cd32]">⚒️</span>
          <span className="text-xs font-medium text-zinc-200">Heavy Tools Provided</span>
        </div>
      </div>

      {/* 3. The Paragraph */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold tracking-tight text-white">Job Description</h3>
        <p className="text-justify text-[15px] leading-relaxed text-zinc-400">{job.description}</p>
      </div>

      {/* 4. Bottom Meta Info */}
      <div className="flex space-x-2 pt-2">
        <ClockIcon className="h-6 w-6" />
        <p className="text-[18px] italic text-zinc-600">Posted 2 hours ago</p>
      </div>
    </div>
  )
}

export default JobDescription
