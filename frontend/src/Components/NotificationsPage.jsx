import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import {
  BellIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  XCircleIcon,
  ArrowsRightLeftIcon,
} from '@heroicons/react/24/outline'
import useNotificationStore from '../store/useNotificationStore'
import useUserStore from '../store/useUserStore'

const TYPE_CONFIG = {
  newBid:        { icon: CurrencyDollarIcon,   color: 'text-blue-400' },
  bidAccepted:   { icon: CheckCircleIcon,       color: 'text-green-400' },
  bidRejected:   { icon: XCircleIcon,           color: 'text-red-400' },
  bidWithdrawn:  { icon: XCircleIcon,           color: 'text-zinc-400' },
  counterOffer:  { icon: ArrowsRightLeftIcon,   color: 'text-amber-400' },
  workSubmitted: { icon: BriefcaseIcon,         color: 'text-yellow-400' },
  workAccepted:  { icon: CheckCircleIcon,       color: 'text-green-400' },
  redoRequested: { icon: ArrowPathIcon,         color: 'text-orange-400' },
  jobCancelled:  { icon: XCircleIcon,           color: 'text-red-400' },
  jobAwarded:    { icon: CheckCircleIcon,       color: 'text-green-400' },
}

const NotificationsPage = () => {
  const notifications = useNotificationStore(state => state.notifications)
  const unreadCount = useNotificationStore(state => state.unreadCount)
  const loading = useNotificationStore(state => state.loading)
  const markAsRead = useNotificationStore(state => state.markAsRead)
  const markAllAsRead = useNotificationStore(state => state.markAllAsRead)
  const deleteNotification = useNotificationStore(state => state.deleteNotification)
  const fetchNotifications = useNotificationStore(state => state.fetchNotifications)

  const user = useUserStore(state => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    fetchNotifications()
  }, [])

  const handleClick = async notification => {
    if (!notification.read) {
      await markAsRead(notification._id)
    }

    const { meta } = notification
    if (!meta) return

    if (user?.role === 'client') {
      if (meta.bidId) {
        navigate(`/Dashboard/clientdashboard/bids/${meta.bidId}`)
      } else if (meta.jobId) {
        navigate(`/Dashboard/clientdashboard/jobs/${meta.jobId}`)
      }
    } else if (user?.role === 'professional') {
      if (meta.jobId) {
        navigate(`/Dashboard/professionalDashboard/jobs/${meta.jobId}`)
      }
    }
  }

  if (loading && notifications.length === 0) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-[#32cd32]" />
      </div>
    )
  }

  return (
    <div className="mx-auto mt-4 w-[90%] pb-48">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Notifications</h2>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-xs font-medium text-[#32cd32] transition-colors hover:text-[#28a428]"
          >
            Mark all read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800">
            <BellIcon className="h-8 w-8 text-zinc-500" />
          </div>
          <p className="text-lg font-semibold text-white">No notifications yet</p>
          <p className="text-sm text-zinc-500">Activity on your jobs will appear here</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {notifications.map(notification => {
            const config = TYPE_CONFIG[notification.type] || { icon: BellIcon, color: 'text-zinc-400' }
            const Icon = config.icon

            return (
              <div
                key={notification._id}
                className={`relative flex w-full items-start gap-3 overflow-hidden rounded-2xl border transition-all hover:border-zinc-600 ${
                  notification.read
                    ? 'border-zinc-800 bg-[#1a1a1d]'
                    : 'border-zinc-700 bg-[#1f1f23]'
                }`}
              >
                {/* Unread accent */}
                {!notification.read && (
                  <div className="absolute left-0 top-0 h-full w-1 bg-[#32cd32]" />
                )}

                {/* Clickable body */}
                <button
                  onClick={() => handleClick(notification)}
                  className="flex min-w-0 flex-1 items-start gap-3 p-4 text-left"
                >
                  {/* Icon */}
                  <div className={`mt-0.5 shrink-0 ${config.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm leading-snug ${notification.read ? 'text-zinc-400' : 'font-medium text-white'}`}>
                      {notification.message}
                    </p>
                    <p className="mt-1 text-xs text-zinc-600">
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </p>
                  </div>

                  {/* Unread dot */}
                  {!notification.read && (
                    <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#32cd32]" />
                  )}
                </button>

                {/* Delete button */}
                <button
                  onClick={e => { e.stopPropagation(); deleteNotification(notification._id) }}
                  className="shrink-0 self-start p-3 text-zinc-600 transition-colors hover:text-red-400"
                  aria-label="Delete notification"
                >
                  <XCircleIcon className="h-4 w-4" />
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default NotificationsPage
