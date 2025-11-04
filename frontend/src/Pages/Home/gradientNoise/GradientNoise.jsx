const GradientNoise = () => {
  return (
    <section className="relative mt-28 flex min-h-screen  items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24">
      {/* Gradient Layer */}
      <div className="bg-hero-gradient absolute left-0 top-0 h-full w-full"></div>

      {/* Texture Layer */}
      <div className="bg-hero-texture absolute left-0 top-0 h-full w-full opacity-20 mix-blend-overlay"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl text-center text-white">
        <h1 className="text-3xl font-extrabold leading-snug md:text-5xl">
          Connect with Skilled Professionals, Anytime, Anywhere
        </h1>
        <p className="mt-4 text-sm leading-relaxed md:text-lg">
          Workifyy helps you find top-rated professionals for your projects.
          Post your job, review bids, and hire the best fit with ease.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
          <button className="rounded-full bg-[#32cd32] px-6 py-3 text-white transition hover:bg-green-600">
            Post a Job
          </button>
          <button className="rounded-full  bg-black px-6 py-3 text-green-500 transition hover:bg-black hover:text-white">
            Find Professionals
          </button>
        </div>
      </div>
    </section>
  );
};

export default GradientNoise;
