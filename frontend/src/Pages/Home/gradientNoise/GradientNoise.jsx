import { Link } from 'react-router-dom'
const GradientNoise = () => {
  return (
    <section className="relative mt-28 flex min-h-screen items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24">
      {/* Gradient Layer */}
      <div className="absolute left-0 top-0 h-full w-full bg-hero-gradient"></div>

      {/* Texture Layer */}
      <div className="absolute left-0 top-0 h-full w-full bg-hero-texture opacity-20 mix-blend-overlay"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl text-center text-white">
        <h1 className="text-3xl font-extrabold leading-snug md:text-5xl">
          Connect with Skilled Professionals, Anytime, Anywhere
        </h1>
        <p className="mt-4 text-sm leading-relaxed md:text-lg">
          Workifyy helps you find top-rated professionals for your projects. Post your job, review
          bids, and hire the best fit with ease.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/auth/signup"
            className="rounded-full bg-[#32cd32] px-6 py-3 text-white transition hover:bg-green-600"
          >
            Post a Job
          </Link>
          <Link
            to="/auth/ClientSignup"
            className="rounded-full bg-black px-6 py-3 text-green-500 transition hover:bg-black hover:text-white"
          >
            Find Professionals
          </Link>
        </div>
      </div>
    </section>
  )
}

export default GradientNoise
