import { BellAlertIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const JobCard = () => {
  const navigate = useNavigate();
  const handleJobNav = () => {
    navigate("/dashboard/clientdashboard/Jobmanagement");
  };
  return (
    <div
      className="w-[50.5rem] cursor-pointer hover:bg-[#1a1a1a] xsMobile:w-[15.5rem] miniMobile:w-[18.5rem] mobile:w-[22rem] miniTablet:w-[20.5rem] tablet:w-[26.5rem] miniLaptop:w-[30.5rem] laptop:w-[33.5rem] desktop:w-[33.5rem]"
      onClick={() => handleJobNav()}
    >
      <div className="space-y-3 p-6 text-white shadow-lg">
        <div className="flex items-start justify-between">
          {/* Posted time */}
          <span className="text-sm text-gray-400">Posted yesterday</span>
          <div className="flex space-x-2 text-[#32cd32]">
            {/* Icons */}

            <button className="flex rounded bg-red-600 px-4 py-1 text-xs text-white hover:bg-white hover:text-red-600 sm:px-6 sm:py-2 sm:text-sm">
              <span>New bid</span>
              <BellAlertIcon className="h-5 w-5 pl-1 xsMobile:h-7 xsMobile:w-7" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl text-[#eaeaea]">
          <a className="hover:text-[#32cd32] hover:underline">
            New project for new freelancers
          </a>
        </h2>

        {/* Details */}
        <p className="text-sm text-gray-400">
          Fixed-price - Entry level - Est. Budget: $6
        </p>

        {/* Job Description */}
        <p className="leading-relaxed text-[#eaeaea]">
          Need Social media Assistant to provide administrative support
          remotely. Responsibilities include managing schedules and handling
          correspondence. Requirements: Proven experience as a Virtual Assistant
          or similar role. Strong organizational and communication skills. If
          you meet these requirements and are adept.
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-[#323232] px-2 py-1 text-xs sm:px-3 sm:text-sm md:text-base">
            Data Entry
          </span>
          <span className="rounded-full bg-[#323232] px-2 py-1 text-xs sm:px-3 sm:text-sm md:text-base">
            Data Analysis Consultation
          </span>
          <span className="rounded-full bg-[#323232] px-2 py-1 text-xs sm:px-3 sm:text-sm md:text-base">
            Data Analytics
          </span>
        </div>

        {/* Client Info */}
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <div className="flex items-center">
            <span>●</span>
            <span className="ml-1">₦0.00 spent</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>●</span>
            <span>fagge, kano</span>
          </div>
        </div>

        {/* Proposals */}
        <div className="text-sm text-gray-400">
          Bids: <span className="text-[#32cd32]">37</span>
        </div>
      </div>
      <hr className="h-[0.08rem] w-[50.5rem] border-0 bg-[#323232] xsMobile:w-[15.5rem] miniMobile:w-[18.5rem] mobile:w-[22rem] miniTablet:w-[20.5rem] tablet:w-[26.5rem] miniLaptop:w-[30.5rem] laptop:w-[33.5rem] desktop:w-[33.5rem]" />
    </div>
  );
};

export default JobCard;
