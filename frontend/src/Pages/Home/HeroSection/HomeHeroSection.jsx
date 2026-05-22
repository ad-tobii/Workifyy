import { Link } from 'react-router-dom'

function HomeHeroSection() {
  return (
    <div className="relative flex min-h-[100svh] flex-col overflow-hidden bg-black md:min-h-screen md:flex-row">
      <div className="relative z-10 flex min-h-[100svh] flex-1 flex-col justify-end px-5 pb-8 pt-28 sm:px-8 md:min-h-screen md:justify-between md:px-14 md:pb-10 lg:px-20 xl:px-24">
        <p className="text-[0.62rem] font-bold uppercase tracking-[0.28em] text-[#32CD32] md:tracking-[0.35em]">
          It&rsquo;s your job. Get it done.
        </p>

        <h1 className="my-5 max-w-[21rem] text-[3rem] font-black leading-[0.9] tracking-tight text-white sm:text-[4.5rem] md:my-6 md:max-w-none md:text-[3.8rem] lg:text-[5rem] xl:text-[6.5rem]">
          Get Any Job Done.
          <br />
          <span className="text-[#32CD32]">Near You.</span>
        </h1>

        <div className="grid grid-cols-2 items-stretch gap-3 sm:flex sm:flex-wrap">
          <Link to="/auth/ClientSignup">
            <button className="h-full w-full rounded-full bg-[#32CD32] px-5 py-4 text-xs font-black uppercase tracking-widest text-black transition-colors hover:bg-white sm:w-auto sm:px-7">
              Get Started
            </button>
          </Link>

          <div className="flex min-w-0 flex-col justify-center rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm md:min-w-[8rem] md:bg-[#111] md:px-5">
            <p className="text-xl font-black text-white md:text-2xl">500+</p>
            <p className="mt-0.5 text-[0.58rem] uppercase leading-tight tracking-wide text-white/50 md:text-[0.6rem] md:text-white/40">
              Verified
              <br />
              Professionals
            </p>
          </div>

          <div className="col-span-2 flex min-w-0 flex-col justify-center rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm sm:col-span-1 md:min-w-[8rem] md:bg-[#111] md:px-5">
            <p className="text-xl font-black text-white md:text-2xl">1,200+</p>
            <p className="mt-0.5 text-[0.58rem] uppercase leading-tight tracking-wide text-white/50 md:text-[0.6rem] md:text-white/40">
              Jobs
              <br />
              Completed
            </p>
          </div>
        </div>

        <p className="mt-5 md:hidden max-w-xs text-sm leading-relaxed text-white/65 md:mt-6 md:max-w-sm md:text-white/40">
          Workifyy is a location-based marketplace connecting clients with skilled local
          professionals, from plumbers and electricians to painters and more.
        </p>

        <Link
          to="/auth/ProfessionalSignup"
          className="mt-5 inline-flex w-fit rounded-full border border-white/40 bg-black/30 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-colors hover:border-[#32CD32] hover:text-[#32CD32] md:hidden"
        >
          Join as a Pro
        </Link>
      </div>

      <div className="absolute inset-0 h-full w-full shrink-0 md:relative md:h-auto md:w-[43%]">
        <img
          src="/assets/HeroSection.jpg"
          alt="Professional at work"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20 md:hidden" />

        <div className="absolute bottom-8 left-8 hidden md:block">
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
