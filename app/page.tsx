import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesShowcase } from "@/components/features-showcase"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesShowcase />
      </main>
    </div>
  )
}
