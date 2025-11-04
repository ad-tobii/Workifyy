import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  BellIcon,
  CreditCardIcon,
  QuestionMarkCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const NavbarButton = ({ icon: Icon, text, notificationCount }) => (
  <button className="relative flex items-center space-x-1 transition-colors duration-200 hover:text-[#32cd32]">
    <Icon className="h-6 w-6" />
    {text && <span className="hidden md:inline">{text}</span>}
    {notificationCount !== undefined && (
      <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
        {notificationCount}
      </span>
    )}
  </button>
);

const Navbar = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const notificationRef = useRef(null);

  const toggleNotification = () => {
    setIsNotificationOpen((prev) => !prev);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-black p-4 px-10 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/dashboard/Professionaldashboard" className="flex justify-center">
          <div className="font-logoFonts text-2xl text-[#32cd32] transition-colors duration-200 hover:text-[#28a428]">
            Workifyy
          </div>
        </Link>

        {/* Mobile menu button */}
        <div className="flex items-center justify-start space-x-4 md:hidden miniLaptop:hidden laptop:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6 text-white" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-white" />
            )}
          </button>
        </div>

        {/* Desktop menu */}
        <div
          className={`items-center space-x-4 miniLaptop:flex miniLaptop:space-x-8 laptop:flex laptop:space-x-8 desktop:flex desktop:space-x-8 largeDesktop:flex largeDesktop:space-x-8 ${
            isMenuOpen ? "block" : "hidden"
          } xsMobile:hidden miniMobile:hidden mobile:hidden miniTablet:hidden tablet:hidden`}
        >
          <NavbarButton icon={QuestionMarkCircleIcon} text="Help" />
          <Link to="/dashboard/professionalDashboard/Wallet">
            <NavbarButton icon={CreditCardIcon} text="Wallet" />
          </Link>
          <div onClick={toggleNotification} ref={notificationRef}>
            <NavbarButton icon={BellIcon} notificationCount={3} />
          </div>

          {isNotificationOpen && (
            <div className="no-scrollbar absolute right-0 mt-72 h-56 w-80 space-y-3 overflow-y-scroll rounded-lg border border-[#1a1a1a] bg-[#0e0e0e] p-4 shadow-lg">
              <div className="flex items-start space-x-3 rounded-lg p-2 hover:bg-[#2a2a2a]">
                <img
                  src="/assets/sliderworker2.jpg"
                  alt="User 1"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-white">John Doe</p>
                  <p className="text-sm text-gray-300">Accepted your project proposal.</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex justify-center">
                <p className="text-[#32cd32] hover:underline">See all notifications</p>
              </div>
            </div>
          )}

          <Link to="/dashboard/professionalDashboard/Profile">
            <div className="flex items-center space-x-1 transition-opacity duration-200 hover:opacity-80">
              <img
                src="/assets/black-worker.jpg"
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover"
              />
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mt-4 flex flex-col space-y-2 md:hidden">
          <Link
            to="/dashboard/professionalDashboard/Help"
            className="flex items-center space-x-2 p-2 text-white hover:bg-gray-800"
          >
            <QuestionMarkCircleIcon className="h-6 w-6" />
            <span>Help</span>
          </Link>
          <Link
            to="/dashboard/professionalDashboard/Wallet"
            className="flex items-center space-x-2 p-2 text-white hover:bg-gray-800"
          >
            <CreditCardIcon className="h-6 w-6" />
            <span>Wallet</span>
          </Link>
          <button
            onClick={toggleNotification}
            className="flex items-center space-x-2 p-2 text-white hover:bg-gray-800"
          >
            <BellIcon className="h-6 w-6" />
            <span>Notifications</span>
          </button>
          <Link
            to="/dashboard/professionalDashboard/Profile"
            className="flex items-center space-x-2 p-2 text-white hover:bg-gray-800"
          >
            <img
              src="/assets/black-worker.jpg"
              alt="Profile"
              className="h-6 w-6 rounded-full object-cover"
            />
            <span>Profile</span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
