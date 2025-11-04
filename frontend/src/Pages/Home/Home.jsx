import Nav from "../../Components/Nav";
import HomeHeroSection from "./HeroSection/HomeHeroSection";
import Section from "./OverviewSection/Section";
import ClientSection from "./ClientSection/ClientSection";
import AdvantagesSection from "./Advantages/Advantages";
import ValueSection from "./valueSection/valueSection";
import ValueSection2 from "./valueSection2/valueSection2";
import StepsSection from "./WorkifyyStep/StepsSection";
import Footer from "../Home/Footers/Footer";
import { useEffect } from "react";
import ReviewCarousel from "../../Components/reviewCarousel";
import GradientNoise from "./gradientNoise/GradientNoise";
function Home() {
  useEffect(() => {
    document.title = "Home | Workifyy";
  }, []);

  return (
    <div>
      <div>
        <Nav>
          <HomeHeroSection />
        </Nav>
      </div>
      <div>
        <ValueSection/>
</div>
      <div>
        <Section />
      </div>
      <div><ValueSection2/></div>
      <div>
        <AdvantagesSection/>
      </div>

      <div>
        <StepsSection />
      </div>

      <div>
        <ClientSection />
      </div>
      <div>
        <ReviewCarousel/>
</div>
      <div>
        <GradientNoise/>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
