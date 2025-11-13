"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Save,
  Play,
  Pause,
  RotateCcw,
  Type,
  Settings,
  Download,
  Maximize,
  X,
  Move,
} from "lucide-react"

// 임시 데이터 - 실제로는 props나 API로 받아올 것
const clipData = {
  1: {
    id: 1,
    title: "Epic Action Sequence",
    startTime: "0:38",
    endTime: "0:53",
    duration: "0:15",
    score: 95,
    category: "action",
    platform: "TikTok",
    videoUrl: "https://video-ai-sample.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%B5%E1%86%B7%E1%84%90%E1%85%A5+%E1%84%89%E1%85%B5%E1%84%8B%E1%85%A7%E1%86%AB+%E1%84%8B%E1%85%A7%E1%86%BC%E1%84%89%E1%85%A1%E1%86%BC.mp4",
  },
  2: {
    id: 2,
    title: "Emotional Breakthrough",
    startTime: "2:23",
    endTime: "2:45",
    duration: "0:22",
    score: 88,
    category: "emotional",
    platform: "Instagram",
    videoUrl: "https://video-ai-sample.s3.ap-northeast-2.amazonaws.com/PAREIDOLIA+-+1+Minute+Short+Film+_+Award+Winning.mp4",
  },
  3: {
    id: 3,
    title: "Key Dialogue Moment",
    startTime: "4:07",
    endTime: "4:25",
    duration: "0:18",
    score: 92,
    category: "dialogue",
    platform: "YouTube",
    videoUrl: "https://video-ai-sample.s3.ap-northeast-2.amazonaws.com/videoplayback1.mp4",
  },
}

interface Subtitle {
  id: string
  text: string
  x: number
  y: number
  fontSize: number
}

export default function EditClipPage() {
  const router = useRouter()
  const params = useParams()
  const clipId = params.id as string
  const clip = clipData[clipId as keyof typeof clipData]

  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [clipTitle, setClipTitle] = useState(clip?.title || "")
  const [aspectRatio, setAspectRatio] = useState("9:16") // 기본값
  const [trimStart, setTrimStart] = useState(0)
  const [trimEnd, setTrimEnd] = useState(100)
  const [subtitles, setSubtitles] = useState<Subtitle[]>([])
  const [isAddingSubtitle, setIsAddingSubtitle] = useState(false)
  const [hoveredSubtitle, setHoveredSubtitle] = useState<string | null>(null)
  const [draggingSubtitle, setDraggingSubtitle] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isSeeking, setIsSeeking] = useState(false)
  const progressBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed
    }
  }, [playbackSpeed])

  // Trim 범위가 변경되면 비디오를 시작점으로 이동
  useEffect(() => {
    if (videoRef.current && duration > 0) {
      const startTime = (trimStart / 100) * duration
      const endTime = (trimEnd / 100) * duration

      // 현재 재생 위치가 trim 범위를 벗어나면 시작점으로 이동
      if (videoRef.current.currentTime < startTime || videoRef.current.currentTime > endTime) {
        videoRef.current.currentTime = startTime
      }
    }
  }, [trimStart, trimEnd, duration])

  const togglePlay = () => {
    if (videoRef.current && duration > 0) {
      const startTime = (trimStart / 100) * duration
      const endTime = (trimEnd / 100) * duration

      if (isPlaying) {
        videoRef.current.pause()
      } else {
        // 재생 시작 시 trim 범위 내에 있는지 확인
        if (videoRef.current.currentTime < startTime || videoRef.current.currentTime >= endTime) {
          videoRef.current.currentTime = startTime
        }
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const resetVideo = () => {
    if (videoRef.current && duration > 0) {
      const startTime = (trimStart / 100) * duration
      videoRef.current.currentTime = startTime
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const handleVideoClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isAddingSubtitle || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    const newSubtitle: Subtitle = {
      id: Date.now().toString(),
      text: "자막을 입력하세요",
      x,
      y,
      fontSize: 16,
    }

    setSubtitles([...subtitles, newSubtitle])
    setIsAddingSubtitle(false)
  }

  const updateSubtitle = (id: string, text: string) => {
    setSubtitles(subtitles.map((sub) => (sub.id === id ? { ...sub, text } : sub)))
  }

  const deleteSubtitle = (id: string) => {
    setSubtitles(subtitles.filter((sub) => sub.id !== id))
    setHoveredSubtitle(null)
  }

  const handleSubtitleMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    if (!containerRef.current) return

    const subtitle = subtitles.find((s) => s.id === id)
    if (!subtitle) return

    const rect = containerRef.current.getBoundingClientRect()
    const offsetX = e.clientX - (rect.left + (subtitle.x / 100) * rect.width)
    const offsetY = e.clientY - (rect.top + (subtitle.y / 100) * rect.height)

    setDraggingSubtitle(id)
    setDragOffset({ x: offsetX, y: offsetY })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!draggingSubtitle || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left - dragOffset.x) / rect.width) * 100
    const y = ((e.clientY - rect.top - dragOffset.y) / rect.height) * 100

    setSubtitles(
      subtitles.map((sub) =>
        sub.id === draggingSubtitle ? { ...sub, x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) } : sub
      )
    )
  }

  const handleMouseUp = () => {
    setDraggingSubtitle(null)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !videoRef.current || duration === 0) return

    const rect = progressBarRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = (clickX / rect.width) * 100

    // Trim 범위 내에서만 이동 가능
    const clampedPercentage = Math.max(trimStart, Math.min(trimEnd, percentage))
    const newTime = (clampedPercentage / 100) * duration

    videoRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleProgressBarMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsSeeking(true)
    handleProgressBarClick(e)
  }

  const handleProgressBarMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSeeking) return
    handleProgressBarClick(e)
  }

  const handleProgressBarMouseUp = () => {
    setIsSeeking(false)
  }

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "16:9":
        return "aspect-video"
      case "4:3":
        return "aspect-[4/3]"
      case "1:1":
        return "aspect-square"
      case "4:5":
        return "aspect-[4/5]"
      case "3:4":
        return "aspect-[3/4]"
      case "9:16":
        return "aspect-[9/16]"
      default:
        return "aspect-[9/16]"
    }
  }

  const handleSave = () => {
    const editedData = {
      clipId,
      title: clipTitle,
      playbackSpeed,
      aspectRatio,
      trimStart,
      trimEnd,
      subtitles,
    }
    console.log("Saving edited clip:", editedData)
    // TODO: API로 저장
    alert("편집 내용이 저장되었습니다!")
  }

  const handleExport = async () => {
    const editedData = {
      clipId,
      title: clipTitle,
      playbackSpeed,
      aspectRatio,
      trimStart,
      trimEnd,
      subtitles,
    }

    // 편집 데이터 저장
    console.log("Exporting edited clip:", editedData)

    // 비디오 다운로드
    try {
      if (!clip?.videoUrl) {
        alert("비디오 URL이 없습니다.")
        return
      }

      // 파일명 생성 (제목을 파일명으로 사용, 특수문자 제거)
      const sanitizedTitle = clipTitle.replace(/[^a-zA-Z0-9가-힣\s]/g, "").replace(/\s+/g, "_")
      const filename = `${sanitizedTitle || "edited_clip"}.mp4`

      // 비디오 다운로드
      const response = await fetch(clip.videoUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      alert(`"${clipTitle}" 비디오가 다운로드되었습니다!`)

      // TODO: 실제로는 편집된 비디오(trim, speed, subtitles 적용)를 서버에서 생성하여 다운로드
    } catch (error) {
      console.error("Export error:", error)
      alert("비디오 다운로드 중 오류가 발생했습니다.")
    }
  }

  if (!clip) {
    return <div>Clip not found</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => router.push("/results")} className="hover:bg-muted">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Results
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button className="gradient-accent text-accent-foreground" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Edit <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Clip</span>
          </h1>
          <p className="text-muted-foreground">Customize your clip with various editing options</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video Preview */}
          <div className="lg:col-span-2">
            <Card className="glassmorphism p-6">
              <h3 className="text-xl font-bold mb-4">Preview</h3>

              {/* Video Container with Aspect Ratio - Fixed max width */}
              <div
                ref={containerRef}
                className={`relative ${getAspectRatioClass()} bg-black rounded-lg overflow-hidden mx-auto max-w-md cursor-${isAddingSubtitle ? "crosshair" : "default"}`}
                onClick={handleVideoClick}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <video
                    ref={videoRef}
                    className="w-full h-auto max-h-full object-contain"
                    preload="metadata"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onTimeUpdate={(e) => {
                      const time = e.currentTarget.currentTime
                      setCurrentTime(time)

                      // Trim 범위를 벗어나면 정지
                      if (duration > 0) {
                        const endTime = (trimEnd / 100) * duration
                        if (time >= endTime) {
                          e.currentTarget.pause()
                          const startTime = (trimStart / 100) * duration
                          e.currentTarget.currentTime = startTime
                        }
                      }
                    }}
                    onLoadedMetadata={(e) => {
                      const dur = e.currentTarget.duration
                      setDuration(dur)
                      // 비디오 로드 시 trim 시작점으로 이동
                      const startTime = (trimStart / 100) * dur
                      e.currentTarget.currentTime = startTime
                    }}
                  >
                    <source src={clip.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* Subtitles Overlay */}
                {subtitles.map((subtitle) => (
                  <div
                    key={subtitle.id}
                    className="absolute group"
                    style={{
                      left: `${subtitle.x}%`,
                      top: `${subtitle.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    onMouseEnter={() => setHoveredSubtitle(subtitle.id)}
                    onMouseLeave={() => !draggingSubtitle && setHoveredSubtitle(null)}
                  >
                    <div
                      className="text-white font-bold cursor-move select-none"
                      style={{
                        fontSize: `${subtitle.fontSize}px`,
                        textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                      }}
                      onMouseDown={(e) => handleSubtitleMouseDown(e, subtitle.id)}
                      onClick={(e) => {
                        e.stopPropagation()
                        const newText = prompt("자막 수정:", subtitle.text)
                        if (newText !== null) {
                          updateSubtitle(subtitle.id, newText)
                        }
                      }}
                    >
                      {subtitle.text}
                    </div>

                    {/* Control Buttons */}
                    {hoveredSubtitle === subtitle.id && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex gap-1 bg-black/80 rounded px-2 py-1">
                        <button
                          className="text-white hover:text-accent p-1"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteSubtitle(subtitle.id)
                          }}
                          title="삭제"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        <button
                          className="text-white hover:text-accent p-1 cursor-move"
                          onMouseDown={(e) => handleSubtitleMouseDown(e, subtitle.id)}
                          title="이동"
                        >
                          <Move className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Video Status Bar */}
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <div
                  ref={progressBarRef}
                  className="w-full h-3 bg-muted rounded-full overflow-hidden relative cursor-pointer group"
                  onMouseDown={handleProgressBarMouseDown}
                  onMouseMove={handleProgressBarMouseMove}
                  onMouseUp={handleProgressBarMouseUp}
                  onMouseLeave={handleProgressBarMouseUp}
                >
                  {/* Full timeline */}
                  <div className="absolute inset-0 bg-muted" />
                  {/* Trimmed range background */}
                  <div
                    className="absolute top-0 bottom-0 bg-muted-foreground/30"
                    style={{
                      left: `${trimStart}%`,
                      right: `${100 - trimEnd}%`,
                    }}
                  />
                  {/* Current progress */}
                  <div
                    className="absolute top-0 bottom-0 bg-accent transition-all"
                    style={{
                      left: `${trimStart}%`,
                      width: `${duration > 0 ? ((currentTime / duration) * 100 - trimStart) : 0}%`,
                    }}
                  />
                  {/* Playhead indicator */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-lg transition-all"
                    style={{
                      left: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    {/* Playhead handle */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Trimmed: {formatTime((trimStart / 100) * duration)} - {formatTime((trimEnd / 100) * duration)}</span>
                  <span>Speed: {playbackSpeed}x</span>
                </div>
              </div>

              {/* Video Controls */}
              <div className="flex items-center justify-center gap-4 mt-4">
                <Button size="sm" variant="outline" onClick={resetVideo}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button size="lg" onClick={togglePlay} className="gradient-primary">
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </Button>
              </div>
            </Card>
          </div>

          {/* Editing Controls */}
          <div className="space-y-4">
            {/* Metadata */}
            <Card className="glassmorphism p-6">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="h-5 w-5 text-primary" />
                <h3 className="font-bold">Metadata</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={clipTitle}
                    onChange={(e) => setClipTitle(e.target.value)}
                    placeholder="Enter clip title"
                  />
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary">{clip.platform}</Badge>
                  <Badge variant="outline">Score: {clip.score}%</Badge>
                </div>
              </div>
            </Card>

            {/* Playback Speed */}
            <Card className="glassmorphism p-6">
              <h3 className="font-bold mb-4">Playback Speed</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Speed</span>
                  <span className="text-accent font-medium">{playbackSpeed}x</span>
                </div>
                <Slider
                  value={[playbackSpeed]}
                  onValueChange={(value) => setPlaybackSpeed(value[0])}
                  min={0.25}
                  max={2}
                  step={0.25}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0.25x</span>
                  <span>2x</span>
                </div>
              </div>
            </Card>

            {/* Aspect Ratio / Layout */}
            <Card className="glassmorphism p-6">
              <div className="flex items-center gap-2 mb-4">
                <Maximize className="h-5 w-5 text-primary" />
                <h3 className="font-bold">Aspect Ratio</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "16:9", label: "16:9 (기본)" },
                  { value: "4:3", label: "4:3" },
                  { value: "1:1", label: "정사각형" },
                  { value: "4:5", label: "4:5" },
                  { value: "3:4", label: "3:4" },
                  { value: "9:16", label: "세로 (9:16)" },
                ].map((ratio) => (
                  <Button
                    key={ratio.value}
                    size="sm"
                    variant={aspectRatio === ratio.value ? "default" : "outline"}
                    onClick={() => setAspectRatio(ratio.value)}
                    className={aspectRatio === ratio.value ? "gradient-primary" : ""}
                  >
                    {ratio.label}
                  </Button>
                ))}
              </div>
            </Card>

            {/* Trim Duration */}
            <Card className="glassmorphism p-6">
              <h3 className="font-bold mb-4">Trim Duration</h3>
              <div className="space-y-4">
                {/* Timeline Visual */}
                <div className="relative h-12 bg-muted/20 rounded-lg overflow-hidden">
                  {/* Full Timeline */}
                  <div className="absolute inset-0 bg-muted/40" />

                  {/* Active Range */}
                  <div
                    className="absolute top-0 bottom-0 bg-accent/30 border-l-2 border-r-2 border-accent"
                    style={{
                      left: `${trimStart}%`,
                      right: `${100 - trimEnd}%`,
                    }}
                  />

                  {/* Start Handle */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-accent cursor-ew-resize hover:w-2 transition-all"
                    style={{ left: `${trimStart}%` }}
                  />

                  {/* End Handle */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-accent cursor-ew-resize hover:w-2 transition-all"
                    style={{ left: `${trimEnd}%` }}
                  />

                  {/* Time Labels */}
                  <div className="absolute inset-0 flex items-center justify-between px-2 text-xs text-foreground pointer-events-none">
                    <span>{trimStart}%</span>
                    <span>{trimEnd}%</span>
                  </div>
                </div>

                {/* Slider Controls */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Start Point</span>
                      <span className="text-accent font-medium">{trimStart}%</span>
                    </div>
                    <Slider
                      value={[trimStart]}
                      onValueChange={(value) => setTrimStart(Math.min(value[0], trimEnd - 1))}
                      min={0}
                      max={100}
                      step={0.1}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>End Point</span>
                      <span className="text-accent font-medium">{trimEnd}%</span>
                    </div>
                    <Slider
                      value={[trimEnd]}
                      onValueChange={(value) => setTrimEnd(Math.max(value[0], trimStart + 1))}
                      min={0}
                      max={100}
                      step={0.1}
                    />
                  </div>
                </div>

                {/* Duration Info */}
                <div className="pt-2 border-t border-muted">
                  <p className="text-xs text-muted-foreground">
                    Selected duration: <span className="text-accent font-medium">{(trimEnd - trimStart).toFixed(1)}%</span> of
                    original
                  </p>
                </div>
              </div>
            </Card>

            {/* Subtitles */}
            <Card className="glassmorphism p-6">
              <div className="flex items-center gap-2 mb-4">
                <Type className="h-5 w-5 text-primary" />
                <h3 className="font-bold">Subtitles</h3>
              </div>
              <div className="space-y-3">
                <Button
                  variant={isAddingSubtitle ? "default" : "outline"}
                  onClick={() => setIsAddingSubtitle(!isAddingSubtitle)}
                  className={`w-full ${isAddingSubtitle ? "gradient-primary" : ""}`}
                >
                  {isAddingSubtitle ? "클릭하여 자막 위치 선택" : "자막 추가"}
                </Button>
                {subtitles.length > 0 && (
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• 자막을 클릭하여 수정</p>
                    <p>• 자막에 마우스 올려서 X(삭제) 또는 이동 버튼 사용</p>
                    <p>• 드래그하여 위치 이동</p>
                    <p className="text-accent">총 {subtitles.length}개 자막</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
