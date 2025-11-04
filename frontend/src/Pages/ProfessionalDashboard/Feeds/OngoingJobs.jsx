import { useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
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
          <p className="text-sm text-gray-400">Accepted today</p>
          <div className="flex xsMobile:flex-col xsMobile:space-y-4 miniMobile:flex-col miniMobile:space-y-4 mobile:flex-col mobile:space-y-4 miniTablet:flex-col miniTablet:space-y-4 tablet:flex-col tablet:space-y-4 miniLaptop:flex-col miniLaptop:space-y-4 laptop:flex-col laptop:space-y-4 largeDesktop:space-x-5">
            <div className="flex h-32 w-full items-center justify-center lg:w-1/3">
              <img
                src="/assets/portfolio1.jpg"
                alt="Job"
                className="h-full w-full rounded-md object-cover"
              />
            </div>
            <div className="">
              <h2 className="text-xl text-[#eaeaea]">
                <a className="hover:text-[#32cd32] hover:underline">
                  Leaking Kitchen Sink
                </a>
              </h2>
              {/* Details */}
              <div className="mt-4 rounded bg-[#14532d]">
                <p className="p-2 text-sm font-bold text-[#32cd32]">
                  Price Agreed : ₦50,000
                </p>
              </div>
              <div className="mt-2 rounded bg-zinc-900 font-semibold group-hover:bg-red-800">
                <p className="p-2 group-hover:text-gray-300">
                  Status :{" "}
                  <span className="text-red-600 group-hover:text-zinc-950">
                    Ongoing
                  </span>
                </p>
              </div>
            </div>
          </div>

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

        <div className=" text-gray-300 ">
          <p>
            Deadline:
            <span className="font-semibold text-red-500">
              {" "}
              Thursday 13th of Sept
            </span>
          </p>
        </div>

        <div className="flex largeDesktop:space-x-5">
          <button className="group1 flex w-full items-center justify-center rounded-lg bg-[#32cd32] px-6 py-2 font-medium text-white transition duration-300 hover:bg-[#0e0e0e] hover:text-[#32cd32] hover:ring-2 hover:ring-[#32cd32] focus:outline-none focus:ring-2 focus:ring-[#32cd32] focus:ring-opacity-50 sm:w-auto">
            Completed <FaRegCircleCheck className="ml-2 " />
          </button>
          <button className="w-full rounded-lg bg-red-600 px-6 py-2 font-medium text-white transition duration-300 hover:bg-[#0e0e0e] hover:text-red-500 hover:ring-2 hover:ring-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 sm:w-auto">
            Cancel
          </button>
        </div>
      </div>
      <hr className="h-[0.08rem] w-[50.5rem] border-0 bg-[#2e2e2e] xsMobile:w-[15.5rem] miniMobile:w-[18.5rem] mobile:w-[22rem] miniTablet:w-[20.5rem] tablet:w-[26.5rem] miniLaptop:w-[30.5rem] laptop:w-[33.5rem] desktop:w-[33.5rem]" />
    </div>
  );
};

export default OngoingJobs;
