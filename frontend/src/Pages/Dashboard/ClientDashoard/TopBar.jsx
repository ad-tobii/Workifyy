import {
  BellIcon,
  BriefcaseIcon,
  CreditCardIcon,
  QuestionMarkCircleIcon,
  HomeIcon,
} from '@heroicons/react/24/outline'
import { MapPinIcon } from '@heroicons/react/24/solid'
import useClientStore from '../../../store/useClientStore'
import useNotificationStore from '../../../store/useNotificationStore'

const TopBar = () => {
  return (
    <div className="z-50 h-20 w-full sm:h-16">
      {/* TopBar on Mobile screens */}
      <div className="flex sm:hidden">
        <MobileTopBar />
      </div>

      {/* TopBar on large screens */}
      <div className="hidden sm:flex">
        <LargeTopBar />
      </div>
    </div>
  )
}

const LargeTopBar = () => {
  const setMainTab = useClientStore(state => state.setMainTab)
  const unreadCount = useNotificationStore(state => state.unreadCount)
  return (
    <div className="fixed z-50 flex w-full justify-between bg-[#0f0f10] px-6 py-4">
      {/* Logo */}
      <div className="">
        <img src="/assets/workifyy-logo.png" alt="logo" className="w-44" />
      </div>

      {/* Desktop Nav Right Side */}
      <div className="flex items-center space-x-10 text-white">
        <button onClick={() => setMainTab('home')}>
          <HomeIcon className="h-6 w-6 transition-colors duration-200 hover:text-[#32cd32]" />
        </button>

        <button onClick={() => setMainTab('help')}>
          <QuestionMarkCircleIcon className="h-6 w-6 transition-colors duration-200 hover:text-[#32cd32]" />
        </button>

        <button onClick={() => setMainTab('wallet')}>
          <CreditCardIcon className="h-6 w-6 transition-colors duration-200 hover:text-[#32cd32]" />
        </button>

        <button onClick={() => setMainTab('jobs')}>
          <BriefcaseIcon className="h-6 w-6 transition-colors duration-200 hover:text-[#32cd32]" />
        </button>

        {/* Notification Icon */}
        <button onClick={() => setMainTab('notifications')} className="group relative">
          <BellIcon className="h-6 w-6 transition-colors duration-200 group-hover:text-[#32cd32]" />
          {unreadCount > 0 && (
            <p className="absolute right-0 top-0 h-4 w-4 rounded-full bg-[#32cd32] text-center text-xs font-semibold text-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </p>
          )}
        </button>

        {/* Profile Icon */}
        <div className="group relative">
          <img
            src="/assets/black-worker.jpg"
            alt="profile"
            className="h-9 w-9 rounded-full object-cover"
          />
          <div className="absolute inset-0 top-0 hidden w-full rounded-full bg-black opacity-55 group-hover:inline"></div>
        </div>
      </div>
    </div>
  )
}

const MobileTopBar = () => {
  const setMainTab = useClientStore(state => state.setMainTab)
  const unreadCount = useNotificationStore(state => state.unreadCount)
  return (
    <div className="fixed z-50 flex w-full justify-between bg-[#0f0f10] px-6 py-4">
      {/* Left side */}
      <div className="flex space-x-2">
        <img
          src="/assets/black-worker.jpg"
          alt="profile"
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <span className="text-sm text-zinc-400">Good evening!</span>
          <span className="flex text-white">
            <MapPinIcon className="h-5 w-5 text-[#32cd32]" /> Fagge, Kano.
          </span>
        </div>
      </div>

      <button
        onClick={() => setMainTab('notifications')}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-zinc-500"
      >
        <BellIcon className="h-8 w-8 text-white" />
        {unreadCount > 0 && (
          <p className="absolute bottom-3 right-0 h-4 w-4 rounded-full bg-[#32cd32] text-center text-xs text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </p>
        )}
      </button>
    </div>
  )
}

export default TopBar
