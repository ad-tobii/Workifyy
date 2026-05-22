import { Link } from 'react-router-dom'

const professionals = [
  {
    name: 'Emeka Adeyemi',
    category: 'Electrician',
    location: 'Lagos, Nigeria',
    rating: '4.9',
    jobs: '47 jobs completed',
    initials: 'EA',
    img: '/assets/valuepic.jpg',
  },
  {
    name: 'Chidi Nwachukwu',
    category: 'Plumber',
    location: 'Abuja, Nigeria',
    rating: '4.8',
    jobs: '31 jobs completed',
    initials: 'CN',
    img: '/assets/value2.jpg',
  },
]

const ValueSection2 = () => {
  return (
    <section className="border-t border-white/10">
      <div className="border-b border-white/10 px-5 py-10 sm:px-8 md:px-14 md:py-16 lg:px-20 xl:px-24">
        <p className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-white/30 md:mb-4 md:text-xs md:tracking-[0.3em]">
          Top Professionals
        </p>
        <h2 className="max-w-xl text-[2rem] font-black leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl">
          Skilled workers near you, ready to start.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {professionals.map((pro, i) => (
          <div
            key={pro.name}
            className={`group flex gap-4 border-b border-white/10 p-5 sm:p-8 md:block md:p-0 ${
              i === 0 ? 'md:border-r' : ''
            }`}
          >
            <div className="h-32 w-28 shrink-0 overflow-hidden rounded-2xl md:h-72 md:w-full md:rounded-none">
              <img
                src={pro.img}
                alt={pro.name}
                className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 md:flex-row md:items-center md:border-t md:border-white/10 md:px-8 md:py-5">
              <div className="flex items-center gap-3">
                <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#32CD32] md:flex">
                  <span className="text-xs font-black text-black">{pro.initials}</span>
                </div>
                <div className="min-w-0">
                  <p className="truncate font-bold text-white">{pro.name}</p>
                  <p className="text-xs text-white/40">
                    {pro.category} · {pro.location}
                  </p>
                </div>
              </div>

              <div className="flex items-end justify-between gap-4 md:items-center">
                <div className="md:text-right">
                  <p className="text-sm font-bold text-[#32CD32]">{pro.rating}★</p>
                  <p className="text-xs text-white/30">{pro.jobs}</p>
                </div>
                <Link to="/auth/ClientSignup">
                  <button className="rounded-full bg-[#32CD32] px-4 py-2 text-[0.65rem] font-black uppercase tracking-widest text-black transition-opacity hover:opacity-80 md:px-5 md:text-xs">
                    Hire
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ValueSection2
