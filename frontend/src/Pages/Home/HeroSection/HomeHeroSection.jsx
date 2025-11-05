import { Link } from 'react-router-dom'
import Button from '../../../Components/Button'

function HomeHeroSection() {
  return (
    <div className="relative z-50 mx-auto w-full bg-hero-section bg-cover bg-center bg-no-repeat pb-[7rem] pt-20">
      <div className="absolute inset-0 z-10 bg-black opacity-50"></div>

      {/* Content */}
      <div className="container relative z-20">
        <section className="laptop:pl- pl-8 xsMobile:pl-2 mobile:pl-2 miniTablet:pl-2 tablet:pl-2 miniLaptop:pl-2 desktop:pl-2">
          <div className="pt-[4rem] text-white">
            <h3 className="max-w-[51rem] pb-[1rem] text-5xl leading-normal tracking-wide xsMobile:text-[1.3rem] miniMobile:text-[1.5rem] mobile:text-[1.8rem] miniTablet:text-[2.3rem] tablet:pb-3 tablet:text-[2rem] miniLaptop:text-[2.5rem]">
              Local Service, Global Standards
            </h3>
            <p className="text-5xl text-[#32CD32] xsMobile:text-[1rem] miniMobile:text-[1rem] mobile:text-[1.2rem] miniTablet:text-[1.3rem] tablet:text-[1.6rem] miniLaptop:text-[1.8rem] laptop:text-[2rem]">
              Your Trusted Connection
            </p>
          </div>
          <p className="max-w-[35rem] pt-4 text-xl leading-loose tracking-wide text-white miniMobile:text-[1rem] mobile:pr-14 tablet:pr-12 tablet:pt-3 miniLaptop:pr-16">
            Discover the pinnacle of local service, meticulously crafted to meet global standards of
            excellence and reliability.
          </p>

          <div className="flex content-center items-center gap-[1rem] self-center pt-[2.5rem]">
            <div>
              <Link to="/auth/signup">
                <Button
                  name="Get Started"
                  className="rounded border-2 border-[#32CD32] bg-[#32CD32] px-3 py-2 text-xl font-semibold text-white duration-500 ease-in-out hover:bg-transparent hover:text-white hover:transition-all xsMobile:px-1 xsMobile:py-2"
                />
              </Link>
            </div>

            <div>
              <Link to="/auth/ProfessionalSignup">
                <Button
                  name="Join as a Pro"
                  className="rounded border-2 border-[#32CD32] bg-transparent px-3 py-2 text-xl font-semibold text-[#32CD32] duration-500 ease-in-out hover:bg-[#32CD32] hover:text-white hover:transition-all xsMobile:px-1 xsMobile:py-2"
                />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HomeHeroSection
