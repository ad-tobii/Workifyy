import { useState } from 'react'
import { Link } from 'react-router-dom'
import SignupForm from './SignupForm'

const clientTestimonials = [
  {
    quote: "Got 4 bids within 30 minutes of posting. I hired a plumber the same day — completely hassle-free. Workifyy changed how I get work done.",
    name: 'Amaka Okonkwo',
    role: 'Client · Lagos',
    initials: 'AO',
    img: '/assets/valuepic.jpg',
  },
  {
    quote: "The competitive bidding means I always get a fair price. I've used Workifyy six times and it hasn't let me down once.",
    name: 'Tobi Lawson',
    role: 'Client · Abuja',
    initials: 'TL',
    img: '/assets/ClientSection2.jpg',
  },
  {
    quote: "Transparent reviews made it easy to trust who I hired. From posting the job to final payment — smooth every step of the way.",
    name: 'Fatima Bello',
    role: 'Client · Kano',
    initials: 'FB',
    img: '/assets/value2.jpg',
  },
]

const proTestimonials = [
  {
    quote: "I doubled my monthly income in 3 months. Jobs come to me now — I don't chase clients anymore. Best decision I've made for my business.",
    name: 'Emeka Adeyemi',
    role: 'Electrician · Lagos',
    initials: 'EA',
    img: '/assets/HeroSection.jpg',
  },
  {
    quote: "My calendar is booked 2 weeks in advance. The platform is clean, the clients are serious, and I earn what I'm worth.",
    name: 'Seun Adeyinka',
    role: 'Painter · Lagos',
    initials: 'SA',
    img: '/assets/valuepic.jpg',
  },
  {
    quote: "Setting my own rate and negotiating directly gives me control. I've tripled my client base since joining Workifyy.",
    name: 'Chidi Nwachukwu',
    role: 'Plumber · Abuja',
    initials: 'CN',
    img: '/assets/value2.jpg',
  },
]

export default function SignupPage({ role }) {
  const testimonials = role === 'professional' ? proTestimonials : clientTestimonials
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent(c => (c + 1) % testimonials.length)

  const t = testimonials[current]

  return (
    <div className="flex min-h-screen bg-[#0f0f10]">
      {/* ── LEFT — form panel ── */}
      <div className="flex flex-1 items-start justify-center overflow-y-auto px-8 py-10 lg:max-w-[48%]">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 inline-block">
            <img src="/assets/workifyy-logo.png" alt="Workifyy" className="h-8 w-auto" />
          </Link>
          <SignupForm role={role} />
        </div>
      </div>

      {/* ── RIGHT — image testimonial panel ── */}
      <div className="hidden flex-1 p-5 lg:flex">
        <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl">

          {/* Background images — crossfade on slide change */}
          {testimonials.map((item, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === current ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={item.img}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          ))}

          {/* Dark gradient overlay — heavier at top and bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/85" />
          {/* Extra bottom darkening for card readability */}
          <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent" />

          {/* All content above overlays */}
          <div className="relative z-10 flex h-full flex-col justify-between p-10">

            {/* Top label + heading */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#32CD32]">
                {role === 'professional' ? 'Pro Stories' : 'Client Stories'}
              </p>
              <h2 className="mt-3 max-w-xs text-3xl font-black leading-tight text-white">
                {role === 'professional'
                  ? 'What our Pros are Saying.'
                  : 'What our Clients Say.'}
              </h2>
            </div>

            {/* Testimonial body */}
            <div className="flex flex-col justify-center py-6">
              <p className="mb-4 text-5xl font-black leading-none text-[#32CD32]/60">"</p>

              <p
                key={current}
                className="text-lg font-medium leading-relaxed text-white/90"
              >
                {t.quote}
              </p>

              {/* Author */}
              <div className="mt-8 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#32CD32] ring-2 ring-[#32CD32]/30">
                  <span className="text-xs font-black text-black">{t.initials}</span>
                </div>
                <div>
                  <p className="font-bold text-white">{t.name}</p>
                  <p className="text-xs text-white/50">{t.role}</p>
                </div>
              </div>
            </div>

            {/* Dots + arrows */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-[3px] rounded-full transition-all duration-300 ${
                      i === current ? 'w-6 bg-[#32CD32]' : 'w-2 bg-white/30'
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white/60 backdrop-blur-sm transition-colors hover:border-[#32CD32]/60 hover:text-[#32CD32]"
                >
                  ←
                </button>
                <button
                  onClick={next}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#32CD32] text-black transition-opacity hover:opacity-80"
                >
                  →
                </button>
              </div>
            </div>

            {/* Bottom feature card */}
            <div className="mt-5 rounded-xl border border-white/10 bg-black/40 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-[#32CD32]">
                    {role === 'professional' ? 'Start Earning Today' : 'Post Your First Job'}
                  </p>
                  <p className="mt-1 text-sm font-bold text-white">
                    {role === 'professional'
                      ? '500+ jobs posted this week near you.'
                      : '500+ verified professionals ready to bid.'}
                  </p>
                  <p className="mt-0.5 text-xs text-white/40">
                    {role === 'professional'
                      ? 'Location-matched. No cold outreach.'
                      : 'Get your first bid in under 30 minutes.'}
                  </p>
                </div>
                <div className="flex shrink-0 -space-x-2">
                  {['EA', 'CN', 'SA'].map((init, i) => (
                    <div
                      key={i}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black/60 bg-[#32CD32]"
                    >
                      <span className="text-[9px] font-black text-black">{init}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
