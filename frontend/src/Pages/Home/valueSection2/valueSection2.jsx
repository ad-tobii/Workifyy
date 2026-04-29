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
      <div className="border-b border-white/10 px-8 py-16 md:px-14 lg:px-20 xl:px-24">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-white/30">
          Top Professionals
        </p>
        <h2 className="max-w-xl text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
          Skilled workers near you, ready to start.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {professionals.map((pro, i) => (
          <div
            key={i}
            className={`group border-b border-white/10 ${i === 0 ? 'md:border-r' : ''}`}
          >
            {/* Image */}
            <div className="h-72 overflow-hidden">
              <img
                src={pro.img}
                alt={pro.name}
                className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
              />
            </div>

            {/* Info bar */}
            <div className="flex items-center justify-between border-t border-white/10 px-8 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#32CD32]">
                  <span className="text-xs font-black text-black">{pro.initials}</span>
                </div>
                <div>
                  <p className="font-bold text-white">{pro.name}</p>
                  <p className="text-xs text-white/40">
                    {pro.category} · {pro.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-bold text-[#32CD32]">{pro.rating}★</p>
                  <p className="text-xs text-white/30">{pro.jobs}</p>
                </div>
                <Link to="/auth/ClientSignup">
                  <button className="rounded-full bg-[#32CD32] px-5 py-2 text-xs font-black uppercase tracking-widest text-black transition-opacity hover:opacity-80">
                    Hire Now
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
