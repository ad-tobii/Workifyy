import { Link } from 'react-router-dom'

function HomeHeroSection() {
  return (
    <div className="relative flex min-h-screen flex-col bg-black md:flex-row">
      {/* LEFT — text panel */}
      <div className="relative z-10 flex flex-1 flex-col justify-between px-8 pb-10 pt-28 md:px-14 lg:px-20 xl:px-24">
        {/* Top label */}
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.35em] text-[#32CD32]">
          It&rsquo;s your job. Get it done.
        </p>

        {/* Giant headline */}
        <h1 className="my-6 text-[3.5rem] font-black leading-[0.88] tracking-tight text-white sm:text-[4.5rem] md:text-[3.8rem] lg:text-[5rem] xl:text-[6.5rem]">
          Get Any Job Done.<br />
          <span className="text-[#32CD32]">Near You.</span>
        </h1>

        {/* Stat boxes row — matching reference: button + two stat boxes */}
        <div className="flex flex-wrap items-stretch gap-3">
          <Link to="/auth/ClientSignup">
            <button className="rounded-full bg-[#32CD32] px-7 py-4 text-xs font-black uppercase tracking-widest text-black transition-colors hover:bg-white">
              Get Started
            </button>
          </Link>

          <div className="flex min-w-[8rem] flex-col justify-center rounded-2xl bg-[#111] px-5 py-3">
            <p className="text-2xl font-black text-white">500+</p>
            <p className="mt-0.5 text-[0.6rem] leading-tight text-white/40 uppercase tracking-wide">
              Verified<br />Professionals
            </p>
          </div>

          <div className="flex min-w-[8rem] flex-col justify-center rounded-2xl bg-[#111] px-5 py-3">
            <p className="text-2xl font-black text-white">1,200+</p>
            <p className="mt-0.5 text-[0.6rem] leading-tight text-white/40 uppercase tracking-wide">
              Jobs<br />Completed
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/40">
          Workifyy is a location-based marketplace connecting clients with skilled local professionals — plumbers, electricians, painters and more.
        </p>
      </div>

      {/* RIGHT — image panel */}
      <div className="relative h-72 w-full shrink-0 md:h-auto md:w-[43%]">
        <img
          src="/assets/HeroSection.jpg"
          alt="Professional at work"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/25" />

        {/* Join as Pro pinned bottom-left of image */}
        <div className="absolute bottom-8 left-8">
          <Link to="/auth/ProfessionalSignup">
            <button className="rounded-full border border-white/50 bg-black/30 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-colors hover:border-[#32CD32] hover:text-[#32CD32]">
              Join as a Pro
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomeHeroSection
