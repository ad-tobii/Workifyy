import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Nav({ Formnavigation = [] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative w-full bg-[url('/assets/ClientSection.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="pointer-events-none absolute inset-0 z-10 bg-black bg-opacity-50" />

      <header
        className={`absolute inset-x-0 top-0 z-30 border-b border-neutral-900 p-3 transition-all duration-300 ${
          scrolled ? "bg-opacity-60 backdrop-blur-md" : ""
        }`}
      >
        <nav
          className="container flex items-center justify-between"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5 text-white">
              <span className="font-logoFonts text-3xl text-[#32CD32]">
                WORKIFYY
              </span>
            </Link>
          </div>
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
          <div className="hidden text-white lg:flex lg:gap-x-6">
            {Formnavigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={`mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white ${
                  item.name === "Join as Client" ||
                  item.name === "Join as Professional"
                    ? "rounded bg-[#32cd32] px-4 py-2 text-white hover:bg-green-600"
                    : "cursor-none hover:bg-none"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        <Dialog
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-50 bg-white"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 w-full overflow-y-auto bg-black px-6 py-6 miniLaptop:max-w-sm miniLaptop:ring-1 miniLaptop:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5 text-white">
                <span className="font-logoFonts text-3xl text-[#32CD32]">
                  WORKIFYY
                </span>
              </a>
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
                  {Formnavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className={`mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-900 ${
                        item.name === "Join as Client"
                          ? "rounded bg-[#32cd32] px-4 py-2 text-white hover:bg-green-600"
                          : ""
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link className="mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-900 "  to="/auth/login">
                  Log in
                  </Link>
                </div>
                <div className="py-6 w-full text-white">
                  
              
                
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  );
}
