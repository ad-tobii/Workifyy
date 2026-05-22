function ClientSection() {
  return (
    <section className="border-t border-white/10">
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-row items-center justify-between gap-5 border-b border-white/10 px-5 py-6 sm:px-8 md:w-64 md:flex-col md:items-start md:border-b-0 md:border-r md:py-16 lg:w-80 xl:px-14">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-[#32CD32] md:text-xs md:tracking-[0.3em]">
            Testimonials
          </p>
          <div className="flex items-center gap-3 md:block">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#32CD32]">
              <span className="text-xs font-black text-black">AO</span>
            </div>
            <div>
              <p className="text-sm font-bold text-white md:mt-3">Amaka Okonkwo</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-white/30">Client · Lagos</p>
            </div>
          </div>
        </div>

        <div className="flex-1 px-5 py-8 sm:px-8 md:px-14 md:py-16 lg:px-20 xl:px-24">
          <blockquote className="text-xl font-light leading-relaxed text-white/80 sm:text-2xl md:text-3xl lg:text-[2rem]">
            &ldquo;Workifyy made it so easy to find a trustworthy plumber. I posted the job, got 4
            competitive bids in under an hour, and had it fixed the same day. This platform is a
            genuine game-changer. I&rsquo;ll never go back to hunting for contractors the old way.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  )
}

export default ClientSection
