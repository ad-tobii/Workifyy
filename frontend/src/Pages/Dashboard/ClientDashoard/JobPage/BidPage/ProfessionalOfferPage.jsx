import { useEffect, useMemo, useState, useCallback } from 'react'
import {
  ArrowLeftIcon,
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/solid'
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline'
import { useNavigate, useParams } from 'react-router-dom'
import useEmblaCarousel from 'embla-carousel-react'
import useBidStore from '../../../../../store/useBidStore'

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Get initials from a full name string */
const getInitials = (name = '') => {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || '?'
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

/** Deterministic colour class from a string */
const nameToColor = (name = '') => {
  const COLORS = [
    'bg-violet-500',
    'bg-blue-500',
    'bg-teal-500',
    'bg-rose-500',
    'bg-amber-500',
    'bg-cyan-500',
    'bg-fuchsia-500',
    'bg-emerald-500',
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return COLORS[Math.abs(hash) % COLORS.length]
}

/** Render filled + empty star icons */
const StarRating = ({ rating, max = 5 }) => {
  const rounded = Math.round(Number(rating) || 0)
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) =>
        i < rounded ? (
          <StarIcon key={i} className="h-4 w-4 text-yellow-400" />
        ) : (
          <StarOutlineIcon key={i} className="h-4 w-4 text-zinc-600" />
        )
      )}
    </div>
  )
}

// ─── Skeleton ────────────────────────────────────────────────────────────────

const BidDetailsSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-40 rounded-2xl bg-zinc-800/60" />
    <div className="h-28 rounded-2xl bg-zinc-800/60" />
    <div className="h-56 rounded-2xl bg-zinc-800/60" />
    <div className="h-40 rounded-2xl bg-zinc-800/60" />
  </div>
)

// ─── Expandable Description ──────────────────────────────────────────────────

const CHAR_LIMIT = 120

const ExpandableDescription = ({ text }) => {
  const [expanded, setExpanded] = useState(false)
  const isLong = text.length > CHAR_LIMIT

  return (
    <div>
      <p className="mb-1 text-xs text-zinc-600">Description</p>
      <p className="text-sm leading-relaxed text-zinc-400">
        {isLong && !expanded ? text.slice(0, CHAR_LIMIT).trimEnd() + '…' : text}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded(v => !v)}
          className="mt-1 text-xs font-medium text-[#32cd32] hover:underline"
        >
          {expanded ? 'See less' : 'See more'}
        </button>
      )}
    </div>
  )
}

// ─── Section Header ──────────────────────────────────────────────────────────

const SectionHeader = ({ title, subtitle, count, action }) => (
  <div className="mb-5 flex items-start justify-between gap-4">
    <div>
      <h2 className="text-lg font-bold text-white">
        {title}
        {count != null && <span className="ml-2 text-sm font-normal text-zinc-500">({count})</span>}
      </h2>
      {subtitle && <p className="mt-0.5 hidden text-sm text-zinc-500 sm:block">{subtitle}</p>}
    </div>
    {action}
  </div>
)

// ─── Carousel Hook ───────────────────────────────────────────────────────────

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

const CarouselButtons = ({ scrollPrev, scrollNext }) => (
  <div className="flex shrink-0 gap-2">
    <button
      onClick={scrollPrev}
      className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-white transition-colors hover:bg-zinc-700"
    >
      <ChevronLeftIcon className="h-4 w-4" />
    </button>
    <button
      onClick={scrollNext}
      className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-white transition-colors hover:bg-zinc-700"
    >
      <ChevronRightIcon className="h-4 w-4" />
    </button>
  </div>
)

const CarouselDots = ({ items, selectedIndex, emblaApi }) =>
  items.length > 1 ? (
    <div className="mt-4 flex justify-center gap-1.5">
      {items.map((_, idx) => (
        <button
          key={idx}
          onClick={() => emblaApi?.scrollTo(idx)}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            idx === selectedIndex ? 'w-5 bg-[#32cd32]' : 'w-1.5 bg-zinc-600'
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
    <div className="rounded-2xl border border-zinc-800 bg-[#151518] p-5">
      <SectionHeader
        title="Portfolio"
        subtitle="View this professional's past work and projects"
        action={<CarouselButtons scrollPrev={scrollPrev} scrollNext={scrollNext} />}
      />

      {/*
        Each slide = exactly 2 images side-by-side.
        Using inline style for flex-basis to avoid Tailwind purge issues with calc().
        gap is handled via margin on slides so Embla doesn't break.
      */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex" style={{ gap: '12px' }}>
          {images.map((image, idx) => (
            <div key={idx} className="shrink-0" style={{ flex: '0 0 calc(50% - 6px)' }}>
              <img
                src={image}
                alt={`Portfolio ${idx + 1}`}
                className="aspect-square w-full rounded-xl p-2 object-cover shadow-sm"
              />
            </div>
          ))}
        </div>
      </div>

      <CarouselDots items={images} selectedIndex={selectedIndex} emblaApi={emblaApi} />
    </div>
  )
}

// ─── Reviews ─────────────────────────────────────────────────────────────────

const InitialsAvatar = ({ name }) => {
  const initials = getInitials(name)
  const colorClass = nameToColor(name)
  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${colorClass} text-xs font-bold text-white`}
    >
      {initials}
    </div>
  )
}

const ReviewsSection = ({ reviews }) => {
  const { emblaRef, emblaApi, selectedIndex, scrollPrev, scrollNext } = useCarousel()
  if (!reviews?.length) return null

  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#151518] p-5">
      <SectionHeader
        title="Client Reviews"
        count={reviews.length}
        subtitle="See what clients say about their previous jobs"
        action={<CarouselButtons scrollPrev={scrollPrev} scrollNext={scrollNext} />}
      />

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {reviews.map((review, idx) => (
            <div key={idx} className="min-w-0 flex-[0_0_100%] px-0.5">
              <div className="rounded-xl bg-zinc-900/60 p-4">
                {/* Avatar + name + stars row */}
                <div className="mb-3 flex items-center gap-3">
                  <InitialsAvatar name={review.clientName || '?'} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">{review.clientName}</p>
                    <div className="mt-1">
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
    </div>
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

  return (
    <div className="min-h-screen bg-[#0f0f10] pb-28">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-10 border-b border-zinc-800/60 bg-[#0f0f10]/90 backdrop-blur-md">
        <div className="mx-auto max-w-2xl px-4 py-3 sm:px-6">
          <button
            onClick={() => navigate(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800/60 text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
        {loading && <BidDetailsSkeleton />}

        {!loading && error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-center">
            <p className="text-red-300">Unable to load bid details</p>
            <button
              onClick={() => navigate(-1)}
              className="mt-3 text-sm text-red-400 hover:text-red-300"
            >
              ← Go back
            </button>
          </div>
        )}

        {!loading && !error && bidDetails && (
          <div className="space-y-4">
            {/* ── 1. Professional Identity ── */}
            <div className="rounded-2xl border border-zinc-800 bg-[#151518] p-5">
              <div className="flex items-start gap-4">
                {bidDetails.professionalProfile?.photo && (
                  <img
                    src={bidDetails.professionalProfile.photo}
                    alt={`${bidDetails.professional?.firstname || ''} ${bidDetails.professional?.lastname || ''}`}
                    className="h-16 w-16 shrink-0 rounded-full border-2 border-zinc-700 object-cover sm:h-20 sm:w-20"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl font-bold text-white sm:text-2xl">
                    {bidDetails.professional?.firstname} {bidDetails.professional?.lastname}
                  </h1>
                  {bidDetails.professionalProfile?.tagline && (
                    <p className="mt-0.5 line-clamp-2 text-sm text-zinc-400">
                      {bidDetails.professionalProfile.tagline}
                    </p>
                  )}
                  {avgRating && (
                    <div className="mt-2 flex items-center gap-2">
                      <StarRating rating={Math.round(parseFloat(avgRating))} />
                      <span className="text-sm font-bold text-white">{avgRating}</span>
                      <span className="text-xs text-zinc-500">
                        ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── 2. Bid Amount ── */}
            <div className="rounded-2xl border border-[#32cd32]/25 bg-[#32cd32]/[0.07] px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#32cd32]/70">
                Bid Amount
              </p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-[#32cd32] sm:text-4xl">
                ₦ {Number(bidDetails.currentAmount || 0).toLocaleString()}
              </p>
            </div>

            {/* ── 3. Proposal ── */}
            {latestMessage && (
              <div className="rounded-2xl border border-zinc-800 bg-[#151518] p-5">
                <SectionHeader title="Proposal" subtitle="The professional's pitch for this job" />
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-300">
                  {latestMessage}
                </p>
              </div>
            )}

            {/* ── 4. Portfolio ── */}
            <PortfolioSection images={portfolioPictures} />

            {/* ── 5. Reviews ── */}
            <ReviewsSection reviews={reviews} />

            {/* ── 6. Job Details ── */}
            {bidDetails.job && (
              <div className="rounded-2xl border border-zinc-800 bg-[#151518] p-5">
                <SectionHeader
                  title="Job Details"
                  subtitle="Full description, budget, and requirements"
                />
                <div className="space-y-4">
                  {bidDetails.job.title && (
                    <div className="flex items-start gap-3">
                      <BriefcaseIcon className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600" />
                      <div>
                        <p className="text-xs text-zinc-600">Title</p>
                        <p className="text-sm font-semibold text-white">{bidDetails.job.title}</p>
                      </div>
                    </div>
                  )}

                  {bidDetails.job.address && (
                    <div className="flex items-start gap-3">
                      <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600" />
                      <div>
                        <p className="text-xs text-zinc-600">Location</p>
                        <p className="text-sm text-zinc-300">{bidDetails.job.address}</p>
                      </div>
                    </div>
                  )}

                  {bidDetails.job.description && (
                    <ExpandableDescription text={bidDetails.job.description} />
                  )}

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    {bidDetails.job.budget && (
                      <div className="rounded-xl bg-zinc-900/60 p-3">
                        <p className="text-xs text-zinc-600">Your Budget</p>
                        <p className="mt-0.5 text-lg font-bold text-white">
                          ₦ {Number(bidDetails.job.budget).toLocaleString()}
                        </p>
                      </div>
                    )}
                    {bidDetails.job.status && (
                      <div className="rounded-xl bg-zinc-900/60 p-3">
                        <p className="text-xs text-zinc-600">Status</p>
                        <p className="mt-0.5 text-sm font-semibold capitalize text-yellow-400">
                          {bidDetails.job.status}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfessionalOfferPage
