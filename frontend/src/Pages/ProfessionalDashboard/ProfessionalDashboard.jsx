import TopBar from './TopBar'
import BottomBar from './BottomBar'
import HomePage from './HomePage/HomePage'
import JobPage from './JobPage/JobPage'
import { useEffect } from 'react'

import useProStore from '../../store/proStore.store'
import useDashboardStore from '../../store/dashboardStore.store'
const ProfessionalDashboard = () => {
  const mainTab = useProStore(state => state.mainTab)
  const getProDashboardData = useDashboardStore(state => state.getProDashboardData)

  useEffect(() => {
    getProDashboardData()
  }, [getProDashboardData])

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
