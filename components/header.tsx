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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
            <Image src="/logo.svg" alt="VideoAI Logo" width={32} height={32} className="h-8 w-8" />
            <span className="text-xl font-bold text-foreground">VideoAI</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-foreground hover:text-accent transition-colors">
              Home
            </a>
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
              Features
            </a>
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
              Pricing
            </a>
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
              Dashboard
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-4 w-4" />
          </Button>

          <ThemeToggle />

          <Avatar className="h-8 w-8">
            <AvatarImage src="/diverse-user-avatars.png" />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>

          <Button className="gradient-primary text-primary-foreground hover:opacity-90 transition-opacity">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  )
}
