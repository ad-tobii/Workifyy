import JobTabs from './Components/JobTabs'
import { useState } from 'react'
import PostJobPage from './PostJobPage/PostJob'

const JobPage = () => {
  const [activeTab, setActiveTab] = useState('')
  return (
    <div className="mt-4 flex flex-col items-center space-y-6 pb-48 text-white">
      <JobTabs setActiveTab={setActiveTab} activeTab={activeTab} />

      {activeTab === 'Post Jobs' && <PostJobPage />}
    </div>
  )
}

export default JobPage
