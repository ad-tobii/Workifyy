import { Link } from 'react-router-dom'

const GradientNoise = () => {
  const year = new Date().getFullYear()

  return (
    <section className="border-t border-white/10">
      <div className="flex flex-col items-start justify-between gap-16 px-8 py-24 md:flex-row md:items-end md:px-14 lg:px-20 xl:px-24">
        {/* Left — large stacked headline + copyright */}
        <div>
          <h2 className="text-5xl font-black leading-[0.93] tracking-tight text-white md:text-6xl lg:text-7xl xl:text-8xl">
            It&rsquo;s your project.
          </h2>
          <h2 className="text-5xl font-black leading-[0.93] tracking-tight text-[#32CD32] md:text-6xl lg:text-7xl xl:text-8xl">
            Get it done.
          </h2>
          <p className="mt-5 text-xs text-white/20">&copy; {year} Workifyy.</p>
        </div>

        {/* Right — email capture */}
        <div className="w-full md:max-w-sm">
          <p className="mb-3 text-sm text-white/40">
            Join thousands already on Workifyy.
          </p>
          <div className="flex overflow-hidden rounded-full border border-white/20 focus-within:border-white/40">
            <input
              type="email"
              placeholder="yourname@email.com"
              className="flex-1 bg-transparent px-5 py-3 text-sm text-white outline-none placeholder:text-white/25"
            />
            <Link to="/auth/ClientSignup">
              <button className="rounded-full bg-[#32CD32] px-6 py-3 text-xs font-black uppercase tracking-widest text-black transition-opacity hover:opacity-90">
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
