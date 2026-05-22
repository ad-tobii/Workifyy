import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const defaultNavigation = [
  { name: 'Home', to: '/', targetId: 'home-hero' },
  { name: 'How It Works', to: '/', targetId: 'why-workifyy' },
  { name: 'For Pros', to: '/auth/ProfessionalSignup' },
]

export default function Nav({ children, showNavItems = true, customNavigation }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const navigation = customNavigation || defaultNavigation
  const isSignupPage = location.pathname === '/signup'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = targetId => {
    const section = document.getElementById(targetId)
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleNavClick = item => {
    if (!item.targetId) return

    if (location.pathname === '/') {
      scrollToSection(item.targetId)
      return
    }

    navigate('/', { state: { scrollTo: item.targetId } })
  }

  return (
    <div className="relative">
      <header
        className={`fixed inset-x-0 top-0 z-30 transition-colors duration-300 ${
          scrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav className="flex items-center justify-between px-8 py-4 md:px-14 lg:px-20 xl:px-24">
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <img src="/assets/workifyy-logo.png" alt="Workifyy" className="h-7 w-auto" />
          </Link>

          {/* Center nav — desktop */}
          {!isSignupPage && showNavItems && (
            <div className="hidden items-center gap-8 lg:flex">
              {navigation.map((item, i) => (
                item.targetId ? (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleNavClick(item)}
                    className="text-sm font-medium text-white/70 transition-colors hover:text-white"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={i}
                    to={item.to}
                    className="text-sm font-medium text-white/70 transition-colors hover:text-white"
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          )}

          {/* Right — CTA + mobile hamburger */}
          <div className="flex items-center gap-3">
            {!isSignupPage && showNavItems && (
              <div className="hidden items-center gap-3 lg:flex">
                <Link
                  to="/auth/signin"
                  className="text-xs font-bold uppercase tracking-widest text-white/60 transition-colors hover:text-white"
                >
                  Log In
                </Link>
                <Link to="/auth/ClientSignup">
                  <button className="rounded-full bg-[#32CD32] px-5 py-2 text-xs font-black uppercase tracking-widest text-black transition-opacity hover:opacity-90">
                    Post a Job
                  </button>
                </Link>
              </div>
            )}

            {!isSignupPage && (
              <button
                type="button"
                className="flex items-center justify-center rounded-sm p-2 text-white lg:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
          </div>
        </nav>

        {/* Mobile menu */}
        <Dialog
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-50 lg:hidden"
        >
          <div className="fixed inset-0 z-40 bg-black/60" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm">
            <div className="flex items-center justify-between">
              <Link to="/">
                <img src="/assets/workifyy-logo.png" alt="Workifyy" className="h-7 w-auto" />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-8 flow-root">
              <div className="flex flex-col gap-1">
                {navigation.map((item, i) => (
                  item.targetId ? (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        handleNavClick(item)
                        setMobileMenuOpen(false)
                      }}
                      className="rounded px-3 py-3 text-left text-base font-medium text-white/70 hover:bg-white/5 hover:text-white"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      key={i}
                      to={item.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded px-3 py-3 text-base font-medium text-white/70 hover:bg-white/5 hover:text-white"
                    >
                      {item.name}
                    </Link>
                  )
                ))}
                <Link to="/auth/signin" onClick={() => setMobileMenuOpen(false)}
                  className="mt-4 block rounded px-3 py-3 text-base font-medium text-white/70 hover:bg-white/5 hover:text-white"
                >
                  Log In
                </Link>
                <Link to="/auth/ClientSignup" onClick={() => setMobileMenuOpen(false)}>
                  <button className="mt-2 w-full rounded-full bg-[#32CD32] px-4 py-3 text-xs font-black uppercase tracking-widest text-black">
                    Post a Job
                  </button>
                </Link>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div className="relative z-20">{children}</div>
    </div>
  )
}
