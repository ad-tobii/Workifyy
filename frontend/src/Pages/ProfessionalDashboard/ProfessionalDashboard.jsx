import TopBar from './TopBar'
import BottomBar from './BottomBar'
import HomePage from './HomePage/HomePage'
import JobPage from './JobPage/JobPage'
import { useState } from 'react'
const ProfessionalDashboard = () => {
  const [activeTab, setActiveTab] = useState('home')
  return (
    <div className="min-h-screen bg-[#0f0f10]">
      <TopBar />
      <div>
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'jobs' && <JobPage />}
      </div>

      <BottomBar setActiveTab={setActiveTab} />
    </div>
  )
}

export default ProfessionalDashboard
