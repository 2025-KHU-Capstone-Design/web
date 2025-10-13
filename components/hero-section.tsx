"use client"

import { Button } from "@/components/ui/button"
import { Play, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 w-full px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm text-accent font-medium">AI-Powered Video Creation</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6">
            Transform Long Videos into{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Viral Shorts</span>{" "}
            with AI
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground text-balance mb-12 max-w-3xl mx-auto leading-relaxed">
            Upload your video, let our AI find the best moments, and create engaging short-form content in minutes
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="gradient-primary text-primary-foreground hover:opacity-90 transition-opacity px-8 py-6 text-lg animate-pulse-glow"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Start Creating
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-accent/50 text-accent hover:bg-accent/10 px-8 py-6 text-lg bg-transparent"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          <div className="mt-16 relative">
            <div className="glassmorphism rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted/20 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
                    <Play className="h-8 w-8 text-accent" />
                  </div>
                  <p className="text-muted-foreground">AI Video Transformation Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
