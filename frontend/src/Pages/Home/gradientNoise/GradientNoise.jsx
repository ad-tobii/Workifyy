import { Link } from 'react-router-dom'

const GradientNoise = () => {
  const year = new Date().getFullYear()

  return (
    <section className="border-t border-white/10">
      <div className="flex flex-col items-start justify-between gap-8 px-5 py-14 sm:px-8 md:flex-row md:items-end md:gap-16 md:px-14 md:py-24 lg:px-20 xl:px-24">
        {/* Left — large stacked headline + copyright */}
        <div>
          <h2 className="text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            It&rsquo;s your project.
          </h2>
          <h2 className="text-4xl font-black leading-[0.95] tracking-tight text-[#32CD32] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            Get it done.
          </h2>
          <p className="mt-5 text-xs text-white/20">&copy; {year} Workifyy.</p>
        </div>

        {/* Right — email capture */}
        <div className="w-full md:max-w-sm">
          <p className="mb-3 text-sm text-white/40">
            Join thousands already on Workifyy.
          </p>
          <div className="flex flex-col gap-3 overflow-hidden rounded-3xl border border-white/20 p-2 focus-within:border-white/40 sm:flex-row sm:rounded-full sm:p-0">
            <input
              type="email"
              placeholder="yourname@email.com"
              className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 sm:px-5"
            />
            <Link to="/auth/ClientSignup">
              <button className="w-full rounded-full bg-[#32CD32] px-6 py-3 text-xs font-black uppercase tracking-widest text-black transition-opacity hover:opacity-90 sm:w-auto">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GradientNoise
