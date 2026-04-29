import { useState } from 'react'
import JobCard from './JobCard'
import useJobStore from '../../../../../store/useJobStore'

const FILTERS = [
  { key: 'all', label: 'ALL' },
  { key: 'open', label: 'OPEN' },
  { key: 'ongoing', label: 'ONGOING' },
  { key: 'awaiting_review', label: 'IN REVIEW' },
]

const PAGE_SIZE = 5

const Feed = () => {
  const jobs = useJobStore(state => state.jobs)
  const [filter, setFilter] = useState('all')
  const [page, setPage] = useState(1)

  const filtered = filter === 'all' ? jobs : jobs.filter(j => j.status === filter)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const activeLabel = FILTERS.find(f => f.key === filter)?.label ?? 'ALL'

  const handleFilterChange = key => {
    setFilter(key)
    setPage(1)
  }

  return (
    <div className="mt-6 w-[90%]">
      <div className="mb-1 flex items-center overflow-x-auto no-scrollbar">
        {FILTERS.map(({ key, label }) => {
          const isActive = filter === key
          return (
            <button
              key={key}
              onClick={() => handleFilterChange(key)}
              className={`relative shrink-0 px-3 py-2 text-[10px] font-semibold tracking-wide transition-colors duration-150 ${
                isActive ? 'text-[#32cd32]' : 'text-white/35 hover:text-white/65'
              }`}
            >
              {label}
              {isActive && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#32cd32]" />
              )}
            </button>
          )
        })}
      </div>

      {paginated.length > 0 ? (
        <>
          <div className="flex flex-col gap-2 pt-3">
            {paginated.map(job => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between px-1">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="text-xs text-white/40 transition-colors duration-150 hover:text-white disabled:pointer-events-none disabled:opacity-25"
              >
                ← Prev
              </button>
              <span className="text-[10px] font-semibold tracking-wide text-white/25">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="text-xs text-white/40 transition-colors duration-150 hover:text-white disabled:pointer-events-none disabled:opacity-25"
              >
                Next →
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center py-10">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-white/20">
            {filter === 'all' ? 'No jobs yet' : `No ${activeLabel.toLowerCase()} jobs`}
          </p>
        </div>
      )}
    </div>
  )
}

export default Feed
