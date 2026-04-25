import TopBar from './TopBar'
import BottomBar from './BottomBar'
import HomePage from './HomePage/HomePage'
import JobPage from './JobPage/JobPage'
import NotificationsPage from '../../../Components/NotificationsPage'
import { useEffect } from 'react'

import useProStore from '../../../store/useProStore'
import useDashboardStore from '../../../store/useDashboardStore'
import useJobStore from '../../../store/useJobStore'
import useNotificationStore from '../../../store/useNotificationStore'

const ProfessionalDashboard = () => {
  const mainTab = useProStore(state => state.mainTab)

  useEffect(() => {
    const init = async () => {
      await useDashboardStore.getState().getProDashboardData()
      useJobStore.getState().fetchOngoingJobs()
    }
    init()
    useNotificationStore.getState().fetchNotifications()
  }, [])

  return (
    <div className="min-h-screen bg-[#0f0f10]">
      <TopBar />
      <div>
        {mainTab === 'home' && <HomePage />}
        {mainTab === 'jobs' && <JobPage />}
        {mainTab === 'notifications' && <NotificationsPage />}
      </div>

      <BottomBar />
    </div>
  )
}

export default ProfessionalDashboard
