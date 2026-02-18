import {
  ChevronRightIcon,
  BriefcaseIcon,
  CalendarIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline'
import { format } from 'date-fns'

const JobCard = ({ job }) => {
  // Dynamic colors based on status - Green for Ongoing, Yellow for Open
  console.log('this is job', job)
  const statusStyles = {
    ongoing: {
      bg: 'bg-[#32cd32]/15',
      border: 'border-[#32cd32]/30',
      text: 'text-[#32cd32]',
      dot: 'bg-[#32cd32]',
      accent: '#32cd32',
    },

    open: {
      bg: 'bg-yellow-500/15',
      border: 'border-yellow-500/30',
      text: 'text-yellow-400',
      dot: 'bg-yellow-400',
      accent: '#fbbf24',
    },
    completed: {
      bg: 'bg-blue-500/15',
      border: 'border-blue-500/30',
      text: 'text-blue-400',
      dot: 'bg-blue-400',
      accent: '#60a5fa',
    },
    pending: {
      bg: 'bg-gray-500/15',
      border: 'border-gray-500/30',
      text: 'text-gray-400',
      dot: 'bg-gray-400',
      accent: '#9ca3af',
    },
  }

  const status = statusStyles[job.status] || statusStyles.Pending

  return (
    <div
      className={`group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border bg-gradient-to-br from-[#1a1a1d] to-[#0f0f12] px-6 py-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${status.border}`}
    >
      {/* Animated background gradient on hover */}
      <div
        className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-10 ${status.bg}`}
      />

      {/* Status indicator line */}
      <div
        className={`absolute left-0 top-0 h-1 w-full transition-all duration-300 ${status.bg}`}
        style={{ background: `linear-gradient(90deg, ${status.accent}, transparent)` }}
      />

      <div className="relative z-10 flex flex-col gap-5">
        {/* Top Section: Title & Status */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex items-center gap-2">
              <BriefcaseIcon className="h-5 w-5 flex-shrink-0 text-white/60" />
              <p className="truncate text-lg font-bold text-white">{job.title}</p>
            </div>
            <p className="text-sm text-white/50">
              {job.client?.firstname} {job.client?.lastname}
            </p>
          </div>

          {/* Status badge with glow effect */}
          <div
            className={`relative flex items-center gap-2 rounded-full px-4 py-2 ${status.bg} border border-transparent backdrop-blur-sm`}
          >
            <span className={`h-2.5 w-2.5 animate-pulse rounded-full ${status.dot}`} />
            <span className={`text-xs font-bold uppercase tracking-widest ${status.text}`}>
              {job.status}
            </span>
          </div>
        </div>

        {/* Middle Section: Payment & Deadline */}
        <div className="grid grid-cols-2 gap-4">
          <div className="group-hover:bg-white/8 rounded-xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm transition-all duration-300 group-hover:border-white/20">
            <div className="mb-1.5 flex items-center gap-2">
              <CurrencyDollarIcon className="h-4 w-4 text-white/60" />
              <p className="text-xs font-medium text-white/60">Payment</p>
            </div>
            <p className="text-base font-bold text-white">
              ₦ {job.budget?.toLocaleString() || '0'}
            </p>
          </div>

          <div className="group-hover:bg-white/8 rounded-xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm transition-all duration-300 group-hover:border-white/20">
            <div className="mb-1.5 flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-white/60" />
              <p className="text-xs font-medium text-white/60">Deadline</p>
            </div>
            {job.scheduledAt ? (
              <p className={`text-base font-bold ${status.text}`}>
                {format(new Date(job.scheduledAt), 'dd/MM/yy')}
              </p>
            ) : (
              <p className="text-base font-bold text-white/60">N/A</p>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <div
          className={`mt-2 flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-300 group-hover:gap-3 ${status.bg} border border-white/10 group-hover:border-white/30`}
        >
          <span className="text-sm font-semibold text-white">View Job</span>
          <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-white/70 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" />
        </div>
      </div>
    </div>
  )
}

export default JobCard
