import { Link } from 'react-router-dom'

const steps = [
  {
    num: '01',
    title: 'Post a Job',
    desc: 'Describe your task, set a budget, and let nearby professionals find you based on your location.',
    cta: 'Post your first job',
    img: '/assets/valuepic.jpg',
  },
  {
    num: '02',
    title: 'Review Bids',
    desc: 'Receive competitive bids from verified pros. Compare profiles, ratings, and negotiate directly.',
    cta: 'See how bidding works',
    img: '/assets/value2.jpg',
  },
  {
    num: '03',
    title: 'Get It Done',
    desc: 'Hire your professional, track progress in real-time, and release payment only when satisfied.',
    cta: 'Start hiring today',
    img: '/assets/ClientSection2.jpg',
  },
]

const ValueSection = () => {
  return (
    <section className="border-t border-white/10">
      <div className="flex flex-col gap-4 border-b border-white/10 px-5 py-10 sm:px-8 md:flex-row md:items-end md:justify-between md:px-14 md:py-16 lg:px-20 xl:px-24">
        <div>
          <p className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-white/30 md:mb-4 md:text-xs md:tracking-[0.3em]">
            What Is Workifyy?
          </p>
          <h2 className="max-w-4xl text-[2rem] font-black leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4rem]">
            Workifyy connects clients with skilled professionals near them.
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-white/45 md:max-w-[14rem] md:text-right">
          A location-based marketplace where every job finds the right professional.
        </p>
      </div>

      <div className="divide-y divide-white/10 md:divide-y-0">
        {steps.map((step, i) => (
          <div
            key={step.num}
            className={`group relative border-b border-white/10 px-5 py-6 sm:px-8 md:flex md:px-0 md:py-0 ${
              i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            <div className="flex min-h-[9rem] flex-1 flex-col justify-between gap-5 pr-28 md:min-h-0 md:gap-6 md:px-14 md:py-12 md:pr-14 lg:px-20 xl:px-24">
              <div className="flex items-start gap-4 md:gap-8">
                <span className="mt-1 shrink-0 font-mono text-xs text-white/20">{step.num}</span>
                <div>
                  <h3 className="text-xl font-bold text-white md:text-2xl">{step.title}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/45 md:text-white/40">
                    {step.desc}
                  </p>
                </div>
              </div>
              <div className="pl-10 md:pl-14">
                <Link
                  to="/auth/ClientSignup"
                  className="inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-widest text-[#32CD32] transition-all duration-200 hover:gap-4 md:text-xs"
                >
                  {step.cta} <span>→</span>
                </Link>
              </div>
            </div>

            <div className="absolute right-5 top-6 h-28 w-24 overflow-hidden rounded-2xl sm:right-8 md:relative md:right-auto md:top-auto md:h-auto md:w-64 md:rounded-none lg:w-80">
              <img
                src={step.img}
                alt={step.title}
                className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ValueSection
