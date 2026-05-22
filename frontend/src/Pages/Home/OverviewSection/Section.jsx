import { Link } from 'react-router-dom'

function Section() {
  return (
    <section className="border-t border-white/10">
      <div className="flex flex-col gap-4 border-b border-white/10 px-5 py-10 sm:px-8 md:flex-row md:items-end md:justify-between md:px-14 md:py-16 lg:px-20 xl:px-24">
        <div>
          <p className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-[#32CD32] md:mb-4 md:text-xs md:tracking-[0.3em]">
            Browse Professionals
          </p>
          <h2 className="max-w-2xl text-[2rem] font-black leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.5rem]">
            Find skilled professionals for any job near you.
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-white/45 md:max-w-xs md:text-right">
          Workifyy connects you with vetted local professionals ready to bid on your next job.
        </p>
      </div>

      <div className="px-5 py-5 sm:px-8 md:flex md:h-[30rem] md:px-0 md:py-0">
        <div className="group relative h-56 w-full overflow-hidden rounded-2xl md:h-full md:w-[55%] md:rounded-none">
          <img
            src="/assets/ClientSection2.jpg"
            alt="Professional at work"
            className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent md:hidden" />
        </div>

        <div className="-mt-8 relative z-10 mx-3 flex flex-1 flex-col justify-between gap-8 rounded-2xl border border-white/10 bg-[#0a0a0a] p-5 md:mx-0 md:mt-0 md:rounded-none md:border-0 md:border-l md:border-white/10 md:p-12">
          <div>
            <h3 className="max-w-xs text-2xl font-black leading-tight text-white md:text-3xl">
              Trusted Professionals.
              <br />
              Competitive Prices.
            </h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/45 md:max-w-xs">
              From plumbing to electrical, painting to carpentry, post your job and receive bids
              from verified professionals in your area within minutes.
            </p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#32CD32]">
                <span className="text-xs font-black text-black">EA</span>
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white">Emeka Adeyemi</p>
                <p className="text-xs text-white/30">Electrician · Lagos</p>
              </div>
            </div>
            <Link to="/auth/ClientSignup">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#32CD32] bg-[#32CD32] text-lg font-black text-black transition-all hover:bg-transparent hover:text-[#32CD32] md:h-12 md:w-12">
                ↗
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Section
