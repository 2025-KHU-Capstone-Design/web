"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, FileVideo, CheckCircle, Brain, Download, Scissors, Monitor, Smartphone, Square } from "lucide-react"

export function UploadInterface() {
  const [dragActive, setDragActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [showCustomization, setShowCustomization] = useState(false)
  const [selectedAspectRatio, setSelectedAspectRatio] = useState("9:16")
  const [highlightCriteria, setHighlightCriteria] = useState({
    dynamism: true,
    transitions: true,
    faceDetection: false,
    audioIntensity: true,
    textOverlay: false,
  })

  const steps = [
    { icon: Upload, label: "Upload", description: "Drop your video file" },
    { icon: Brain, label: "Analyze", description: "AI finds highlights" },
    { icon: FileVideo, label: "Generate", description: "Create short clips" },
    { icon: Download, label: "Export", description: "Download & share" },
  ]

  const aspectRatios = [
    { ratio: "16:9", label: "Landscape", icon: Monitor, description: "YouTube, Desktop" },
    { ratio: "9:16", label: "Portrait", icon: Smartphone, description: "TikTok, Stories" },
    { ratio: "1:1", label: "Square", icon: Square, description: "Instagram Post" },
    { ratio: "4:5", label: "Vertical", icon: Smartphone, description: "Instagram Feed" },
  ]

  const highlightOptions = [
    { key: "dynamism", label: "역동성 (Dynamism)", description: "빠른 움직임과 액션 감지" },
    { key: "transitions", label: "화면 전환 (Screen Transitions)", description: "장면 변화와 컷 감지" },
    { key: "faceDetection", label: "얼굴 인식 (Face Detection)", description: "인물 중심 장면 우선" },
    { key: "audioIntensity", label: "오디오 강도 (Audio Intensity)", description: "음성과 음악 강조 구간" },
    { key: "textOverlay", label: "텍스트 오버레이 (Text Overlay)", description: "자막과 텍스트가 있는 구간" },
  ]

  return (
    <section className="py-20 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Upload & Transform in <span className="text-accent">Minutes</span>
          </h2>
          <p className="text-xl text-muted-foreground">Simple drag-and-drop interface powered by advanced AI</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4 md:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = index === currentStep
              const isCompleted = index < currentStep

              return (
                <div key={index} className="flex items-center">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`
                      w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                      ${
                        isCompleted
                          ? "bg-accent text-accent-foreground"
                          : isActive
                            ? "bg-primary text-primary-foreground animate-pulse-glow"
                            : "bg-muted text-muted-foreground"
                      }
                    `}
                    >
                      {isCompleted ? <CheckCircle className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                    </div>
                    <div className="text-center">
                      <p className={`text-sm font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                        {step.label}
                      </p>
                      <p className="text-xs text-muted-foreground hidden md:block">{step.description}</p>
                    </div>
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`
                      w-8 md:w-16 h-0.5 mx-2 md:mx-4 transition-colors duration-300
                      ${index < currentStep ? "bg-accent" : "bg-muted"}
                    `}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Upload Zone */}
        <Card className="glassmorphism border-dashed border-2 border-primary/30 hover:border-primary/50 transition-colors">
          <div
            className={`
              p-12 text-center transition-all duration-300
              ${dragActive ? "bg-primary/10 scale-105" : "hover:bg-primary/5"}
            `}
            onDragEnter={() => setDragActive(true)}
            onDragLeave={() => setDragActive(false)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              setDragActive(false)
              setShowCustomization(true)
            }}
          >
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
              <Upload className="h-10 w-10 text-accent" />
            </div>

            <h3 className="text-2xl font-bold mb-4">Drop your video here</h3>
            <p className="text-muted-foreground mb-6">or click to browse your files</p>

            <Button
              className="gradient-primary text-primary-foreground hover:opacity-90 mb-4"
              onClick={() => setShowCustomization(true)}
            >
              Choose File
            </Button>

            <p className="text-sm text-muted-foreground">Supports MP4, MOV, AVI up to 2GB</p>
          </div>
        </Card>

        {/* Clip Settings */}
        {showCustomization && (
          <Card className="glassmorphism mt-8 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Scissors className="h-6 w-6 text-accent" />
              <h3 className="text-xl font-bold">Clip Settings</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Platform Format</label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm" className="text-xs bg-transparent">
                    TikTok
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs bg-transparent">
                    Instagram
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs bg-transparent">
                    YouTube
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block">화면 비율 (Aspect Ratio)</label>
                <div className="grid grid-cols-2 gap-3">
                  {aspectRatios.map((aspect) => {
                    const Icon = aspect.icon
                    const isSelected = selectedAspectRatio === aspect.ratio
                    return (
                      <Button
                        key={aspect.ratio}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        className={`h-auto p-3 flex flex-col items-center gap-2 ${
                          isSelected ? "bg-accent text-accent-foreground" : "bg-transparent"
                        }`}
                        onClick={() => setSelectedAspectRatio(aspect.ratio)}
                      >
                        <Icon className="h-4 w-4" />
                        <div className="text-center">
                          <div className="font-medium text-xs">{aspect.ratio}</div>
                          <div className="text-xs opacity-70">{aspect.label}</div>
                          <div className="text-xs opacity-50">{aspect.description}</div>
                        </div>
                      </Button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Duration Range</label>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">15s</span>
                  <div className="flex-1 h-2 bg-muted rounded-full relative">
                    <div className="absolute left-1/4 right-1/3 h-full bg-accent rounded-full" />
                  </div>
                  <span className="text-sm text-muted-foreground">60s</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block">세부 옵션 (Highlight Detection Criteria)</label>
                <div className="grid grid-cols-1 gap-3">
                  {highlightOptions.map((option) => {
                    const isSelected = highlightCriteria[option.key as keyof typeof highlightCriteria]
                    return (
                      <Button
                        key={option.key}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        className={`h-auto p-4 flex items-center justify-between text-left ${
                          isSelected ? "bg-accent text-accent-foreground" : "bg-transparent hover:bg-muted/50"
                        }`}
                        onClick={() => {
                          setHighlightCriteria((prev) => ({
                            ...prev,
                            [option.key]: !prev[option.key as keyof typeof prev],
                          }))
                        }}
                      >
                        <div className="flex-1">
                          <div className="font-medium text-sm">{option.label}</div>
                          <div className="text-xs opacity-70 mt-1">{option.description}</div>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                            isSelected ? "bg-accent-foreground border-accent-foreground" : "border-muted-foreground"
                          }`}
                        >
                          {isSelected && (
                            <div className="w-full h-full rounded-full bg-accent scale-75 transition-transform" />
                          )}
                        </div>
                      </Button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => setShowCustomization(false)} className="flex-1">
                Skip Settings
              </Button>
              <Button
                className="gradient-primary text-primary-foreground hover:opacity-90 flex-1"
                onClick={() => {
                  setShowCustomization(false)
                  setCurrentStep(1)
                }}
              >
                Apply & Continue
              </Button>
            </div>
          </Card>
        )}

        {/* AI Analysis Preview */}
        {currentStep >= 1 && (
          <Card className="glassmorphism mt-8 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center animate-pulse">
                <Brain className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h4 className="font-semibold">AI Analysis in Progress</h4>
                <p className="text-sm text-muted-foreground">Detecting engaging moments...</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full w-3/4 animate-pulse" />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Analyzing video content</span>
                <span>75%</span>
              </div>
            </div>
          </Card>
        )}
      </div>
    </section>
  )
}
