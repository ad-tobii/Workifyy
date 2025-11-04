import { FaMessage } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";

import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const BaseFooter = () => {
  const year = new Date().getFullYear();

  return (
    <div>
      <div className="flex justify-center">
        <hr className="w-[100%] border-gray-500" />
      </div>
      <div className="container flex justify-center space-x-12 pt-8 xsMobile:flex-col xsMobile:items-center xsMobile:gap-10 miniMobile:flex-col miniMobile:items-center miniMobile:gap-10 mobile:flex-col mobile:items-center mobile:gap-10 miniTablet:flex-col miniTablet:items-center miniTablet:gap-10 tablet:flex-col tablet:items-center tablet:gap-10 miniLaptop:flex-col miniLaptop:items-center miniLaptop:gap-10 laptop:justify-around">
        <div>
          <p className="text-[1.3rem] tracking-wide text-white miniMobile:text-[1rem] miniTablet:text-[1.4rem] tablet:text-center">
            &copy; {year} WORKIFYY. All rights reserved.
          </p>
        </div>

        <ul className="flex space-x-11 text-[1.5rem] mobile:gap-10 miniLaptop:gap-9">
          <li>
            <a
              href=""
              target="_blank"
              rel="noreferrer"
              className="text-[2rem] text-white"
            >
              <FaInstagram />
            </a>
          </li>

          <li>
            <a
              href=""
              target="_blank"
              rel="noreferrer"
              className="text-[2rem] text-white"
            >
              <FaXTwitter />
            </a>
          </li>

          <li>
            <a
              href=""
              target="_blank"
              rel="noreferrer"
              className="text-[2rem] text-white"
            >
              <FaFacebook />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

function DashboardFooter() {
  return (
    <footer className="mt-[12.8rem]">
      <div className="flex justify-center">
        <hr className="w-[80rem] border-gray-500" />
      </div>
      <div className="relative mx-auto w-full pb-8">
        <div className="flex content-center justify-between self-center px-10 pb-8 xsMobile:flex-col miniMobile:flex-col mobile:flex-col miniTablet:flex-col tablet:flex-col miniLaptop:flex-col laptop:flex-col">
          <div className="mb-[3rem] mt-[3rem]">
            <a href="#" className="">
              <div className="mt-11">
                <span className="font-logoFonts text-[1.7rem] text-[#32CD32] laptop:text-[1.5rem]">
                  WORKIFYY
                </span>
              </div>
            </a>

            <section className="flex gap-2 py-[2rem]">
              <main className="flex h-[3rem] w-[3rem] items-center justify-center rounded-full border">
                <FaMessage className="text-center text-[1.3rem] text-white" />
              </main>

              <div>
                <h3 className="text-white laptop:text-[1rem]">Email</h3>
                <p>
                  <a
                    href="mailto:Workifyy@gmail.com"
                    className="text-white laptop:text-[1rem]"
                  >
                    Workifyy@gmail.com
                  </a>
                </p>
              </div>
            </section>

            <section className="flex gap-2">
              <main className="flex h-[3rem] w-[3rem] items-center justify-center rounded-full border">
                <FaPhoneAlt className="text-center text-[1.3rem] text-white" />
              </main>

              <div>
                <h3 className="text-white laptop:text-[1rem]">Contact Us</h3>
                <p>
                  <a
                    href="tel:+2349081715621"
                    className="text-white laptop:text-[1rem]"
                  >
                    +2349081715621
                  </a>
                </p>
              </div>
            </section>
          </div>

          <div>
            <h6 className="pb-10 pt-24 text-[1.2rem] uppercase text-white laptop:text-[1.2rem]">
              Company
            </h6>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="#"
                  className="text-[1rem] text-white laptop:text-[1.1rem]"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[1rem] text-white laptop:text-[1.1rem]"
                >
                  Our Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[1rem] text-white laptop:text-[1.1rem]"
                >
                  Community
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="pb-10 pt-24 text-[1.2rem] uppercase text-white laptop:text-[1.2rem]">
              Support
            </h6>

            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="#"
                  className="text-[1rem] text-white laptop:text-[1.1rem]"
                >
                  FAQ
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-[1rem] text-white laptop:text-[1.1rem]"
                >
                  Contact Us
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-[1rem] text-white laptop:text-[1.1rem]"
                >
                  Online Chat
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="pb-10 pt-24 text-[1.2rem] uppercase text-white laptop:text-[1.2rem]">
              Legals
            </h6>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="#"
                  className="text-[1rem] text-white laptop:text-[1.1rem]"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[1rem] text-white laptop:text-[1.1rem]"
                >
                  Terms of Use
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[1rem] text-white laptop:text-[1.1rem]"
                >
                  Terms & Condition
                </a>
              </li>
            </ul>
          </div>
        </div>
        <BaseFooter />
      </div>
    </footer>
  );
}

export default DashboardFooter;
