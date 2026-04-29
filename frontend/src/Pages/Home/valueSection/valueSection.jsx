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
      {/* Large spanning headline */}
      <div className="flex flex-col gap-4 border-b border-white/10 px-8 py-16 md:flex-row md:items-end md:justify-between md:px-14 lg:px-20 xl:px-24">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-white/30">
            What Is Workifyy?
          </p>
          <h2 className="max-w-4xl text-4xl font-black leading-[1.0] tracking-tight text-white md:text-5xl lg:text-6xl xl:text-[4rem]">
            Workifyy connects clients with skilled professionals near them.
          </h2>
        </div>
        <p className="max-w-[14rem] text-sm leading-relaxed text-white/40 md:text-right">
          A location-based marketplace where every job finds the right professional.
        </p>
      </div>

      {/* Alternating numbered rows */}
      {steps.map((step, i) => (
        <div
          key={i}
          className={`group flex flex-col border-b border-white/10 ${
            i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
          }`}
        >
          <div className="flex flex-1 flex-col justify-between gap-6 px-8 py-12 md:px-14 lg:px-20 xl:px-24">
            <div className="flex items-start gap-8">
              <span className="mt-1 font-mono text-xs text-white/20">{step.num}</span>
              <div>
                <h3 className="text-xl font-bold text-white md:text-2xl">{step.title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/40">{step.desc}</p>
              </div>
            </div>
            <div className="pl-14">
              <Link
                to="/auth/ClientSignup"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#32CD32] transition-all duration-200 hover:gap-4"
              >
                {step.cta} <span>→</span>
              </Link>
            </div>
          </div>

          <div className="h-52 w-full overflow-hidden md:h-auto md:w-64 lg:w-80">
            <img
              src={step.img}
              alt={step.title}
              className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
            />
          </div>
        </div>
      ))}
    </section>
  )
}

export default ValueSection
