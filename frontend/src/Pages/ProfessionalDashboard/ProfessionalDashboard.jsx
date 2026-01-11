import TopBar from './TopBar'
import BottomBar from './BottomBar'
import HomePage from './HomePage/HomePage'
import JobPage from './JobPage/JobPage'
import { useEffect } from 'react'
import { watchLocation } from '../../utils/geoLocation.utils'

import useProStore from '../../store/proStore.store'
import useDashboardStore from '../../store/dashboardStore.store'

import useSocketStore from '../../store/useSocket.store'
const ProfessionalDashboard = () => {
  const mainTab = useProStore(state => state.mainTab)

  // To Do : implement loader for all screens.
  useEffect(() => {
    useDashboardStore.getState().getProDashboardData()
    useSocketStore.getState().initializeSocket()

    const id = watchLocation()

    return () => {
      useSocketStore.getState().cleanup()
      navigator.geolocation.clearWatch(id)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#0f0f10]">
      <TopBar />
      <div>
        {mainTab === 'home' && <HomePage />}
        {mainTab === 'jobs' && <JobPage />}
      </div>

      <BottomBar />
    </div>
  )
}

export default ProfessionalDashboard
