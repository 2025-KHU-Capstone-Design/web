import { Card } from "@/components/ui/card"
import { Sparkles, Target, Scissors, TrendingUp } from "lucide-react"

export function FeaturesShowcase() {
  const features = [
    {
      icon: Sparkles,
      title: "AI 하이라이트 추출",
      description: "머신러닝으로 영상의 핵심 장면을 자동으로 감지하고 추출합니다",
      gradient: "from-primary to-accent",
    },
    {
      icon: Target,
      title: "플랫폼 최적화",
      description: "TikTok, Instagram Reels, YouTube Shorts 각 플랫폼에 최적화된 비율과 포맷으로 자동 변환",
      gradient: "from-accent to-secondary",
    },
    {
      icon: Scissors,
      title: "스마트 편집",
      description: "자막, 효과, 트랜지션을 AI가 자동으로 추가해 완성도 높은 숏폼 제작",
      gradient: "from-secondary to-primary",
    },
    {
      icon: TrendingUp,
      title: "바이럴 분석",
      description: "트렌드 데이터 기반으로 바이럴 가능성이 높은 장면을 우선 추천",
      gradient: "from-primary via-accent to-secondary",
    },
  ]

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            강력한{" "}
            <span className="gradient-video bg-clip-text text-transparent">AI 기술</span>로 완성하는 숏폼
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            복잡한 편집 작업은 AI에게 맡기고, 콘텐츠 제작에만 집중하세요
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <Card
                key={index}
                className="bg-card border border-border p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group"
              >
                <div
                  className={`
                  w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient}
                  flex items-center justify-center mb-5 group-hover:scale-110 transition-transform
                `}
                >
                  <Icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
