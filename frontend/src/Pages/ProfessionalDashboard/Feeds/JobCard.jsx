const JobCard = () => {
  return (
    <div
      className="group w-[50.5rem] cursor-pointer hover:bg-[#1a1a1a] xsMobile:w-[15.5rem] miniMobile:w-[18.5rem] mobile:w-[22rem] miniTablet:w-[20.5rem] tablet:w-[26.5rem] miniLaptop:w-[30.5rem] laptop:w-[33.5rem] desktop:w-[33.5rem]"
      onClick={() => alert("JobCard clicked!")}
    >
      <hr className="h-[0.08rem] w-[50.5rem] border-0 bg-[#323232] xsMobile:w-[15.5rem] miniMobile:w-[18.5rem] mobile:w-[22rem] miniTablet:w-[20.5rem] tablet:w-[26.5rem] miniLaptop:w-[30.5rem] laptop:w-[33.5rem] desktop:w-[33.5rem]" />
      <div className="space-y-3 p-6 text-white shadow-lg">
        <div className="flex items-start justify-between">
          {/* Posted time */}
          <span className="text-sm text-gray-400">Posted yesterday</span>
        </div>

        {/* Title */}
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
                Leaking Kitchen Sink.
              </a>
            </h2>
            {/* Details */}
            <div className="mt-4 rounded bg-[#14532d]">
              <p className="p-2 text-sm font-bold text-[#32cd32]">
                Price Offered : ₦50,000
              </p>
            </div>
            <div className="mt-2 rounded bg-zinc-900 font-semibold group-hover:bg-black">
              <p className="p-2 group-hover:text-gray-300">
                Date : <span className="text-red-600">Today</span>
              </p>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <p className="leading-relaxed text-[#eaeaea]">
          I have a kitchen sink that has started leaking from the pipes
          underneath. The water seems to be dripping more when the tap is
          running. I need a plumber to inspect the problem and fix the leak as
          soon as possible. Please bring any necessary tools or materials.
          Available for repair during the weekend. Would prefer someone with
          experience in sink or plumbing repairs
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
          <div className="flex items-center space-x-1">
            <span>●</span>
            <span>fagge, kano</span>
          </div>
        </div>

        {/* Proposals */}
        <div className="text-sm text-gray-400">
          Rival bids: <span className="text-[#32cd32]">20 to 50</span>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
