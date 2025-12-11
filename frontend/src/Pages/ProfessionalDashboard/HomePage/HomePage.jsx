import React from 'react'
import BalanceCard from './Components/BalanceCard'
import StatCards from './Components/StatCards'
import QuickActions from './Components/QuickActions'
const HomePage = () => {
  return (
    <div className="flex flex-col items-center space-y-6">
      <BalanceCard />
      <StatCards />
      <QuickActions />
    </div>
  )
}

export default HomePage
