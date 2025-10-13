import { Card } from "@/components/ui/card"
import { Brain, Smartphone, Palette } from "lucide-react"

export function FeaturesShowcase() {
  const features = [
    {
      icon: Brain,
      title: "Smart Highlight Detection",
      description: "Automatically identifies the most engaging moments using advanced AI algorithms",
      gradient: "from-primary to-secondary",
    },
    {
      icon: Smartphone,
      title: "Multiple Format Export",
      description: "Generate optimized content for TikTok, Instagram Reels, and YouTube Shorts",
      gradient: "from-accent to-primary",
    },
    {
      icon: Palette,
      title: "Custom Branding",
      description: "Add your logo, colors, and style automatically to maintain brand consistency",
      gradient: "from-secondary to-accent",
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powered by{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Advanced AI</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our intelligent platform handles the complex work so you can focus on creating amazing content
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <Card key={index} className="glassmorphism p-8 hover:scale-105 transition-transform duration-300">
                <div
                  className={`
                  w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} 
                  flex items-center justify-center mb-6 animate-float
                `}
                >
                  <Icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
