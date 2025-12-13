import Feed from './Components/Feed'
import BalanceCard from './Components/BalanceCard'
import StatCards from './Components/StatCards'
import QuickActions from './Components/QuickActions'
const HomePage = () => {
  return (
    <div className="mt-4 flex flex-col items-center space-y-6 pb-48">
      <BalanceCard />
      <StatCards />
      <QuickActions />
      <Feed />
    </div>
  )
}

export default HomePage
