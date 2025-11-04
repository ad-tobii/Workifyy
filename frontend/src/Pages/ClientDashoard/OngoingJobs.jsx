import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const OngoingJobs = () => {
  const fullDescription =
    "Need Social media Assistant to provide administrative support remotely. Responsibilities include managing schedules and handling correspondence. Requirements: Proven experience as a Virtual Assistant or similar role. Strong organizational and communication skills. If you meet these requirements and are adept.";

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  const wordsLimit = 30;
  const trimmedDescription = fullDescription
    .split(" ")
    .slice(0, wordsLimit)
    .join(" ");

  return (
    <div className="group w-[50.5rem] transition-colors duration-300 hover:bg-[#1a1a1a] xsMobile:w-[15.5rem] miniMobile:w-[18.5rem] mobile:w-[22rem] miniTablet:w-[20.5rem] tablet:w-[26.5rem] miniLaptop:w-[30.5rem] laptop:w-[33.5rem] desktop:w-[33.5rem]">
      <div className="space-y-6 p-6 text-white">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <img
              src="/assets/black-worker.jpg"
              className="h-14 w-14 rounded-full object-cover"
            />
            <p className="text-lg text-[#32cd32] transition-colors duration-300 group-hover:text-white">
              Hassan Mustapha
            </p>
          </div>
          <h2 className="cursor-pointer text-xl font-semibold transition-colors duration-300 hover:underline group-hover:text-[#32cd32]">
            New project for freelancers
          </h2>

          <div className="relative">
            <p className="text-gray-200">
              {showFullDescription
                ? fullDescription
                : `${trimmedDescription}...`}
            </p>
            {fullDescription.split(" ").length > wordsLimit && (
              <button
                onClick={toggleDescription}
                className="mt-2 flex items-center text-[#32cd32] transition-colors duration-300 hover:underline"
              >
                {showFullDescription ? (
                  <>
                    Less <ChevronUp className="ml-1 h-4 w-4" />
                  </>
                ) : (
                  <>
                    More <ChevronDown className="ml-1 h-4 w-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-between space-y-2 text-gray-300 sm:flex-row sm:space-y-0">
          <p>
            Fee: <span className="font-semibold">₦ 15,975</span>
          </p>
          <p>
            Payment:{" "}
            <span className="font-semibold text-yellow-400">Pending</span>
          </p>
          <p>
            Deadline:
            <span className="font-semibold text-red-400">
              {" "}
              Thursday 13th of Sept
            </span>
          </p>
        </div>

        <button className="w-full rounded-lg bg-red-600 px-6 py-2 font-medium text-white transition duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 sm:w-auto">
          Cancel
        </button>
      </div>
      <hr className="h-[0.08rem] w-[50.5rem] border-0 bg-[#2e2e2e] xsMobile:w-[15.5rem] miniMobile:w-[18.5rem] mobile:w-[22rem] miniTablet:w-[20.5rem] tablet:w-[26.5rem] miniLaptop:w-[30.5rem] laptop:w-[33.5rem] desktop:w-[33.5rem]" />
    </div>
  );
};

export default OngoingJobs;
