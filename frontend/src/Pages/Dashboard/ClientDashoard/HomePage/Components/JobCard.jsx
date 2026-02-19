import {
  ChevronRightIcon,
  BriefcaseIcon,
  CalendarIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'

const STATUS = {
  awaiting_review: { color: '#ef4444', label: 'Awaiting Review' },
  ongoing: { color: '#22c55e', label: 'Ongoing' },
  open: { color: '#fbbf24', label: 'Open' },
  completed: { color: '#60a5fa', label: 'Completed' },
  pending: { color: '#9ca3af', label: 'Pending' },
}

const JobCard = ({ job }) => {
  const { color, label } = STATUS[job.status] || STATUS.pending
  const navigate = useNavigate()
  return (
    <div className="group relative flex cursor-pointer flex-col gap-5 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1a1a1d] to-[#0f0f12] p-6 shadow-lg transition-all duration-300 hover:scale-[1.015] hover:border-white/20 hover:shadow-xl">
      {/* Straight left accent bar — overflow-hidden on parent clips it flush */}
      <div className="absolute left-0 top-0 h-full w-[3px]" style={{ backgroundColor: color }} />
      {/* Subtle hover overlay */}
      <div className="absolute inset-0 bg-white/0 transition-all duration-300 group-hover:bg-white/[0.02]" />

      <div className="relative z-10 flex flex-col gap-5">
        {/* Title & Status */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-2">
              <BriefcaseIcon className="h-4 w-4 flex-shrink-0 text-white/40" />
              <p className="truncate font-bold text-white">{job.title}</p>
            </div>
            <p className="text-sm text-white/40">
              {job.client?.firstname} {job.client?.lastname}
            </p>
          </div>

          <div
            className="flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5"
            style={{ borderColor: `${color}40`, backgroundColor: `${color}18`, color }}
          >
            <span
              className="h-2 w-2 animate-pulse rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
          </div>
        </div>

        {/* Payment & Deadline */}
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              icon: <CurrencyDollarIcon className="h-4 w-4 text-white/40" />,
              label: 'Payment',
              value: `₦ ${job.budget?.toLocaleString() || '0'}`,
            },
            {
              icon: <CalendarIcon className="h-4 w-4 text-white/40" />,
              label: 'Deadline',
              value: job.scheduledAt ? format(new Date(job.scheduledAt), 'dd/MM/yy') : 'N/A',
              valueStyle: job.scheduledAt ? { color } : {},
            },
          ].map(({ icon, label, value, valueStyle = {} }) => (
            <div
              key={label}
              className="rounded-xl border border-white/10 bg-white/5 p-3 transition-colors duration-200 group-hover:border-white/20 group-hover:bg-white/[0.07]"
            >
              <div className="mb-1 flex items-center gap-1.5">
                {icon}
                <p className="text-xs text-white/40">{label}</p>
              </div>
              <p className="text-sm font-bold text-white" style={valueStyle}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-all duration-200 group-hover:border-white/20 group-hover:bg-white/[0.07]">
          <span
            onClick={() => navigate(`jobs/${job._id}`)}
            className="text-sm font-semibold text-white"
          >
            View Job
          </span>
          <ChevronRightIcon className="h-4 w-4 text-white/50 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" />
        </div>
      </div>
    </div>
  )
}

export default JobCard
