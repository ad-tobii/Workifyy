import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  ArrowRightOnRectangleIcon,
  BriefcaseIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  PencilSquareIcon,
  StarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid'
import useProfileStore from '../../../store/useProfileStore'
import useUserStore from '../../../store/useUserStore'

const currency = value => `₦${Number(value || 0).toLocaleString()}`

const formatDate = value => {
  if (!value) return 'Not available'
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

const fullName = user => `${user?.firstname || ''} ${user?.lastname || ''}`.trim() || 'Workifyy user'

const ProfilePage = ({ role }) => {
  const fetchProfile = useProfileStore(state => state.fetchProfile)
  const profileData = useProfileStore(state => state.profileData)
  const loading = useProfileStore(state => state.loading)
  const error = useProfileStore(state => state.error)

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  if (loading && !profileData) {
    return (
      <ProfileShell>
        <div className="flex min-h-[60vh] items-center justify-center text-zinc-400">
          Loading profile...
        </div>
      </ProfileShell>
    )
  }

  if (error && !profileData) {
    return (
      <ProfileShell>
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
          <p className="text-red-400">{error}</p>
          <button
            onClick={fetchProfile}
            className="rounded-xl bg-[#32cd32] px-5 py-2 text-sm font-semibold text-white"
          >
            Try again
          </button>
        </div>
      </ProfileShell>
    )
  }

  if (role === 'professional') {
    return <ProfessionalProfile data={profileData} />
  }

  return <ClientProfile data={profileData} />
}

const ProfileShell = ({ children }) => (
  <main className="mx-auto w-[92%] max-w-6xl pb-32 pt-6 text-white sm:pb-12 sm:pt-10">
    {children}
  </main>
)

const ProfileHeader = ({ data, subtitle }) => {
  const photo = data?.profile?.photo
  const user = data?.user

  return (
    <section className="rounded-2xl border border-zinc-800/80 bg-[#151518] p-5 shadow-xl shadow-black/20 sm:p-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          {photo ? (
            <img
              src={photo}
              alt={fullName(user)}
              className="h-20 w-20 rounded-2xl object-cover ring-2 ring-zinc-800"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-zinc-800 text-zinc-400">
              <UserCircleIcon className="h-12 w-12" />
            </div>
          )}
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#32cd32]">
              {user?.role || 'Profile'}
            </p>
            <h1 className="mt-1 truncate text-2xl font-bold text-gray-100 sm:text-3xl">
              {fullName(user)}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">{subtitle}</p>
          </div>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 px-4 py-3">
          <p className="text-xs text-zinc-500">Member since</p>
          <p className="mt-1 text-sm font-semibold text-zinc-200">{formatDate(user?.memberSince)}</p>
          <p className="text-xs text-zinc-500">{user?.accountAge || 'New member'}</p>
        </div>
      </div>
    </section>
  )
}

const InfoGrid = ({ items }) => (
  <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
    {items.map(item => (
      <div key={item.label} className="rounded-2xl border border-zinc-800/80 bg-[#151518] p-4">
        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800 text-[#32cd32]">
          <item.icon className="h-5 w-5" />
        </div>
        <p className="text-xs text-zinc-500">{item.label}</p>
        <p className="mt-1 break-words text-sm font-semibold text-zinc-100">{item.value}</p>
      </div>
    ))}
  </section>
)

const StatGrid = ({ stats }) => (
  <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
    {stats.map(stat => (
      <div key={stat.label} className="rounded-2xl border border-zinc-800/80 bg-[#151518] p-4">
        <p className={`text-2xl font-bold ${stat.highlight ? 'text-[#32cd32]' : 'text-gray-100'}`}>
          {stat.value}
        </p>
        <p className="mt-1 text-sm text-zinc-500">{stat.label}</p>
      </div>
    ))}
  </section>
)

const Section = ({ title, children }) => (
  <section className="rounded-2xl border border-zinc-800/80 bg-[#151518] p-5">
    <h2 className="mb-4 text-lg font-semibold text-gray-100">{title}</h2>
    {children}
  </section>
)

const LogoutButton = () => {
  const navigate = useNavigate()
  const logout = useUserStore(state => state.logout)
  const loading = useUserStore(state => state.loading.logout)
  const resetProfile = useProfileStore(state => state.resetProfile)

  const handleLogout = async () => {
    const result = await logout()
    if (result.success) {
      resetProfile()
      navigate('/auth/signin', { replace: true })
    } else {
      toast.error(result.error || 'Logout failed')
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm font-semibold text-red-300 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <ArrowRightOnRectangleIcon className="h-5 w-5" />
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  )
}

const ClientProfile = ({ data }) => {
  const user = data?.user
  const profile = data?.profile || {}
  const stats = data?.stats || {}

  return (
    <ProfileShell>
      <div className="space-y-5">
        <ProfileHeader data={data} subtitle="Your hiring profile and account activity." />
        <InfoGrid
          items={[
            { label: 'Name', value: fullName(user), icon: UserCircleIcon },
            { label: 'Email', value: user?.email || 'Not available', icon: UserCircleIcon },
            { label: 'Location', value: profile.location || 'Location on file', icon: MapPinIcon },
          ]}
        />
        <StatGrid
          stats={[
            { label: 'Jobs posted', value: stats.jobsPosted || 0, highlight: true },
            { label: 'Completed jobs', value: stats.completedJobs || 0 },
            { label: 'Active jobs', value: stats.activeJobs || 0 },
            { label: 'Spending summary', value: currency(stats.spendingTotal), highlight: true },
          ]}
        />
        <Section title="Languages">
          <PillList items={profile.languages} emptyText="No languages added yet." />
        </Section>
        <LogoutButton />
      </div>
    </ProfileShell>
  )
}

const ProfessionalProfile = ({ data }) => {
  const user = data?.user
  const profile = data?.profile || {}
  const stats = data?.stats || {}
  const rating = stats.rating || { average: 0, count: 0 }

  return (
    <ProfileShell>
      <div className="space-y-5">
        <ProfileHeader data={data} subtitle="Your professional profile, portfolio, and work history." />
        <TaglineEditor tagline={profile.tagline} />
        <InfoGrid
          items={[
            { label: 'Name', value: fullName(user), icon: UserCircleIcon },
            { label: 'Email', value: user?.email || 'Not available', icon: UserCircleIcon },
            { label: 'Experience', value: `${profile.experience || 0} years`, icon: CalendarDaysIcon },
          ]}
        />
        <StatGrid
          stats={[
            { label: 'Overall rating', value: `${rating.average || 0}/5`, highlight: true },
            { label: 'Reviews', value: rating.count || 0 },
            { label: 'Jobs completed', value: stats.jobsCompleted || 0 },
            { label: 'Earnings summary', value: currency(stats.earningsTotal), highlight: true },
          ]}
        />
        <StatGrid
          stats={[
            { label: 'Active proposals', value: stats.activeProposals || 0 },
            { label: 'Ongoing contracts', value: stats.ongoingContracts || 0 },
          ]}
        />
        <Section title="Skills and specializations">
          <PillList items={profile.expertise} emptyText="No skills added yet." />
        </Section>
        <Section title="Portfolio">
          <PortfolioGrid images={profile.portfolioPictures} />
        </Section>
        <Section title="Reviews">
          <RatingSummary average={rating.average} count={rating.count} reviews={profile.reviews} />
        </Section>
        <LogoutButton />
      </div>
    </ProfileShell>
  )
}

const TaglineEditor = ({ tagline = '' }) => {
  const updateTagline = useProfileStore(state => state.updateTagline)
  const updating = useProfileStore(state => state.updatingTagline)
  const [draft, setDraft] = useState(tagline)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    setDraft(tagline)
  }, [tagline])

  const hasChanges = draft.trim() !== tagline.trim()

  const handleSave = async () => {
    const result = await updateTagline(draft)
    if (result.success) {
      toast.success('Tagline updated')
      setIsEditing(false)
    } else {
      toast.error(result.error)
    }
  }

  return (
    <section className="rounded-2xl border border-zinc-800/80 bg-[#151518] p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-gray-100">Tagline</h2>
        <button
          onClick={() => setIsEditing(value => !value)}
          className="flex items-center gap-2 rounded-xl bg-zinc-800 px-3 py-2 text-xs font-semibold text-zinc-200 hover:bg-zinc-700"
        >
          <PencilSquareIcon className="h-4 w-4" />
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>
      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={draft}
            onChange={event => setDraft(event.target.value)}
            maxLength={120}
            className="min-h-24 w-full resize-none rounded-2xl border border-zinc-700 bg-zinc-950/60 p-4 text-sm text-zinc-100 outline-none transition focus:border-[#32cd32]"
          />
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-zinc-500">{draft.length}/120</span>
            <button
              onClick={handleSave}
              disabled={!hasChanges || updating}
              className="rounded-xl bg-[#32cd32] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#2eb82e] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {updating ? 'Saving...' : 'Save tagline'}
            </button>
          </div>
        </div>
      ) : (
        <p className="text-sm leading-6 text-zinc-300">{tagline || 'No tagline added yet.'}</p>
      )}
    </section>
  )
}

const PillList = ({ items = [], emptyText }) => {
  if (!items.length) {
    return <p className="text-sm text-zinc-500">{emptyText}</p>
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map(item => (
        <span
          key={item}
          className="rounded-full border border-[#32cd32]/30 bg-[#32cd32]/10 px-3 py-1.5 text-sm text-[#32cd32]"
        >
          {item}
        </span>
      ))}
    </div>
  )
}

const PortfolioGrid = ({ images = [] }) => {
  if (!images.length) {
    return <p className="text-sm text-zinc-500">Completed work samples will appear here.</p>
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((image, index) => (
        <img
          key={`${image}-${index}`}
          src={image}
          alt={`Work sample ${index + 1}`}
          className="aspect-[4/3] w-full rounded-2xl border border-zinc-800 object-cover"
        />
      ))}
    </div>
  )
}

const RatingSummary = ({ average = 0, count = 0, reviews = [] }) => {
  const recentReviews = useMemo(() => reviews.slice(0, 3), [reviews])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 text-yellow-400">
          {Array.from({ length: 5 }).map((_, index) =>
            index < Math.round(average) ? (
              <SolidStarIcon key={index} className="h-5 w-5" />
            ) : (
              <StarIcon key={index} className="h-5 w-5" />
            )
          )}
        </div>
        <span className="text-sm text-zinc-400">
          {average || 0} from {count || 0} review{count === 1 ? '' : 's'}
        </span>
      </div>

      {recentReviews.length ? (
        <div className="space-y-3">
          {recentReviews.map(review => (
            <div key={review._id || review.createdAt} className="rounded-2xl bg-zinc-950/40 p-4">
              <div className="mb-1 flex items-center justify-between gap-3 text-sm">
                <span className="font-semibold text-zinc-200">{review.clientName || 'Client'}</span>
                <span className="text-yellow-400">{review.rating}/5</span>
              </div>
              <p className="text-sm leading-6 text-zinc-400">{review.review || 'No written review.'}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-zinc-500">No reviews yet.</p>
      )}
    </div>
  )
}

export default ProfilePage
