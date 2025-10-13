import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { UploadInterface } from "@/components/upload-interface"
import { FeaturesShowcase } from "@/components/features-showcase"
import { AIAnalysisDashboard } from "@/components/ai-analysis-dashboard"
import { GeneratedClipsGallery } from "@/components/generated-clips-gallery"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <UploadInterface />
        <FeaturesShowcase />
        <AIAnalysisDashboard />
        <GeneratedClipsGallery />
      </main>
    </div>
  )
}
