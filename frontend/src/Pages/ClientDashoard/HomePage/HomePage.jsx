import Feed from './Components/Feed'
import BalanceCard from './Components/BalanceCard'
import QuickActions from './Components/QuickActions'
import PostJobCta from './Components/PostJobCTA'
import React from 'react'
const HomePage = () => {
  return (
    <div className="mt-4 flex flex-col items-center space-y-6 pb-48">
      <BalanceCard />
      <div className="flex w-full justify-center pt-6">
        <PostJobCta />
      </div>

      <QuickActions />
      <Feed />
    </div>
  )
}

export default HomePage
