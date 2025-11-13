"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  Download,
  Share2,
  Edit,
  Filter,
  TrendingUp,
  Clock,
  Zap,
  ArrowLeft,
  Upload as UploadIcon
} from "lucide-react"

// JSON 데이터 구조 - 원본 동영상 정보와 생성된 클립 정보를 포함
const videoResultData = {
  original: {
    title: "Sample Video",
    filename: "sample_video.mp4",
    duration: "10:30",
    uploadDate: "2025-01-15",
    fileSize: "125 MB",
    resolution: "1920x1080",
    fps: 30,
    videoUrl: "https://video-ai-sample.s3.ap-northeast-2.amazonaws.com/1+Minute+Sample+Video.mp4", // S3 URL - 나중에 수정
  },
  analysis: {
    processedDate: "2025-01-15",
    totalHighlights: 4,
    averageScore: 90,
  },
  highlights: [
    { time: "0:45", score: 95, type: "Action Peak", color: "bg-accent" },
    { time: "2:30", score: 88, type: "Emotional", color: "bg-primary" },
    { time: "4:15", score: 92, type: "Dialogue", color: "bg-secondary" },
    { time: "6:20", score: 85, type: "Visual", color: "bg-accent" },
  ],
  generatedClips: [
    {
      id: 1,
      title: "Epic Action Sequence",
      startTime: "0:38",
      endTime: "0:53",
      duration: "0:15",
      score: 95,
      category: "action",
      platform: "TikTok",
      views: "2.4M",
      engagement: "12.5%",
      videoUrl: "https://video-ai-sample.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%B5%E1%86%B7%E1%84%90%E1%85%A5+%E1%84%89%E1%85%B5%E1%84%8B%E1%85%A7%E1%86%AB+%E1%84%8B%E1%85%A7%E1%86%BC%E1%84%89%E1%85%A1%E1%86%BC.mp4", // S3 URL - 나중에 수정
    },
    {
      id: 2,
      title: "Emotional Breakthrough",
      startTime: "2:23",
      endTime: "2:45",
      duration: "0:22",
      score: 88,
      category: "emotional",
      platform: "Instagram",
      views: "1.8M",
      engagement: "15.2%",
      videoUrl: "https://video-ai-sample.s3.ap-northeast-2.amazonaws.com/PAREIDOLIA+-+1+Minute+Short+Film+_+Award+Winning.mp4", // S3 URL - 나중에 수정
    },
    {
      id: 3,
      title: "Key Dialogue Moment",
      startTime: "4:07",
      endTime: "4:25",
      duration: "0:18",
      score: 92,
      category: "dialogue",
      platform: "YouTube",
      views: "3.1M",
      engagement: "18.7%",
      videoUrl: "https://video-ai-sample.s3.ap-northeast-2.amazonaws.com/videoplayback1.mp4", // S3 URL - 나중에 수정
    },
    // {
    //   id: 4,
    //   title: "Visual Spectacle",
    //   startTime: "6:14",
    //   endTime: "6:26",
    //   duration: "0:12",
    //   score: 89,
    //   category: "visual",
    //   platform: "TikTok",
    //   views: "4.2M",
    //   engagement: "22.1%",
    //   thumbnailUrl: "https://s3.amazonaws.com/bucket-name/clips/thumbnails/clip_4_thumb.jpg", // S3 URL - 나중에 수정
    //   videoUrl: "https://s3.amazonaws.com/bucket-name/clips/clip_4.mp4", // S3 URL - 나중에 수정
    // },
    // {
    //   id: 5,
    //   title: "Comedy Gold",
    //   startTime: "7:30",
    //   endTime: "7:55",
    //   duration: "0:25",
    //   score: 94,
    //   category: "comedy",
    //   platform: "Instagram",
    //   views: "5.6M",
    //   engagement: "28.3%",
    //   thumbnailUrl: "https://s3.amazonaws.com/bucket-name/clips/thumbnails/clip_5_thumb.jpg", // S3 URL - 나중에 수정
    //   videoUrl: "https://s3.amazonaws.com/bucket-name/clips/clip_5.mp4", // S3 URL - 나중에 수정
    // },
    // {
    //   id: 6,
    //   title: "Suspenseful Build",
    //   startTime: "9:10",
    //   endTime: "9:30",
    //   duration: "0:20",
    //   score: 87,
    //   category: "suspense",
    //   platform: "YouTube",
    //   views: "2.9M",
    //   engagement: "16.8%",
    //   thumbnailUrl: "https://s3.amazonaws.com/bucket-name/clips/thumbnails/clip_6_thumb.jpg", // S3 URL - 나중에 수정
    //   videoUrl: "https://s3.amazonaws.com/bucket-name/clips/clip_6.mp4", // S3 URL - 나중에 수정
    // },
  ],
}

export default function ResultsPage() {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState("all")

  // JSON 데이터에서 필요한 정보 추출
  const { original, analysis, highlights, generatedClips } = videoResultData

  const filters = [
    { id: "all", label: "All Clips", icon: Filter },
    { id: "best", label: "Best Performing", icon: TrendingUp },
    { id: "longest", label: "Longest", icon: Clock },
    { id: "action", label: "Most Action", icon: Zap },
  ]

  // JSON 데이터 기반 필터링
  const filteredClips =
    activeFilter === "all"
      ? generatedClips
      : activeFilter === "best"
        ? generatedClips.filter((clip) => clip.score >= 90)
        : activeFilter === "longest"
          ? [...generatedClips].sort((a, b) => Number.parseInt(b.duration.split(":")[1]) - Number.parseInt(a.duration.split(":")[1]))
          : generatedClips.filter((clip) => clip.category === "action")

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/upload")}
            className="hover:bg-muted"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Upload New Video
          </Button>
          <Button
            onClick={() => router.push("/upload")}
            className="gradient-primary"
          >
            <UploadIcon className="mr-2 h-4 w-4" />
            Process Another Video
          </Button>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">AI Results</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            We found the best moments in your video
          </p>
        </div>

        {/* Original Video Info */}
        <Card className="glassmorphism p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Play className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-bold">Original Video</h3>
          </div>

          {/* Video Player */}
          <div className="mb-6">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <video
                controls
                className="w-full h-full"
                preload="metadata"
              >
                <source src={original.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-muted/20 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Filename</p>
              <p className="text-sm font-medium truncate">{original.filename}</p>
            </div>
            <div className="p-3 bg-muted/20 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Duration</p>
              <p className="text-sm font-medium">{original.duration}</p>
            </div>
            <div className="p-3 bg-muted/20 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Resolution</p>
              <p className="text-sm font-medium">{original.resolution}</p>
            </div>
            <div className="p-3 bg-muted/20 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">File Size</p>
              <p className="text-sm font-medium">{original.fileSize}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <span>Uploaded: {original.uploadDate}</span>
            <span>•</span>
            <span>Processed: {analysis.processedDate}</span>
            <span>•</span>
            <span>{analysis.totalHighlights} highlights found</span>
            <span>•</span>
            <span>Avg. Score: {analysis.averageScore}%</span>
          </div>
        </Card>

        {/* AI Analysis Dashboard */}
        <Card className="glassmorphism p-6 mb-12">
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

        {/* Generated Clips Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              Generated <span className="text-accent">Clips</span>
            </h2>
            <Button className="gradient-accent text-accent-foreground">
              <Download className="mr-2 h-4 w-4" />
              Export All
            </Button>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {filters.map((filter) => {
              const Icon = filter.icon
              return (
                <Button
                  key={filter.id}
                  variant={activeFilter === filter.id ? "default" : "outline"}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`
                    ${
                      activeFilter === filter.id
                        ? "gradient-primary text-primary-foreground"
                        : "border-primary/30 text-foreground hover:bg-primary/10"
                    }
                  `}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {filter.label}
                </Button>
              )
            })}
          </div>

          {/* Clips Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClips.map((clip) => (
              <Card
                key={clip.id}
                className="glassmorphism overflow-hidden group hover:scale-105 transition-all duration-300"
              >
                {/* Video Player with Letterbox (9:16 ratio) */}
                <div className="relative aspect-[9/16] bg-black">
                  {/* Letterbox Video Container */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <video
                      controls
                      className="w-full h-auto max-h-full object-contain"
                      preload="metadata"
                    >
                      <source src={clip.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  {/* Overlay Info */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between z-10 pointer-events-none">
                    <Badge className="bg-background/80 text-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {clip.duration}
                    </Badge>
                    <Badge variant="secondary" className="bg-accent/20 text-accent">
                      {clip.score}%
                    </Badge>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none">
                    <Badge className="bg-background/80 text-foreground mb-2">{clip.platform}</Badge>
                    <div className="flex justify-between text-xs text-white/90">
                      <span>{clip.views} views</span>
                      <span>{clip.engagement} engagement</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 text-balance">{clip.title}</h3>

                  {/* Clip Time Range */}
                  <div className="text-xs text-muted-foreground mb-4">
                    From {clip.startTime} to {clip.endTime}
                  </div>

                  <div className="flex gap-2 mb-4">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Play className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => router.push(`/results/edit/${clip.id}`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="gradient-accent text-accent-foreground flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
