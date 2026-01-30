import { ArrowUpRightIcon, CalendarIcon, StarIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'



const JobCard = ({ job, index }) => {
  const navigate = useNavigate()

  

  return (
    <div className="mt-6 w-[90%] rounded-2xl bg-[#151518] p-5">
      {/* Job Title Section */}
      <h3 className="mb-3 text-2xl font-semibold leading-tight text-white">
        {job.title || 'Need a Plumber To Fix My Leaking Sink'}
      </h3>

      {/* Job Meta Information: Price, Posted Date, and Client Rating */}
      <div className="mb-4 flex items-center gap-2 text-sm text-[#bebec6]">
        {/* Job Price */}
        <span className="text-lg font-bold text-white">
          ₦{job.amount?.toLocaleString() || '50,000'}
        </span>

        <span>•</span>

        {/* When Job Was Posted */}
        <span>Posted {job.postedDate || 'Today'}</span>

        <span>•</span>

        {/* Client Rating */}
        <div className="flex items-center gap-1">
          <StarIcon className="h-4 w-4 text-yellow-400" />
          <span>{job.rating || '5.0'}</span>
        </div>
      </div>

      {/* Divider */}
      <hr className="mb-4 border-gray-600" />

      {/* Footer Section: When Job is Needed & Details Button */}
      <div className="flex items-center justify-between">
        {/* When the job needs to be done */}
        <div className="flex items-center gap-2 text-sm text-zinc-300">
          <CalendarIcon className="h-4 w-4" />
          <span>Needed: {job.neededBy || 'Today'}</span>
        </div>

        {/* Navigate to job details page */}
        <button
          onClick={() => navigate(`jobs/${job._id}`)}
          className="flex items-center gap-2 rounded-full bg-[#32cd32] px-4 py-2 font-semibold text-black transition-colors hover:bg-[#28a428]"
        >
          Details
          <ArrowUpRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default JobCard
