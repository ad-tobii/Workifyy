import { useEffect, useMemo } from 'react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useNavigate, useParams } from 'react-router-dom'
import useBidStore from '../../../../../store/useBidStore'

const BidDetailsSkeleton = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-28 rounded-2xl bg-zinc-800" />
    <div className="h-36 rounded-2xl bg-zinc-800" />
    <div className="h-52 rounded-2xl bg-zinc-800" />
  </div>
)

const ProfessionalOfferPage = () => {
  const navigate = useNavigate()
  const { bidId } = useParams()

  const bidDetails = useBidStore(state => state.bidDetails)
  const loading = useBidStore(state => state.loading)
  const error = useBidStore(state => state.error)
  const getBidDetails = useBidStore(state => state.getBidDetails)
  const clearBidDetails = useBidStore(state => state.clearBidDetails)

  useEffect(() => {
    if (!bidId) return

    getBidDetails(bidId)

    return () => {
      clearBidDetails()
    }
  }, [bidId, getBidDetails, clearBidDetails])

  const reviews = useMemo(() => bidDetails?.professionalProfile?.reviews || [], [bidDetails])
  const portfolioPictures = useMemo(
    () => bidDetails?.professionalProfile?.portfolioPictures || [],
    [bidDetails]
  )
  const latestMessage = bidDetails?.negotiationHistory?.at(-1)?.message

  return (
    <div className="min-h-screen bg-[#0f0f10] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-[#32cd32]"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Back
        </button>

        {loading && <BidDetailsSkeleton />}

        {!loading && error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-red-300">
            Unable to load bid details. Please go back and try again.
          </div>
        )}

        {!loading && !error && bidDetails && (
          <div className="space-y-6">
            <section className="rounded-2xl border border-zinc-800 bg-[#151518] p-6">
              <div className="flex items-center gap-4">
                {bidDetails?.professionalProfile?.photo && (
                  <img
                    src={bidDetails.professionalProfile.photo}
                    alt={`${bidDetails.professional?.firstname || ''} ${bidDetails.professional?.lastname || ''}`}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                )}
                <div>
                  {(bidDetails.professional?.firstname || bidDetails.professional?.lastname) && (
                    <h1 className="text-xl font-bold">
                      {bidDetails.professional?.firstname} {bidDetails.professional?.lastname}
                    </h1>
                  )}
                  {bidDetails.professionalProfile?.tagline && (
                    <p className="text-sm text-zinc-400">{bidDetails.professionalProfile.tagline}</p>
                  )}
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-zinc-800 bg-[#151518] p-6">
              <p className="text-sm uppercase tracking-wide text-zinc-400">Bid Amount</p>
              <p className="mt-2 text-4xl font-bold text-[#32cd32]">
                ₦{Number(bidDetails.currentAmount || 0).toLocaleString()}
              </p>
              {latestMessage && <p className="mt-4 text-zinc-300">{latestMessage}</p>}
              {bidDetails?.negotiationHistory?.length > 0 && (
                <p className="mt-3 text-xs text-zinc-500">
                  Timeline: {bidDetails.negotiationHistory.length} negotiation update
                  {bidDetails.negotiationHistory.length > 1 ? 's' : ''}
                </p>
              )}
            </section>

            <section className="rounded-2xl border border-zinc-800 bg-[#151518] p-6">
              <h2 className="mb-4 text-lg font-semibold">Job Details</h2>
              <div className="space-y-2 text-sm text-zinc-300">
                {bidDetails.job?.title && <p>Title: {bidDetails.job.title}</p>}
                {bidDetails.job?.description && <p>{bidDetails.job.description}</p>}
                {bidDetails.job?.budget && (
                  <p>Budget: ₦{Number(bidDetails.job.budget).toLocaleString()}</p>
                )}
                {bidDetails.job?.status && <p className="capitalize">Status: {bidDetails.job.status}</p>}
                {bidDetails.job?.address && <p>Address: {bidDetails.job.address}</p>}
              </div>
            </section>

            {bidDetails.job?.submission && (
              <section className="rounded-2xl border border-zinc-800 bg-[#151518] p-6">
                <h2 className="mb-4 text-lg font-semibold">Submission</h2>
                {bidDetails.job.submission.message && (
                  <p className="mb-3 text-sm text-zinc-300">{bidDetails.job.submission.message}</p>
                )}
                {bidDetails.job.submission.images?.length > 0 && (
                  <div className="grid grid-cols-2 gap-3">
                    {bidDetails.job.submission.images.map(image => (
                      <img key={image} src={image} alt="Submission" className="h-32 w-full rounded-lg object-cover" />
                    ))}
                  </div>
                )}
              </section>
            )}

            {reviews.length > 0 && (
              <section className="rounded-2xl border border-zinc-800 bg-[#151518] p-6">
                <h2 className="mb-4 text-lg font-semibold">Client Reviews</h2>
                <div className="space-y-4">
                  {reviews.map(review => (
                    <div key={review._id || review.createdAt} className="rounded-xl bg-zinc-900 p-4">
                      <p className="text-sm font-semibold">{review.clientName}</p>
                      <p className="text-xs text-zinc-500">Rating: {review.rating}/5</p>
                      {review.review && <p className="mt-2 text-sm text-zinc-300">{review.review}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {portfolioPictures.length > 0 && (
              <section className="rounded-2xl border border-zinc-800 bg-[#151518] p-6">
                <h2 className="mb-4 text-lg font-semibold">Portfolio</h2>
                <div className="grid grid-cols-2 gap-3">
                  {portfolioPictures.map(image => (
                    <img key={image} src={image} alt="Portfolio" className="h-40 w-full rounded-lg object-cover" />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfessionalOfferPage
