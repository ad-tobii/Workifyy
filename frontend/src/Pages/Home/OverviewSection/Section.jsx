import { Link } from 'react-router-dom'

function Section() {
  return (
    <section className="border-t border-white/10">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-white/10 px-8 py-16 md:flex-row md:items-end md:justify-between md:px-14 lg:px-20 xl:px-24">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#32CD32]">
            Browse Professionals
          </p>
          <h2 className="max-w-2xl text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-[3.5rem]">
            Find skilled professionals for any job near you.
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-white/40 md:text-right">
          Workifyy connects you with vetted local professionals ready to bid on your next job.
        </p>
      </div>

      {/* Featured card */}
      <div className="flex h-auto flex-col md:h-[30rem] md:flex-row">
        {/* Image */}
        <div className="group relative h-64 w-full overflow-hidden md:h-full md:w-[55%]">
          <img
            src="/assets/ClientSection2.jpg"
            alt="Professional at work"
            className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between border-l border-white/10 bg-[#0a0a0a] p-8 md:p-12">
          <div>
            <h3 className="max-w-xs text-2xl font-black leading-tight text-white md:text-3xl">
              Trusted Professionals.<br />Competitive Prices.
            </h3>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/40">
              From plumbing to electrical, painting to carpentry — post your job and receive bids from verified professionals in your area within minutes.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#32CD32]">
                <span className="text-xs font-black text-black">EA</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white">Emeka Adeyemi</p>
                <p className="text-xs text-white/30">Electrician · Lagos</p>
              </div>
            </div>
            <Link to="/auth/ClientSignup">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#32CD32] bg-[#32CD32] text-lg font-black text-black transition-all hover:bg-transparent hover:text-[#32CD32]">
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
