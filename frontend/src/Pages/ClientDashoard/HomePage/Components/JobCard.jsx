import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'
const JobCard = ({ job }) => {
  // Dynamic colors based on status
  const statusStyles = {
    Ongoing: 'bg-[#32cd32]/20 text-[#32cd32]',
    Completed: 'bg-blue-500/20 text-blue-400',
    Pending: 'bg-yellow-500/20 text-yellow-400',
  }

  return (
    <div className="flex cursor-pointer flex-col justify-between rounded-2xl border border-white/10 bg-[#242427]/80 px-4 py-4 text-white shadow-lg transition-transform hover:scale-[1.02]">
      {/* Top */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">{job.title}</p>
          <p className="mt-2 text-xs text-white/60">
            Client: {job.client.firstname} {job.client.lastname}
          </p>
        </div>

        {/* Status badge */}
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[job.status] || statusStyles.Pending}`}
        >
          {job.status}
        </span>
      </div>

      {/* Middle */}
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-white/60">Payment</p>
          <p className="text-sm font-semibold">₦ {job.budget.toLocaleString()}</p>
        </div>

        <div>
          <p className="text-xs text-white/60">Deadline</p>
          {job.scheduledAt && (
            <p
              className={`text-sm font-semibold ${status === 'Ongoing' ? 'text-red-500' : 'text-white/80'}`}
            >
              {format(new Date(job.scheduledAt), 'dd/MM/yyyy')}
            </p>
          )}
          {!job.scheduledAt && <p className="text-sm font-semibold text-white/80">N/A</p>}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-4 flex items-center justify-between rounded-xl bg-[#151517]/80 px-3 py-2">
        <span className="text-sm font-medium">View Job</span>
        <ChevronRightIcon className="h-5 w-5 text-white/70" />
      </div>
    </div>
  )
}

export default JobCard
