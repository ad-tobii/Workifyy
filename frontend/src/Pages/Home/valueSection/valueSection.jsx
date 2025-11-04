const ValueSection = () => {
  return (
    <div className="mt-28 flex justify-center px-6">
      <div className="w-full max-w-5xl px-4">
        <div>
          <h2 className="pb-5 text-center text-3xl font-bold leading-relaxed text-[#32cd32] sm:text-left">
            Connecting Professionals to Opportunities
          </h2>
        </div>
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-20 lg:space-y-0">
          <div className="flex flex-col space-y-8 lg:flex-1 lg:space-y-0">
            <p className="pb-5 text-center text-xl font-light text-[#d1d5db] lg:text-left">
              Empowering clients and professionals with seamless job connections
              and efficient solutions.
            </p>
            <img
              src="./assets/valuepic.jpg"
              alt="Value Section"
              className="h-[20rem] w-full rounded-lg object-cover lg:hidden"
            />
            <div className="space-y-8 text-[#d1d5db]">
              <div className="flex items-center gap-x-4">
                <div className="h-5 min-h-5 w-5 min-w-5 rounded-full bg-[#32cd32] text-center text-sm text-white">
                  1
                </div>
                <div>
                  <h2 className="text-xl font-bold">
                    Find the Right Professional
                  </h2>
                  <p className="text-sm text-[#32cd32]">
                    Post a job and receive bids from qualified experts.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-x-4">
                <div className="h-5 min-h-5 w-5 min-w-5 rounded-full bg-[#32cd32] text-center text-sm text-white">
                  2
                </div>
                <div>
                  <h2 className="text-xl font-bold"> Secure Payments</h2>
                  <p className="text-sm text-[#32cd32]">
                    Ensure trust and safety with our on-platform payment system.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-x-4">
                <div className="h-5 min-h-5 w-5 min-w-5 rounded-full bg-[#32cd32] text-center text-sm text-white">
                  3
                </div>
                <div>
                  <h2 className="text-xl font-bold ">Track Progress</h2>
                  <p className="text-sm text-[#32cd32]">
                    Monitor your ongoing projects easily in one place.
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center lg:text-left">
              <button className="mt-12 rounded border-2 border-[#32cd32] p-2 font-medium text-[#32cd32] transition-colors hover:bg-[#32cd32] hover:text-white">
                Get Started
              </button>
            </div>
          </div>
          <div className="hidden lg:block">
            <img
              src="./assets/valuepic.jpg"
              alt="Value Section"
              className="h-[25rem] w-[30rem] rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueSection;
