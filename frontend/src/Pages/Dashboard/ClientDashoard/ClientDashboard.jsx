import TopBar from './TopBar'
import BottomBar from './BottomBar'
import HomePage from './HomePage/HomePage'
import { useEffect } from 'react'
import JobPage from './JobPage/JobPage'
import NotificationsPage from '../../../Components/NotificationsPage'
import ProfilePage from '../Components/ProfilePage'
import useClientStore from '../../../store/useClientStore'
import useDashboardStore from '../../../store/useDashboardStore'
import useNotificationStore from '../../../store/useNotificationStore'

const ClientDashboard = () => {
  const mainTab = useClientStore(state => state.mainTab)
  const getDashboardData = useDashboardStore(state => state.getDashboardData)

  useEffect(() => {
    getDashboardData()
    useNotificationStore.getState().fetchNotifications()
  }, [getDashboardData])

  return (
    <div className="min-h-screen bg-[#0f0f10]">
      <TopBar />
      <div>
        {mainTab === 'home' && <HomePage />}
        {mainTab === 'jobs' && <JobPage />}
        {mainTab === 'notifications' && <NotificationsPage />}
        {mainTab === 'profile' && <ProfilePage role="client" />}
      </div>

      <BottomBar />
    </div>
  )
}

export default ClientDashboard
