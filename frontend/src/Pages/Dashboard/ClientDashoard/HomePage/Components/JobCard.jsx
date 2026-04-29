import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'

const STATUS = {
  awaiting_review: { color: '#f97316', label: 'IN REVIEW' },
  ongoing: { color: '#32cd32', label: 'ONGOING' },
  open: { color: '#fbbf24', label: 'OPEN' },
  completed: { color: '#60a5fa', label: 'COMPLETED' },
  cancelled: { color: '#ef4444', label: 'CANCELLED' },
  pending: { color: '#6b7280', label: 'PENDING' },
}

const JobCard = ({ job }) => {
  const { color, label } = STATUS[job.status] || STATUS.pending
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`jobs/${job._id}`)}
      className="relative flex cursor-pointer flex-col gap-2 overflow-hidden rounded-xl border border-[#1d1d1f] bg-[#151518] px-5 py-4 transition-colors duration-150 hover:border-zinc-700 hover:bg-[#1a1a1d]"
    >
      <div className="absolute left-0 top-0 h-full w-[3px]" style={{ backgroundColor: color }} />

      <div className="flex items-center justify-between gap-4">
        <p className="truncate text-sm font-semibold text-white">{job.title}</p>
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
          <span
            className="text-[10px] font-semibold tracking-wide"
            style={{ color }}
          >
            {label}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <span className="text-xs text-white/55">₦{job.budget?.toLocaleString() || '0'}</span>
        {job.scheduledAt && (
          <>
            <span className="text-white/25">·</span>
            <span className="text-xs text-white/55">
              Due {format(new Date(job.scheduledAt), 'MMM d')}
            </span>
          </>
        )}
      </div>
    </div>
  )
}

export default JobCard
