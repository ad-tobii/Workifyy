import React from 'react'
import { ClockIcon } from '@heroicons/react/24/outline'
import useJobStore from '../../../../store/useJobStore'

const JobDescription = () => {
  const job = useJobStore(state => state.job)

  return (
    <div className="space-y-6">
      {/* Client Card */}
      <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/30 p-4 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-700 bg-gradient-to-tr from-[#32cd32] to-zinc-700 text-sm font-bold text-black">
            {job.client?.firstname?.[0]}
            {job.client?.lastname?.[0]}
          </div>
          <div>
            <h4 className="font-semibold text-white">
              {job.client?.firstname} {job.client?.lastname}
            </h4>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#32cd32]">4.8</span>
              <svg className="h-3.5 w-3.5 fill-current text-[#32cd32]" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs text-zinc-500">Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Badges */}
      {job.scheduledAt && (
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5">
            <span className="text-sm text-red-500">⏳</span>
            <span className="text-xs font-medium text-red-400">
              Needed by{' '}
              {new Date(job.scheduledAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
      )}

      {/* Description */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-white">Job Description</h3>
        {/* MAX WIDTH CONSTRAINT - This is the key fix */}
        <p className=" text-sm  text-justify leading-relaxed text-zinc-300">{job.description}</p>
      </div>

      {/* Meta Info */}
      <div className="flex items-center gap-2 pt-2 text-zinc-500">
        <ClockIcon className="h-5 w-5" />
        <p className="text-sm">
          Posted{' '}
          {new Date(job.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  )
}

export default JobDescription
