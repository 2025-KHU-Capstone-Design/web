"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Play, Video, Upload, Zap } from "lucide-react"

export function HeroSection() {
  const router = useRouter()
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
              <Video className="h-4 w-4 text-primary" />
              <span className="text-sm text-foreground font-semibold">AI-Powered Video Shorts</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-balance mb-6 leading-tight">
              Turn Long Videos into <span className="gradient-video">Viral Clips</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground text-balance mb-10 max-w-2xl mx-auto">
              AI가 자동으로 최고의 순간을 찾아내고, 클릭 한 번으로 TikTok, Reels, Shorts용 영상을 만들어드립니다
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => router.push("/upload")}
                className="gradient-primary text-white hover:opacity-90 transition-all px-10 py-7 text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Upload className="mr-2 h-5 w-5" />
                무료로 시작하기
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-2 border-muted hover:border-primary/50 hover:bg-primary/5 px-10 py-7 text-lg font-semibold transition-all"
              >
                <Play className="mr-2 h-5 w-5" />
                데모 보기
              </Button>
            </div>
          </div>

          {/* Video Process Flow */}
          <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-lg">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">1. 동영상 업로드</h3>
              <p className="text-sm text-muted-foreground">긴 영상을 드래그 앤 드롭으로 간편하게 업로드하세요</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-lg">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-bold text-lg mb-2">2. AI 자동 분석</h3>
              <p className="text-sm text-muted-foreground">AI가 하이라이트 장면을 자동으로 추출합니다</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-lg">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <Video className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-bold text-lg mb-2">3. 숏폼 완성</h3>
              <p className="text-sm text-muted-foreground">다양한 플랫폼에 최적화된 숏폼을 다운로드하세요</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
