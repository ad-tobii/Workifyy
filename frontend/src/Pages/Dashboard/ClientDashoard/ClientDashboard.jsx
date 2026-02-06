import TopBar from './TopBar'
import BottomBar from './BottomBar'
import HomePage from './HomePage/HomePage'
import { useEffect } from 'react'
import JobPage from './JobPage/JobPage'
import useClientStore from '../../../store/useClientStore'
import useDashboardStore from '../../../store/useDashboardStore'
const ClientDashboard = () => {
  const mainTab = useClientStore(state => state.mainTab)
  const getDashboardData = useDashboardStore(state => state.getDashboardData)

  useEffect(() => {
    getDashboardData()
  }, [getDashboardData])

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

export default ClientDashboard
