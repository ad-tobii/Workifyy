import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Nav from '../../Components/Nav'
import HomeHeroSection from './HeroSection/HomeHeroSection'
import StepsSection from './WorkifyyStep/StepsSection'
import Section from './OverviewSection/Section'
import ValueSection from './valueSection/valueSection'
import ValueSection2 from './valueSection2/valueSection2'
import AdvantagesSection from './Advantages/Advantages'
import ClientSection from './ClientSection/ClientSection'
import ReviewCarousel from '../../Components/reviewCarousel'
import GradientNoise from './gradientNoise/GradientNoise'
import Footer from './Footers/Footer'

function Home() {
  const location = useLocation()

  useEffect(() => {
    document.title = 'Home | Workifyy'
  }, [])

  useEffect(() => {
    const targetId = location.state?.scrollTo
    if (!targetId) return

    window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [location.state])

  return (
    <div className="bg-black">
      {/* 1. Hero split layout */}
      <Nav>
        <div id="home-hero">
          <HomeHeroSection />
        </div>
      </Nav>

      {/* 2. Services ticker */}
      <StepsSection />

      {/* 3. "Browse Professionals" — featured editorial card (ref: "Selected Project") */}
      <Section />

      {/* 4. "What Is Workifyy?" — large headline + numbered how-it-works rows (ref: "What Is Lokotré?") */}
      <ValueSection />

      {/* 5. "Top Professionals" — 2-col image grid (ref: "Primary Homes") */}
      <ValueSection2 />

      {/* 6. "Why Workifyy" — 6-feature grid */}
      <div id="why-workifyy">
        <AdvantagesSection />
      </div>

      {/* 7. Testimonial — single large quote */}
      <ClientSection />

      {/* 8. Reviews carousel */}
      <ReviewCarousel />

      {/* 9. Final CTA with email capture */}
      <GradientNoise />

      {/* 10. Footer */}
      <Footer />
    </div>
  )
}

export default Home
