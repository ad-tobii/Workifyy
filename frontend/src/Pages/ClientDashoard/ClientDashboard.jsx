import Navbar from './Navbar'
import ProfileCard from './ProfileCard'
import DashboardFooter from './DashboardFooter'
import TabNavigation from './TabNavigation'
import GradientToImageSlider from './GradientToImageSlider'

const ClientDashboard = () => {
  return (
    <div className="min-h-screen text-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-8 md:grid-cols-3">
        {/* Left/Main Section */}
        <div className="flex flex-col md:col-span-2">
          <p className="mb-4 text-3xl xsMobile:text-[1.1rem] miniMobile:text-xl miniMobile:font-semibold mobile:text-xl miniTablet:text-2xl">
            Welcome back, Adekeye O.
          </p>

          <div className="mb-8">
            <GradientToImageSlider />
          </div>

          <div>
            <TabNavigation />
          </div>
        </div>

        {/* Right/Sidebar Section */}
        <div className="flex flex-col space-y-6 md:col-span-1">
          <div className="hidden lg:block">
            <ProfileCard />
          </div>
        </div>
      </div>

      {/* Footer */}
      <DashboardFooter />
    </div>
  )
}

export default ClientDashboard
