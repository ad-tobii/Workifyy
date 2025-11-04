const AdvantagesSection = () => {
  return (
    <div className="px-10 mt-28">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold leading-relaxed text-white">
          Why Workifyy ?
        </h2>
        <p className="mt-6 text-center text-xl font-light text-[#d1d5db]">
          Get Things Done Right, Every Time, Effortlessly with Workifyy.
        </p>
      </div>
      <div className="mt-12   flex justify-center">
        <div className="grid w-[56rem] md:w-auto justify-items-center grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="h-44 w-72 rounded-xl bg-[#1a1a1a] p-4">
            <h2 className="text- text-xl font-bold text-[#a0a0a0]">Speed</h2>
            <p className="pt-2 text-sm text-white">
              Post a job in seconds, hire in minutes
            </p>
            <div className="mt-2 flex justify-end">
              <img src="./assets/speed.svg" className="w-16" />
            </div>
          </div>
          <div className="h-44 w-72 rounded-xl bg-[#1a1a1a] p-4">
            <h2 className="text- text-xl font-bold text-[#a0a0a0]">
              Efficiency
            </h2>
            <p className="pt-2 text-sm text-white">
              Streamlined hiring process, saving you valuable time.
            </p>
            <div className="mt-2 flex justify-end">
              <img src="./assets/efficiency.svg" className="w-16" />
            </div>
          </div>
          <div className="h-44 w-72 rounded-xl bg-[#1a1a1a] p-4">
            <h2 className="text- text-xl font-bold text-[#a0a0a0]">
              Affordability
            </h2>
            <p className="pt-2 text-sm text-white">
              Affordable hiring solutions without hidden fees
            </p>
            <div className="mt-2 flex justify-end">
              <img src="./assets/affordability.svg" className="w-16" />
            </div>
          </div>
          <div className="h-44 w-72 rounded-xl bg-[#1a1a1a] p-4">
            <h2 className="text- text-xl font-bold text-[#a0a0a0]">Security</h2>
            <p className="pt-2 text-sm text-white">
              Your transactions are safe with our escrow-like protection.
            </p>
            <div className="mt-2 flex justify-end">
              <img src="./assets/security.svg" className="w-16" />
            </div>
          </div>
          <div className="h-44 w-72 rounded-xl bg-[#1a1a1a] p-4">
            <h2 className="text- text-xl font-bold text-[#a0a0a0]">
              Accessibility
            </h2>
            <p className="pt-2 text-sm text-white">
              Easily connect with skilled professionals from anywhere.
            </p>
            <div className="mt-2 flex justify-end">
              <img src="./assets/accessibility.svg" className="w-16" />
            </div>
          </div>
          <div className="h-44 w-72 rounded-xl bg-[#1a1a1a] p-4">
            <h2 className="text- text-xl font-bold text-[#a0a0a0]">
              Trustworthy Reviews
            </h2>
            <p className="pt-2 text-sm text-white">
              Read authentic feedback from previous employers before hiring.
            </p>
            <div className="mt-2 flex justify-end">
              <img src="./assets/reviews.svg" className="w-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvantagesSection;
