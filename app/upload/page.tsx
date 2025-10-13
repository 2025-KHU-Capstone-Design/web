"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, FileVideo, X } from "lucide-react"

export default function UploadPage() {
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      setSelectedFile(file)
      // 드래그 앤 드롭으로 파일 선택 즉시 결과 페이지로 이동
      router.push("/results")
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      // 파일 선택 즉시 결과 페이지로 이동
      router.push("/results")
    }
  }

  const handleUpload = () => {
    if (selectedFile) {
      // 파일이 선택되면 결과 페이지로 이동
      router.push("/results")
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Upload Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Video</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Let our AI transform your long video into engaging shorts
          </p>
        </div>

        <Card className="p-8 md:p-12">
          {!selectedFile ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-colors ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Drag and drop your video here
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    or click to browse from your computer
                  </p>
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button asChild className="gradient-primary cursor-pointer">
                      <span>
                        <FileVideo className="mr-2 h-4 w-4" />
                        Choose Video File
                      </span>
                    </Button>
                  </label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Supports MP4, MOV, AVI, and more
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileVideo className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRemoveFile}
                  className="hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <Button
                onClick={handleUpload}
                className="w-full gradient-primary text-primary-foreground hover:opacity-90 transition-opacity py-6 text-lg"
                size="lg"
              >
                <Upload className="mr-2 h-5 w-5" />
                Upload and Process Video
              </Button>
            </div>
          )}
        </Card>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <span className="text-primary font-bold">1</span>
            </div>
            <h4 className="font-semibold mb-2">Upload Video</h4>
            <p className="text-sm text-muted-foreground">
              Choose your long-form video
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <span className="text-primary font-bold">2</span>
            </div>
            <h4 className="font-semibold mb-2">AI Analysis</h4>
            <p className="text-sm text-muted-foreground">
              Our AI finds the best moments
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <span className="text-primary font-bold">3</span>
            </div>
            <h4 className="font-semibold mb-2">Get Results</h4>
            <p className="text-sm text-muted-foreground">
              Download your viral shorts
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
