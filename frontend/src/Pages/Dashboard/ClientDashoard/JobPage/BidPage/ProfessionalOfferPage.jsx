import { useEffect, useMemo, useState, useCallback } from 'react'
import {
  ArrowLeftIcon,
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid'
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline'
import { useNavigate, useParams } from 'react-router-dom'
import useEmblaCarousel from 'embla-carousel-react'
import useBidStore from '../../../../../store/useBidStore'
import ConfirmModal from '@/Pages/Dashboard/ProfessionalDashboard/JobPage/Components/BidPage/ConfirmModal'
import CounterOfferModal from '@/Pages/Dashboard/ProfessionalDashboard/JobPage/Components/BidPage/CounterOfferModal'
import RejectModal from './RejectModal'

// ─── Helpers ────────────────────────────────────────────────────────────────

const getInitials = (name = '') => {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || '?'
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const nameToColor = (name = '') => {
  const COLORS = [
    'bg-violet-500', 'bg-blue-500', 'bg-teal-500', 'bg-rose-500',
    'bg-amber-500', 'bg-cyan-500', 'bg-fuchsia-500', 'bg-emerald-500',
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return COLORS[Math.abs(hash) % COLORS.length]
}

const StarRating = ({ rating, max = 5 }) => {
  const rounded = Math.round(Number(rating) || 0)
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) =>
        i < rounded
          ? <StarIcon key={i} className="h-3.5 w-3.5 text-yellow-400" />
          : <StarOutlineIcon key={i} className="h-3.5 w-3.5 text-zinc-600" />
      )}
    </div>
  )
}

// ─── Skeleton ────────────────────────────────────────────────────────────────

const BidDetailsSkeleton = () => (
  <div className="animate-pulse space-y-4 px-4 pt-6">
    <div className="flex gap-4">
      <div className="h-20 w-20 rounded-2xl bg-zinc-800/60" />
      <div className="flex-1 space-y-2 pt-1">
        <div className="h-5 w-2/3 rounded bg-zinc-800/60" />
        <div className="h-3 w-1/2 rounded bg-zinc-800/60" />
        <div className="h-3 w-1/3 rounded bg-zinc-800/60" />
      </div>
    </div>
    <div className="h-16 rounded-xl bg-zinc-800/60" />
    <div className="h-28 rounded-xl bg-zinc-800/60" />
    <div className="h-48 rounded-xl bg-zinc-800/60" />
  </div>
)

// ─── Expandable text ─────────────────────────────────────────────────────────

const CHAR_LIMIT = 160

const ExpandableText = ({ text }) => {
  const [expanded, setExpanded] = useState(false)
  const isLong = text.length > CHAR_LIMIT
  return (
    <div>
      <p className="text-sm leading-relaxed text-zinc-300">
        {isLong && !expanded ? text.slice(0, CHAR_LIMIT).trimEnd() + '…' : text}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded(v => !v)}
          className="mt-1.5 text-xs font-semibold text-[#32cd32] hover:underline"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  )
}

// ─── Carousel ────────────────────────────────────────────────────────────────

const useCarousel = (options = {}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', ...options })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi, onSelect])

  return { emblaRef, emblaApi, selectedIndex, scrollPrev, scrollNext }
}

const CarouselNav = ({ scrollPrev, scrollNext }) => (
  <div className="flex shrink-0 gap-1.5">
    <button
      onClick={scrollPrev}
      className="flex h-7 w-7 items-center justify-center rounded-xl bg-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
    >
      <ChevronLeftIcon className="h-3.5 w-3.5" />
    </button>
    <button
      onClick={scrollNext}
      className="flex h-7 w-7 items-center justify-center rounded-xl bg-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
    >
      <ChevronRightIcon className="h-3.5 w-3.5" />
    </button>
  </div>
)

const CarouselDots = ({ items, selectedIndex, emblaApi }) =>
  items.length > 1 ? (
    <div className="mt-3 flex justify-center gap-1.5">
      {items.map((_, idx) => (
        <button
          key={idx}
          onClick={() => emblaApi?.scrollTo(idx)}
          className={`h-1 rounded-full transition-all duration-300 ${
            idx === selectedIndex ? 'w-5 bg-[#32cd32]' : 'w-1.5 bg-zinc-700'
          }`}
        />
      ))}
    </div>
  ) : null

// ─── Portfolio ───────────────────────────────────────────────────────────────

const PortfolioSection = ({ images }) => {
  const { emblaRef, emblaApi, selectedIndex, scrollPrev, scrollNext } = useCarousel()
  if (!images?.length) return null

  return (
    <section className="px-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">Portfolio</h2>
        <CarouselNav scrollPrev={scrollPrev} scrollNext={scrollNext} />
      </div>
      <div className="overflow-hidden rounded-xl" ref={emblaRef}>
        <div className="flex" style={{ gap: '8px' }}>
          {images.map((img, idx) => (
            <div key={idx} className="shrink-0" style={{ flex: '0 0 calc(50% - 4px)' }}>
              <img
                src={img}
                alt={`Portfolio ${idx + 1}`}
                className="aspect-square w-full rounded-lg object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <CarouselDots items={images} selectedIndex={selectedIndex} emblaApi={emblaApi} />
    </section>
  )
}

// ─── Reviews ─────────────────────────────────────────────────────────────────

const InitialsAvatar = ({ name }) => {
  const initials = getInitials(name)
  const colorClass = nameToColor(name)
  return (
    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${colorClass} text-xs font-bold text-white`}>
      {initials}
    </div>
  )
}

const ReviewsSection = ({ reviews }) => {
  const { emblaRef, emblaApi, selectedIndex, scrollPrev, scrollNext } = useCarousel()
  if (!reviews?.length) return null

  return (
    <section className="px-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
          Reviews
          <span className="ml-2 font-normal normal-case tracking-normal text-zinc-600">
            ({reviews.length})
          </span>
        </h2>
        <CarouselNav scrollPrev={scrollPrev} scrollNext={scrollNext} />
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {reviews.map((review, idx) => (
            <div key={idx} className="min-w-0 flex-[0_0_100%] px-2">
              <div className="rounded-xl border border-zinc-800 bg-[#151518] p-4">
                <div className="mb-3 flex items-center gap-3">
                  <InitialsAvatar name={review.clientName || '?'} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">{review.clientName}</p>
                    <div className="mt-0.5">
                      <StarRating rating={review.rating} />
                    </div>
                  </div>
                  {review.createdAt && (
                    <p className="shrink-0 text-xs text-zinc-600">
                      {new Date(review.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  )}
                </div>
                {review.review && (
                  <p className="text-sm leading-relaxed text-zinc-400">{review.review}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <CarouselDots items={reviews} selectedIndex={selectedIndex} emblaApi={emblaApi} />
    </section>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const ProfessionalOfferPage = () => {
  const navigate = useNavigate()
  const { bidId } = useParams()

  const bidDetails = useBidStore(state => state.bidDetails)
  const loading = useBidStore(state => state.loading)
  const error = useBidStore(state => state.error)
  const getBidDetails = useBidStore(state => state.getBidDetails)
  const clearBidDetails = useBidStore(state => state.clearBidDetails)
  const acceptBid = useBidStore(state => state.acceptBid)
  const rejectBid = useBidStore(state => state.rejectBid)
  const counterBid = useBidStore(state => state.counterBid)

  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [showCounterModal, setShowCounterModal] = useState(false)
  const [acceptError, setAcceptError] = useState(null)
  const [rejectError, setRejectError] = useState(null)
  const [counterError, setCounterError] = useState(null)

  useEffect(() => {
    if (!bidId) return
    getBidDetails(bidId)
    return () => clearBidDetails()
  }, [bidId])

  const reviews = useMemo(() => bidDetails?.professionalProfile?.reviews || [], [bidDetails])
  const portfolioPictures = useMemo(
    () => bidDetails?.professionalProfile?.portfolioPictures || [],
    [bidDetails]
  )
  const latestMessage = bidDetails?.negotiationHistory?.at(-1)?.message

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null

  const isMyTurn = bidDetails?.awaitingResponseFrom === 'client'
  const isPending = bidDetails?.status === 'pending'
  const showActions = isMyTurn && isPending

  const budgetDiff = bidDetails
    ? Number(bidDetails.currentAmount || 0) - Number(bidDetails.job?.budget || 0)
    : 0
  const budgetText =
    budgetDiff === 0
      ? 'Matches your budget'
      : budgetDiff < 0
        ? `₦${Math.abs(budgetDiff).toLocaleString()} below your budget`
        : `₦${budgetDiff.toLocaleString()} above your budget`
  const budgetColor =
    budgetDiff === 0 ? 'text-zinc-400' : budgetDiff < 0 ? 'text-emerald-400' : 'text-red-400'
  const amountColor = budgetDiff <= 0 ? 'text-[#32cd32]' : 'text-amber-400'

  const proName = bidDetails
    ? `${bidDetails.professional?.firstname || ''} ${bidDetails.professional?.lastname || ''}`.trim()
    : ''

  const handleAccept = async () => {
    setAcceptError(null)
    try {
      const result = await acceptBid(bidId)
      if (result?.success) {
        setShowAcceptModal(false)
        navigate(-1)
      } else {
        setAcceptError('There was an error accepting this bid. Please try again.')
      }
    } catch {
      setAcceptError('There was an error accepting this bid. Please try again.')
    }
  }

  const handleReject = async reason => {
    setRejectError(null)
    try {
      const result = await rejectBid(bidId, reason)
      if (result?.success) {
        setShowRejectModal(false)
        navigate(-1)
      } else {
        setRejectError('There was an error rejecting this bid. Please try again.')
      }
    } catch {
      setRejectError('There was an error rejecting this bid. Please try again.')
    }
  }

  const handleCounter = async (offer, message) => {
    setCounterError(null)
    try {
      const result = await counterBid(bidId, offer, message)
      if (result?.success) {
        setShowCounterModal(false)
        navigate(-1)
      } else {
        setCounterError('There was an error sending your counteroffer. Please try again.')
      }
    } catch {
      setCounterError('There was an error sending your counteroffer. Please try again.')
    }
  }

  const pageLoading = loading && !bidDetails

  return (
    <div className="min-h-screen bg-[#0f0f10] pb-32">
      {/* ── Sticky top bar ── */}
      <div className="sticky top-0 z-20 border-b border-zinc-800/50 bg-[#0f0f10]/95 backdrop-blur-md">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-800/70 text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </button>

          {bidDetails?.job?.title && (
            <p className="flex-1 truncate text-center text-sm font-medium text-zinc-300">
              {bidDetails.job.title}
            </p>
          )}

          {isPending && (
            <div
              className={`flex h-7 shrink-0 items-center gap-1.5 rounded-xl px-2.5 text-[10px] font-semibold uppercase tracking-wide ${
                isMyTurn ? 'bg-[#32cd32]/15 text-[#32cd32]' : 'bg-zinc-800/80 text-zinc-500'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${isMyTurn ? 'bg-[#32cd32]' : 'bg-zinc-500'}`}
              />
              {isMyTurn ? 'Your turn' : 'Pending'}
            </div>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-8">
        {pageLoading && <BidDetailsSkeleton />}

        {!pageLoading && error && (
          <div className="px-4 pt-6">
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-center">
              <p className="text-sm text-red-300">Unable to load bid details</p>
              <button
                onClick={() => navigate(-1)}
                className="mt-3 text-xs text-red-400 hover:text-red-300"
              >
                ← Go back
              </button>
            </div>
          </div>
        )}

        {!pageLoading && !error && bidDetails && (
          <div className="space-y-6 pt-6">
            {/* ── 1. Hero: Identity ── */}
            <section className="px-4">
              <div className="flex items-start gap-4">
                {bidDetails.professionalProfile?.photo ? (
                  <img
                    src={bidDetails.professionalProfile.photo}
                    alt={proName}
                    className="h-16 w-16 shrink-0 rounded-2xl object-cover sm:h-20 sm:w-20"
                  />
                ) : (
                  <div
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-xl font-bold text-white sm:h-20 sm:w-20 ${nameToColor(proName)}`}
                  >
                    {getInitials(proName)}
                  </div>
                )}

                <div className="min-w-0 flex-1 pt-1">
                  <h1 className="text-xl font-bold leading-tight text-white sm:text-2xl">
                    {proName}
                  </h1>
                  {bidDetails.professionalProfile?.tagline && (
                    <p className="mt-1 line-clamp-2 text-sm leading-snug text-zinc-400">
                      {bidDetails.professionalProfile.tagline}
                    </p>
                  )}
                  {avgRating && (
                    <div className="mt-2 flex items-center gap-2">
                      <StarRating rating={Math.round(parseFloat(avgRating))} />
                      <span className="text-sm font-bold text-white">{avgRating}</span>
                      <span className="text-xs text-zinc-600">
                        ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* ── 2. Bid offer ── */}
            <section className="px-4">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-400">
                Their Offer
              </p>
              <div className="rounded-xl border border-zinc-800 bg-[#151518] p-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className={`text-3xl font-bold tracking-tight sm:text-4xl ${amountColor}`}>
                      ₦ {Number(bidDetails.currentAmount || 0).toLocaleString()}
                    </p>
                    <p className={`mt-1 text-xs font-medium ${budgetColor}`}>{budgetText}</p>
                  </div>
                  {bidDetails.job?.budget && (
                    <div className="shrink-0 text-right">
                      <p className="text-[10px] uppercase tracking-wide text-zinc-600">Your budget</p>
                      <p className="mt-0.5 text-base font-semibold text-zinc-300">
                        ₦ {Number(bidDetails.job.budget).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>

                {latestMessage && (
                  <>
                    <div className="my-4 h-px bg-zinc-800" />
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                      Proposal
                    </p>
                    <ExpandableText text={latestMessage} />
                  </>
                )}
              </div>
            </section>

            {/* ── 4. Portfolio ── */}
            <PortfolioSection images={portfolioPictures} />

            {/* ── 5. Reviews ── */}
            <ReviewsSection reviews={reviews} />

            {/* ── 6. Job context (de-emphasised) ── */}
            {bidDetails.job && (
              <section className="px-4">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-400">
                  Job
                </p>
                <div className="rounded-xl border border-zinc-800/40 bg-[#151518]/50 px-4 py-3">
                  <p className="text-sm font-medium text-zinc-400">{bidDetails.job.title}</p>
                  {bidDetails.job.address && (
                    <p className="mt-0.5 text-xs text-zinc-600">{bidDetails.job.address}</p>
                  )}
                </div>
              </section>
            )}
          </div>
        )}
      </div>

      {/* ── Sticky action tray ── */}
      {!pageLoading && !error && bidDetails && (
        <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-zinc-800/60 bg-[#0f0f10]/95 backdrop-blur-sm">
          <div className="px-4 py-4">
            {showActions ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowRejectModal(true)}
                  disabled={loading}
                  className="flex-1 rounded-xl bg-red-600 py-3 text-sm font-bold text-white transition-colors hover:bg-red-700 disabled:opacity-40"
                >
                  Reject
                </button>
                <button
                  onClick={() => setShowCounterModal(true)}
                  disabled={loading}
                  className="flex-1 rounded-xl bg-amber-500 py-3 text-sm font-bold text-white transition-colors hover:bg-amber-600 disabled:opacity-40"
                >
                  Counter
                </button>
                <button
                  onClick={() => setShowAcceptModal(true)}
                  disabled={loading}
                  className="flex-1 rounded-xl bg-[#32cd32] py-3 text-sm font-bold text-black transition-colors hover:bg-[#2eb82e] disabled:opacity-40"
                >
                  Accept
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 py-1">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${isPending ? 'bg-amber-500' : 'bg-zinc-600'}`}
                />
                <p className="text-sm text-zinc-500">
                  {isPending
                    ? 'Waiting for professional'
                    : `Bid ${bidDetails?.status}`}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Modals ── */}
      <ConfirmModal
        isOpen={showAcceptModal}
        onClose={() => {
          setAcceptError(null)
          setShowAcceptModal(false)
        }}
        onConfirm={handleAccept}
        title="Accept Bid"
        message={`Accept ${bidDetails?.professional?.firstname}'s bid of ₦${Number(bidDetails?.currentAmount || 0).toLocaleString()}? This will notify the professional to proceed.`}
        confirmText="Accept Bid"
        confirmVariant="success"
        loading={loading}
        error={acceptError}
      />

      <RejectModal
        isOpen={showRejectModal}
        onClose={() => {
          setRejectError(null)
          setShowRejectModal(false)
        }}
        onConfirm={handleReject}
        professionalName={bidDetails?.professional?.firstname}
        loading={loading}
        error={rejectError}
      />

      <CounterOfferModal
        isOpen={showCounterModal}
        onClose={() => {
          setCounterError(null)
          setShowCounterModal(false)
        }}
        onConfirm={handleCounter}
        currentAmount={bidDetails?.currentAmount}
        currentMessage={latestMessage}
        loading={loading}
        error={counterError}
      />
    </div>
  )
}

export default ProfessionalOfferPage
