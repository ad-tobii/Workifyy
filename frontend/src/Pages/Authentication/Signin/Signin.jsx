import { useState, useEffect } from 'react'
import useUserStore from '../../../store/useUserStore'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const slides = [
  {
    img: '/assets/HeroSection.jpg',
    tag: 'For Clients',
    headline: 'Where skilled hands',
    sub: 'meet real opportunities.',
  },
  {
    img: '/assets/ClientSection2.jpg',
    tag: 'Post a Job',
    headline: 'Your next professional',
    sub: 'is just a job post away.',
  },
  {
    img: '/assets/value2.jpg',
    tag: 'Competitive Bids',
    headline: 'Real competition,',
    sub: 'better prices for you.',
  },
  {
    img: '/assets/valuepic.jpg',
    tag: 'For Professionals',
    headline: '500+ verified pros',
    sub: 'ready to deliver quality work.',
  },
]

export default function Signin() {
  const login = useUserStore(state => state.login)
  const loading = useUserStore(state => state.loading.login)
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm()

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % slides.length), 4500)
    return () => clearInterval(t)
  }, [])

  const onSubmit = async data => {
    clearErrors()
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(data.email)) {
      return setError('email', { type: 'manual', message: 'Enter a valid email address' })
    }
    try {
      const { success, error, user } = await login(data)
      if (success) {
        if (user.isVerified) {
          navigate(
            user.isOnboarded
              ? `/Dashboard/${user.role === 'professional' ? 'professionalDashboard' : 'clientDashboard'}`
              : '/Onboarding/welcome'
          )
        } else {
          navigate('/Auth/otp')
        }
      } else {
        setError('password', { type: 'manual', message: error })
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div className="flex min-h-screen bg-[#0f0f10]">
      {/* ── LEFT — sliding image panel ── */}
      <div className="hidden w-[42%] shrink-0 p-5 lg:block">
        <div className="relative h-full w-full overflow-hidden rounded-2xl">
          {slides.map((s, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === current ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img src={s.img} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
            </div>
          ))}

          {/* Back to site */}
          <div className="absolute left-6 top-6 z-10">
            <Link
              to="/"
              className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm transition-colors hover:text-white"
            >
              ← Back to website
            </Link>
          </div>

          {/* Caption + dots */}
          <div className="absolute bottom-8 left-6 right-6 z-10">
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#32CD32]">
              {slides[current].tag}
            </p>
            <h2 className="text-3xl font-black leading-tight text-white">
              {slides[current].headline}
            </h2>
            <p className="mt-1 text-sm text-white/50">{slides[current].sub}</p>

            <div className="mt-5 flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-[3px] rounded-full transition-all duration-300 ${
                    i === current ? 'w-7 bg-[#32CD32]' : 'w-2.5 bg-white/25'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT — form ── */}
      <div className="flex flex-1 flex-col items-center justify-center px-8 py-12">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-10 inline-block">
            <img src="/assets/workifyy-logo.png" alt="Workifyy" className="h-8 w-auto" />
          </Link>

          <h2 className="text-3xl font-black tracking-tight text-white">Welcome back.</h2>
          <p className="mt-2 text-sm text-white/40">Sign in to manage your jobs and bids.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
            {/* EMAIL */}
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-white/40">
                Email
              </label>
              <input
                type="email"
                placeholder="yourname@email.com"
                className={`w-full rounded-full border bg-white/[0.04] px-5 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors ${
                  errors.email
                    ? 'border-red-500/60 focus:border-red-500'
                    : 'border-white/10 focus:border-[#32CD32]/50'
                }`}
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-white/40">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={`w-full rounded-full border bg-white/[0.04] px-5 py-3 pr-10 text-sm text-white placeholder-white/20 outline-none transition-colors ${
                    errors.password
                      ? 'border-red-500/60 focus:border-red-500'
                      : 'border-white/10 focus:border-[#32CD32]/50'
                  }`}
                  {...register('password', { required: 'Password is required' })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 transition-colors hover:text-white/60"
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-400">{errors.password.message}</p>
              )}
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className={`mt-2 w-full rounded-full py-3 text-sm font-black uppercase tracking-widest text-black transition-opacity ${
                loading ? 'cursor-not-allowed bg-[#32CD32]/50' : 'bg-[#32CD32] hover:opacity-90'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                  Logging in...
                </span>
              ) : (
                'Log In'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white/40">
            Don't have an account?{' '}
            <Link to="/auth/ClientSignup" className="font-bold text-[#32CD32] hover:underline">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
