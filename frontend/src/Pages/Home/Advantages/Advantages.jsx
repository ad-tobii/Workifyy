const features = [
  {
    num: '01',
    title: 'Location-Based Matching',
    desc: 'Jobs and professionals are matched by GPS. Only pros in your area see your listing — fast, relevant results.',
  },
  {
    num: '02',
    title: 'Competitive Bidding',
    desc: 'Multiple professionals compete for your job. Compare bids and negotiate directly to get the right price.',
  },
  {
    num: '03',
    title: 'Verified Professionals',
    desc: 'Every professional on Workifyy is vetted and backed by real client reviews before you ever see their profile.',
  },
  {
    num: '04',
    title: 'Real-Time Updates',
    desc: 'Live notifications keep you in the loop at every stage — from bid placed to work submitted.',
  },
  {
    num: '05',
    title: 'Secure Payments',
    desc: 'Pay only when the work is done to your satisfaction. No hidden fees, no nasty surprises.',
  },
  {
    num: '06',
    title: 'Transparent Reviews',
    desc: 'Read honest feedback from real clients before you hire. Leave your own review when the job is done.',
  },
]

const AdvantagesSection = () => {
  return (
    <section className="border-t border-white/10">
      <div className="border-b border-white/10 px-8 py-16 md:px-16 lg:px-24">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/30">Why Workifyy</p>
        <h2 className="max-w-xl text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
          Get things done right, every time.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <div
            key={i}
            className="group border-b border-r border-white/10 px-8 py-10 transition-colors duration-300 hover:bg-white/[0.025] sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0"
          >
            <span className="font-mono text-xs text-white/20">{f.num}</span>
            <h3 className="mt-4 text-lg font-bold text-white">{f.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/40">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AdvantagesSection
