"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Leaderboard from "./leaderboard"
import CloseCampaignDialog from "./close-campaign-dialog"
import SubmissionsHistory from "./submissions-history"

// Thêm kiểu cho campaign và props
interface Campaign {
  id?: string
  name: string
  image?: string
  status?: string
  description?: string
  activityType?: string
  primaryMetric?: string
  participants?: number
  totalDistance?: number
  startDate?: string | number | Date
  endDate?: string | number | Date
  // thêm các trường khác nếu cần
}

interface CampaignDetailProps {
  campaign: Campaign
  onBack: () => void
}

export default function CampaignDetail({ campaign, onBack }: CampaignDetailProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [showCloseDialog, setShowCloseDialog] = useState(false)

  return (
    <div className="space-y-6">
      <div className="relative h-64 rounded-lg overflow-hidden">
        <Image
          src={campaign.image || "/placeholder.svg?height=256&width=1200&query=campaign activity"}
          alt={campaign.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-end">
          <div className="p-6 w-full">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onBack}
                  className="rounded-full bg-white/20 text-white hover:bg-white/30"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-bold text-white">{campaign.name}</h2>
                    <Badge className="bg-green-100 text-green-800 text-sm">{campaign.status}</Badge>
                  </div>
                  <p className="text-white/90 mt-2">{campaign.description}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {campaign.status !== "Closed" && (
                  <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={() => setShowCloseDialog(true)}>
                    Close Campaign
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-foreground">
            Overview
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="data-[state=active]:bg-white data-[state=active]:text-foreground">
            Leaderboard
          </TabsTrigger>
          <TabsTrigger value="submissions" className="data-[state=active]:bg-white data-[state=active]:text-foreground">
           Approved Submissions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 border border-border">
              <p className="text-sm text-muted-foreground">Activity Type</p>
              <p className="text-2xl font-bold text-foreground mt-2">{campaign.activityType}</p>
            </Card>
            <Card className="p-4 border border-border">
              <p className="text-sm text-muted-foreground">Primary Metric</p>
              <p className="text-lg font-semibold text-foreground mt-2">{campaign.primaryMetric}</p>
            </Card>
            <Card className="p-4 border border-border">
              <p className="text-sm text-muted-foreground">Participants</p>
              <p className="text-2xl font-bold text-foreground mt-2">{campaign.participants}</p>
            </Card>
            <Card className="p-4 border border-border">
              <p className="text-sm text-muted-foreground">Total Distance</p>
              <p className="text-2xl font-bold text-accent mt-2">{campaign.totalDistance} km</p>
            </Card>
          </div>

          <Card className="p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Campaign Details</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Start Date</p>
                <p className="text-lg font-semibold text-foreground mt-1">
                  {new Date(campaign.startDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">End Date</p>
                <p className="text-lg font-semibold text-foreground mt-1">
                  {new Date(campaign.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard">
          <Leaderboard campaign={campaign} />
        </TabsContent>

        <TabsContent value="submissions">
          <SubmissionsHistory campaign={campaign} />
        </TabsContent>
      </Tabs>

      {showCloseDialog && (
        <CloseCampaignDialog
          campaign={campaign}
          onClose={() => setShowCloseDialog(false)}
          onConfirm={() => {
            setShowCloseDialog(false)
            onBack()
          }}
        />
      )}
    </div>
  )
}
