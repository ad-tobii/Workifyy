import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const BaseFooter = () => {
  const year = new Date().getFullYear();

  return (
    <div className="border-t border-solid border-[#ffffff33]">
      <div className="container mt-4 flex justify-center py-5 xsMobile:flex-col xsMobile:items-center xsMobile:gap-10 miniMobile:flex-col miniMobile:items-center miniMobile:gap-10 mobile:flex-col mobile:items-center mobile:gap-10 miniTablet:flex-col miniTablet:items-center miniTablet:gap-10 tablet:flex-col tablet:items-center tablet:gap-10 miniLaptop:flex-col miniLaptop:items-center miniLaptop:gap-10 laptop:justify-around">
        <div>
          <p className="text-[1.3rem] tracking-wide text-[#32CD32] xsMobile:text-[0.8rem] miniMobile:text-[1rem]  miniTablet:text-[1.2rem] tablet:text-center">
            &copy; {year} WORKIFYY. All rights reserved
          </p>
        </div>

        <ul className="flex gap-16 text-[1.5rem] mobile:gap-10 miniLaptop:gap-9 desktop:ml-6 largeDesktop:ml-6">
          <li>
            <a
              href=""
              target="_blank"
              rel="noreferrer"
              className="text-[2rem] text-[#32CD32]"
            >
              <FaInstagram />
            </a>
          </li>

          <li>
            <a
              href=""
              target="_blank"
              rel="noreferrer"
              className="text-[2rem] text-[#32CD32]"
            >
              <FaXTwitter />
            </a>
          </li>

          <li>
            <a
              href=""
              target="_blank"
              rel="noreferrer"
              className="text-[2rem] text-[#32CD32]"
            >
              <FaFacebook />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BaseFooter;
