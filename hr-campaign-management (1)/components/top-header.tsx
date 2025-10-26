"use client"

import { Menu, Search, Bell, Zap, MessageSquare } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function TopHeader() {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-border flex items-center justify-between px-6 z-40">
      {/* Left: Menu and HRMS */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-lg hover:bg-muted">
          <Menu className="w-5 h-5 text-foreground" />
        </Button>
        <h1 className="text-lg font-bold text-primary">HRMS</h1>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Input placeholder="Search..." className="pl-4 pr-10 bg-input border-border rounded-lg text-sm" />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      {/* Right: Icons and Avatar */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="rounded-full relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full relative">
          <Zap className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MessageSquare className="w-5 h-5 text-muted-foreground" />
        </Button>
        <Avatar className="w-10 h-10 bg-sidebar-primary text-sidebar-primary-foreground font-bold cursor-pointer">
          <AvatarFallback>KN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
