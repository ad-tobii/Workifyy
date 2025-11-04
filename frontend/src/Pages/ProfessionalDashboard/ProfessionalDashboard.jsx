import Navbar from "./Header/Navbar";
// import ProfileCard from "./ProfileCard";
import DashboardFooter from "./Footer/Footer";
import TabNavigation from "./TabNavigation/TabNavigation";

import GradientToImageSlider from "./GradientImageSlider/GradientToImageSlider";
const ProfessionalDashboard = () => {
  return (
    <div className="container">
      <Navbar />
      <div className="mt-8 flex justify-between px-9">
        <div className="flex flex-col">
          <div className="text-white">
            <p className="h-32 text-3xl xsMobile:text-[1.1rem] miniMobile:text-xl miniMobile:font-semibold mobile:text-xl miniTablet:text-2xl">
              Welcome back, Adekeye O.
            </p>
          </div>
          <div className="-mt-16">
            <GradientToImageSlider />
          </div>

          <div className="mt-8 flex flex-col">
            <p className="text-2xl text-white">Job feed</p>
            <div className="-ml-2">
              <TabNavigation />
            </div>
          </div>
        </div>

        {/* Profile Card */}
        {/* <div className="xsMobile:hidden miniMobile:hidden mobile:hidden miniTablet:hidden tablet:hidden miniLaptop:hidden laptop:hidden">
          {" "}
          <ProfileCard />
        </div> */}
      </div>

      <DashboardFooter />
    </div>
  );
};

export default ProfessionalDashboard;
