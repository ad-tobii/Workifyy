import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function StepsSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const steps = [
    {
      imgSrc: "/assets/Character1.svg",
      text: "Apply to Workifyy",
    },
    {
      imgSrc: "/assets/Character3.svg",
      text: "Get Verified",
    },
    {
      imgSrc: "/assets/Character2.svg",
      text: "Start Working",
    },
  ];

  return (
    <div className="container mt-[10rem]">
      <div className="mx-auto">
        <div className="text-center">
          <h1 className="text-[3.5rem] tracking-normal text-[#32CD32] xsMobile:text-[1.3rem] miniMobile:text-[1.5rem] mobile:text-[2rem] miniTablet:text-[2.3rem] tablet:text-[2.5rem] miniLaptop:text-[2.8rem]">
            Three steps to be a workifier
          </h1>
        </div>

        <div className="mx-auto mt-[3rem] max-w-4xl">
          {isMobile ? (
            <Carousel
              showThumbs={false}
              infiniteLoop={true}
              autoPlay={true}
              showStatus={false}
              showIndicators={false}
            >
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <img
                    src={step.imgSrc}
                    alt=""
                    className="mx-auto h-[8rem] w-[8rem]"
                  />
                  <p className="mx-auto pt-3 text-center text-white">
                    {step.text}
                  </p>
                </div>
              ))}
            </Carousel>
          ) : (
            <div className="flex justify-center gap-[10rem] self-center laptop:gap-[6rem]">
              {steps.map((step, index) => (
                <div key={index} className="p- mx-auto">
                  <img src={step.imgSrc} alt="" className="tablet:w-[6.5rem]" />
                  <p className="mx-auto pt-3 text-center text-white">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
