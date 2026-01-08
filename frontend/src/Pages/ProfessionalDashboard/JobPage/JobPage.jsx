import JobTabs from './Components/JobTabs'
import useProStore from '../../../store/proStore.store'

const JobPage = () => {
  const jobTab = useProStore(state => state.jobTab)

  return (
    <div className="mt-4 flex flex-col items-center space-y-6 pb-48 text-white">
      <JobTabs />
    </div>
  )
}

export default JobPage
