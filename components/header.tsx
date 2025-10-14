"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Search, User } from "lucide-react"

export function Header() {
  const router = useRouter()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => router.push("/")}>
            <Image
              src="/logo.webp"
              alt="VideoAI Logo"
              width={32}
              height={32}
              className="h-8 w-8 group-hover:scale-110 transition-transform"
            />
            <span className="text-xl font-bold text-foreground tracking-tight">VideoAI</span>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            <a
              href="#"
              className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted/50"
            >
              홈
            </a>
            <a
              href="#"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50"
            >
              기능
            </a>
            <a
              href="#"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50"
            >
              가격
            </a>
            <a
              href="#"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50"
            >
              대시보드
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-muted">
            <Search className="h-4 w-4" />
          </Button>

          <ThemeToggle />

          <Avatar className="h-8 w-8 border-2 border-border hover:border-primary/50 transition-colors cursor-pointer">
            <AvatarImage src="/diverse-user-avatars.png" />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>

          <Button className="gradient-primary text-white font-semibold hover:opacity-90 hover:shadow-lg transition-all">
            시작하기
          </Button>
        </div>
      </div>
    </header>
  )
}
