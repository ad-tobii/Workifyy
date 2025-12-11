import TopBar from './TopBar'
import BottomBar from './BottomBar'
import HomePage from './HomePage/HomePage'
const ProfessionalDashboard = () => {
  return (
    <div className="min-h-screen bg-[#0f0f10]">
      <TopBar />
      <HomePage />
      <BottomBar />
    </div>
  )
}

export default ProfessionalDashboard
