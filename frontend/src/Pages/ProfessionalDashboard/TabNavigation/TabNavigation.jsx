import React, { useState } from "react";
import JobCard from "../Feeds/JobCard";
import OngoingJobs from "../Feeds/OngoingJobs";
import BidCard from "../Feeds/BidCard";
import { sampleBid } from "../Feeds/BidCard";

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState("Jobs");

  const tabs = ["Jobs", "Ongoing Jobs", "Bids"];

  return (
    <div className="">
      <nav className="flex">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-2 py-2 text-lg font-medium ${
              activeTab === tab
                ? "text-[#32cd32]"
                : "text-[#8b8682] hover:text-[#32cd32]"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Animated underline */}
      {activeTab === "Jobs" && (
        <div className="flex space-x-2 transition-all duration-300 ease-in-out">
          <hr className="h-[0.18rem] w-[3.5rem] rounded-full border-0 bg-[#32cd32]" />
          <hr className="h-[0.18rem] w-[46.5rem] rounded-full border-0 bg-[#323232] xsMobile:w-[11.5rem] miniMobile:w-[14.5rem] mobile:w-[18rem] miniTablet:w-[16.5rem] tablet:w-[22.5rem] miniLaptop:w-[26.5rem] laptop:w-[29.5rem] desktop:w-[29.5rem]" />
        </div>
      )}
      {activeTab === "Ongoing Jobs" && (
        <div className="flex space-x-1 transition-all duration-300 ease-in-out">
          <hr className="h-[0.18rem] w-[3.5rem] rounded-full border-0 bg-[#323232]" />
          <hr className="h-[0.18rem] w-[9rem] rounded-full border-0 bg-[#32cd32]" />
          <hr className="h-[0.18rem] w-[37.5rem] rounded-full border-0 bg-[#323232] xsMobile:w-[2.5rem] miniMobile:w-[5.5rem] mobile:w-[9rem] miniTablet:w-[7.5rem] tablet:w-[13.5rem] miniLaptop:w-[17.5rem] laptop:w-[20.5rem] desktop:w-[20.5rem]" />
        </div>
      )}
      {activeTab === "Bids" && (
        <div className="flex space-x-1 transition-all duration-300 ease-in-out">
          <hr className="h-[0.18rem] w-[12.5rem] rounded-full border-0 bg-[#323232]" />
          <hr className="h-[0.18rem] w-[3.5rem] rounded-full border-0 bg-[#32cd32] xsMobile:w-[2.5rem]" />
          <hr className="h-[0.18rem] w-[34rem] rounded-full border-0 bg-[#323232] xsMobile:hidden miniMobile:w-[2rem] mobile:w-[5.5rem] miniTablet:w-[4rem] tablet:w-[10rem] miniLaptop:w-[13.5rem] laptop:w-[17.5rem] desktop:w-[17rem]" />
        </div>
      )}

      {/* Rendering content based on the active tab */}
      <div className="">
        {activeTab === "Jobs" && (
          <div className="flex flex-col text-white">
            <p className="m-4 text-[#a9a8a7]">Browse jobs near you.</p>
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <hr className="h-[0.08rem] w-[50.5rem] border-0 bg-[#2e2e2e] xsMobile:w-[15.5rem] miniMobile:w-[18.5rem] mobile:w-[22rem] miniTablet:w-[20.5rem] tablet:w-[26.5rem] miniLaptop:w-[30.5rem] laptop:w-[33.5rem] desktop:w-[33.5rem]" />
          </div>
        )}
        {activeTab === "Ongoing Jobs" && (
          <div className="flex flex-col text-white">
            <p className="m-4 text-[#a9a8a7]">Browse ongoing Jobs.</p>
            <hr className="h-[0.08rem] w-[50.5rem] border-0 bg-[#2e2e2e] xsMobile:w-[15.5rem] miniMobile:w-[18.5rem] mobile:w-[17rem] miniTablet:w-[20.5rem] tablet:w-[26.5rem] miniLaptop:w-[30.5rem] laptop:w-[33.5rem] desktop:w-[33.5rem]" />
            <OngoingJobs />
            <OngoingJobs />
            <OngoingJobs />
          </div>
        )}
        {activeTab === "Bids" && (
          <div className="flex flex-col">
            <p className="m-4 text-[#a9a8a7]">View and manage Bids.</p>
            <hr className="h-[0.08rem] w-[50.5rem] border-0 bg-[#2e2e2e] xsMobile:w-[15.5rem] miniMobile:w-[18.5rem] mobile:w-[17rem] miniTablet:w-[20.5rem] tablet:w-[26.5rem] miniLaptop:w-[30.5rem] laptop:w-[33.5rem] desktop:w-[33.5rem]" />
            <BidCard bid={sampleBid} />
            <BidCard bid={sampleBid} />
            <BidCard bid={sampleBid} />
            <p>Bids content goes here...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabNavigation;
