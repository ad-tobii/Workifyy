import TopBar from './TopBar'
import BottomBar from './BottomBar'
import HomePage from './HomePage/HomePage'
import JobPage from './JobPage/JobPage'
import useClientStore from '../../store/clientStore.store'
const ClientDashboard = () => {
  const mainTab = useClientStore(state => state.mainTab)
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
