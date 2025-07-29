import { HeroSection } from './HeroSection'
import { CategoryGrid } from './CategoryGrid'
import { FeaturedApps } from './FeaturedApps'
import { AboutSection } from './AboutSection'

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <FeaturedApps />
      <AboutSection />
    </>
  )
}
