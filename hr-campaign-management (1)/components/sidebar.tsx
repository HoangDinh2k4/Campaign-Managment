"use client"

import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function Sidebar() {
  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-64px)] w-56 bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border overflow-y-auto">
      {/* User Profile Section */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex flex-col items-center text-center">
          <Avatar className="w-16 h-16 bg-sidebar-primary text-sidebar-primary-foreground font-bold text-xl mb-3">
            <AvatarFallback>KN</AvatarFallback>
          </Avatar>
          <p className="font-semibold text-sm">Kid Nguyen</p>
          <p className="text-xs text-sidebar-foreground/70">(Kiet Nguyen)</p>
          <p className="text-xs text-sidebar-foreground/60 mt-1">he/him</p>
          <p className="text-xs text-sidebar-foreground/60">Associate, Software Engineer</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-primary/20 rounded-lg text-sm"
        >
          Personal Information
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-primary/20 rounded-lg text-sm bg-sidebar-primary/10"
        >
          Campaign Management
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-primary/20 rounded-lg text-sm"
        >
          Bonus
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-primary/20 rounded-lg text-sm"
        >
          Absence
        </Button>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-sidebar-border">
        <Button className="w-full gap-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm">
          <LogOut className="w-4 h-4" />
          Log Out
        </Button>
      </div>
    </div>
  )
}
