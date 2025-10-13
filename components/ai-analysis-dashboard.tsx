"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, TrendingUp, Clock } from "lucide-react"

export function AIAnalysisDashboard() {
  const highlights = [
    { time: "0:45", score: 95, type: "Action Peak", color: "bg-accent" },
    { time: "2:30", score: 88, type: "Emotional", color: "bg-primary" },
    { time: "4:15", score: 92, type: "Dialogue", color: "bg-secondary" },
    { time: "6:20", score: 85, type: "Visual", color: "bg-accent" },
  ]

  const clips = [
    { id: 1, thumbnail: "action-clip", duration: "0:15", score: 95, title: "Epic Action Sequence" },
    { id: 2, thumbnail: "emotional-clip", duration: "0:12", score: 88, title: "Emotional Moment" },
    { id: 3, thumbnail: "dialogue-clip", duration: "0:18", score: 92, title: "Key Dialogue" },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI Analysis <span className="text-accent">Dashboard</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            See how our AI identifies the most engaging moments in your content
          </p>
        </div>

        <div className="mb-12">
          <Card className="glassmorphism p-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="h-6 w-6 text-accent" />
              <h3 className="text-xl font-bold">Engagement Timeline</h3>
            </div>

            <div className="space-y-4">
              <div className="relative h-20 bg-muted/30 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-2 bg-muted rounded-full relative">
                    {highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className={`absolute top-0 w-3 h-2 ${highlight.color} rounded-full transform -translate-y-1/2`}
                        style={{ left: `${(index + 1) * 20}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
                    <div className={`w-3 h-3 ${highlight.color} rounded-full`} />
                    <div>
                      <p className="text-sm font-medium">{highlight.time}</p>
                      <p className="text-xs text-muted-foreground">{highlight.type}</p>
                    </div>
                    <Badge variant="secondary" className="ml-auto">
                      {highlight.score}%
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Generated Clips Preview */}
        <Card className="glassmorphism p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Play className="h-6 w-6 text-accent" />
              <h3 className="text-xl font-bold">Generated Clips</h3>
            </div>
            <Button className="gradient-primary text-primary-foreground">Export All</Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {clips.map((clip) => (
              <div key={clip.id} className="group cursor-pointer">
                <div className="relative aspect-[9/16] bg-gradient-to-br from-muted/50 to-muted/20 rounded-xl overflow-hidden mb-3 group-hover:scale-105 transition-transform">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/40 transition-colors">
                      <Play className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-background/80 text-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {clip.duration}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="secondary">{clip.score}% match</Badge>
                  </div>
                </div>
                <h4 className="font-medium mb-2">{clip.title}</h4>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Preview
                  </Button>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                  <Button size="sm" className="gradient-accent text-accent-foreground">
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}
