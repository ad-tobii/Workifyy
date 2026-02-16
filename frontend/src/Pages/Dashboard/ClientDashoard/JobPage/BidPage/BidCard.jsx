import { ArrowUpRightIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'

const BidCard = () => {
  const navigate = useNavigate()
  // Dummy data
  const bid = {
    name: 'Tunde Ade',
    avatarUrl: '', // leave empty for now
    rating: 4,
    price: 15000,
    budget: 12000,
    message: "I can complete this job quickly and with high quality. Let's get it done!",
    jobsCompleted: 12,
    professional: {
      _id: '123',
      name: 'Tunde Ade',
      avatarUrl: '', // leave empty for now
      rating: 4,
      price: 15000,
    },
  }

  const budgetDiff = bid.price - bid.budget
  const budgetText =
    budgetDiff === 0
      ? 'Matches your budget'
      : budgetDiff < 0
        ? `₦ ${Math.abs(budgetDiff).toLocaleString()} below your budget`
        : `₦ ${budgetDiff.toLocaleString()} above your budget`

  const budgetColor =
    budgetDiff === 0 ? 'text-gray-400' : budgetDiff < 0 ? 'text-emerald-400' : 'text-red-400'

  return (
    <div className="mx-auto my-4  rounded-2xl border border-zinc-800/50 bg-[#151518] p-5 text-white shadow-xl">
      {/* Top row: avatar + name/rating + profile button */}
      <div className="mb-6 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-full  text-sm font-semibold text-white shadow-lg">
            <img src="/assets/happy-user.jpg" alt="avatar" className="h-12 w-12 rounded-full" />
          </div>
          <div>
            <div className="text-base font-semibold">{bid.name}</div>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-sm ${i < bid.rating ? 'text-yellow-400' : 'text-zinc-700'}`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate(`bids/${bid.professional._id}`)}
          className="flex items-center gap-1 rounded-full bg-zinc-800 px-3 py-3 text-sm font-medium text-zinc-300 transition-all hover:bg-zinc-700/60 hover:text-white"
        >
          Details
          <ArrowUpRightIcon className="h-4 w-4 font-extrabold" />
        </button>
      </div>

      {/* Price section */}
      <div className="mb-6">
        <div className="text-3xl font-bold text-gray-200">₦ {bid.price.toLocaleString()}</div>
        <div className={`text-xs font-medium ${budgetColor}`}>{budgetText}</div>
      </div>

      <hr className="my-3 border-zinc-800" />

      {/* Action buttons */}
      <div className="flex gap-2">
        <button className="flex-1 rounded-full bg-[#32cd32] py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#2eb82e] hover:shadow-lg hover:shadow-[#32cd32]/20">
          Accept
        </button>
        <button className="flex-1 rounded-full bg-amber-500 py-2.5 text-sm font-semibold text-white transition-all hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-500/20">
          Counter
        </button>
        <button className="flex-1 rounded-full bg-red-600 py-2.5 text-sm font-semibold text-white transition-all hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/20">
          Reject
        </button>
      </div>
    </div>
  )
}

export default BidCard
