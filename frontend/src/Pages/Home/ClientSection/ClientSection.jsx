function ClientSection() {
  return (
    <section className="border-t border-white/10">
      <div className="flex flex-col md:flex-row">
        {/* Left sidebar — label + attribution */}
        <div className="flex flex-col justify-between border-b border-white/10 px-8 py-12 md:w-64 md:border-b-0 md:border-r md:py-16 lg:w-80 xl:px-14">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#32CD32]">
            Testimonials
          </p>
          <div className="mt-10 md:mt-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#32CD32]">
              <span className="text-xs font-black text-black">AO</span>
            </div>
            <p className="mt-3 text-sm font-bold text-white">Amaka Okonkwo</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-white/30">Client · Lagos</p>
          </div>
        </div>

        {/* Right — large quote */}
        <div className="flex-1 px-8 py-12 md:px-14 md:py-16 lg:px-20 xl:px-24">
          <blockquote className="text-2xl font-light leading-relaxed text-white/80 md:text-3xl lg:text-[2rem]">
            &ldquo;Workifyy made it so easy to find a trustworthy plumber. I posted the job, got 4 competitive bids in under an hour, and had it fixed the same day. This platform is a genuine game-changer — I&rsquo;ll never go back to hunting for contractors the old way.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  )
}

export default ClientSection
