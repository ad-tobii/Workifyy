import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'

const defaultNavigation = [
  { name: 'Sign Up', to: '/auth/signup' },
  { name: 'Log In', to: '/auth/signin' },
  { name: 'Explore', to: '' },
]

export default function Nav({ children, showNavItems = true, customNavigation }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigation = customNavigation || defaultNavigation

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isSignupPage = location.pathname === '/signup'

  return (
    <div className="relative">
      <header
        className={`container fixed inset-x-0 top-0 z-30 border-b border-gray-500 p-3 ${
          scrolled ? 'backdrop-blur' : ''
        }`}
      >
        <nav className="container flex items-center justify-between pt-1" aria-label="Global">
          <div className="ml-6 flex lg:flex-1">
            <Link to="/" className="-m-1.5 text-white">
              <span className="font-logoFonts text-3xl text-[#32CD32]">WORKIFYY</span>
            </Link>
          </div>

          {!isSignupPage && (
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
          )}

          {!isSignupPage && showNavItems && (
            <div className="hidden text-white lg:flex lg:gap-x-12">
              {navigation.map((item, index) => (
                <Link
                  key={index}
                  to={item.to}
                  className="relative text-xl font-semibold leading-6 text-white duration-500 ease-in-out after:absolute after:bottom-[-1rem] after:left-0 after:h-[3px] after:w-0 after:bg-[#32cd32] after:transition-all after:duration-300 hover:text-[#32cd32] hover:transition-all hover:after:w-full"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </nav>

        <Dialog
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-50 bg-white"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-out" />

          <Dialog.Panel
            className={`fixed inset-y-0 right-0 w-full transform overflow-y-auto bg-black px-6 py-6 transition-transform duration-300 ease-out miniLaptop:max-w-sm miniLaptop:ring-1 miniLaptop:ring-gray-900/10 ${
              mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            }`}
          >
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5 text-white">
                <span className="font-logoFonts text-3xl text-[#32CD32]">WORKIFYY</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-white">
                <div className="space-y-2 py-6">
                  {navigation.map((item, index) => (
                    <Link
                      key={index}
                      to={item.to}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-900"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div className="relative z-20">{children}</div>
    </div>
  )
}
