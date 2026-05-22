import {
  CreditCardIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  BriefcaseIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import useProStore from '../../../store/useProStore'

const BottomBar = () => {
  const setMainTab = useProStore(state => state.setMainTab)

  return (
    <div className="fixed bottom-12 left-1/2 flex h-20 w-[90%] -translate-x-1/2 justify-between rounded-3xl border border-white/10 bg-white/5 px-4 py-4 text-white shadow-lg shadow-black/20 backdrop-blur-lg sm:hidden">
      <HomeIcon
        onClick={() => setMainTab('home')}
        className="h-10 w-10 transition-colors duration-200 hover:text-[#32cd32]"
      />
      <BriefcaseIcon
        onClick={() => setMainTab('jobs')}
        className="h-10 w-10 transition-colors duration-200 hover:text-[#32cd32]"
      />
      <CreditCardIcon
        onClick={() => setMainTab('wallet')}
        className="h-10 w-10 transition-colors duration-200 hover:text-[#32cd32]"
      />
      <QuestionMarkCircleIcon
        onClick={() => setMainTab('help')}
        className="h-10 w-10 transition-colors duration-200 hover:text-[#32cd32]"
      />
      <UserCircleIcon
        onClick={() => setMainTab('profile')}
        className="h-10 w-10 transition-colors duration-200 hover:text-[#32cd32]"
      />
    </div>
  )
}

export default BottomBar
