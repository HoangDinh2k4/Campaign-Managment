"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Edit2, Eye, Trophy, Plus, CheckCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useState } from "react"
import EditCampaignModal from "./edit-campaign-modal"

const mockCampaigns = [
  {
    id: 1,
    name: "Company Running Challenge 2025",
    description: "Join our annual running challenge and compete with colleagues",
    status: "Active",
    startDate: "2025-01-15",
    endDate: "2025-03-15",
    activityType: "Running",
    primaryMetric: "Distance (km)",
    participants: 45,
    totalDistance: 2340,
    image: "/running-marathon-athletes-competition.jpg",
    pendingSubmissions: 5,
  },
  {
    id: 2,
    name: "Fitness Month - March",
    description: "Complete fitness activities and earn points",
    status: "Upcoming",
    startDate: "2025-03-01",
    endDate: "2025-03-31",
    activityType: "Fitness",
    primaryMetric: "Time (minutes)",
    participants: 0,
    totalDistance: 0,
    image: "/fitness-gym-workout-training.jpg",
    pendingSubmissions: 0,
  },
  {
    id: 3,
    name: "Q4 2024 Marathon",
    description: "Long-distance running competition",
    status: "Closed",
    startDate: "2024-10-01",
    endDate: "2024-12-31",
    activityType: "Running",
    primaryMetric: "Distance (km)",
    participants: 38,
    totalDistance: 1890,
    image: "/marathon-long-distance-running.jpg",
    pendingSubmissions: 3,
  },
]

export default function CampaignList({ onCreateCampaign, onViewCampaign, onViewFinalRankings, onViewApprovals }) {
  const [editingCampaign, setEditingCampaign] = useState(null)

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Upcoming":
        return "bg-blue-100 text-blue-800"
      case "Closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalPendingSubmissions = mockCampaigns.reduce((sum, campaign) => sum + campaign.pendingSubmissions, 0)

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Campaign Management</h2>
            <p className="text-muted-foreground mt-1">Manage and monitor all employee activity campaigns</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Button
                onClick={onViewApprovals}
                variant="outline"
                className="gap-2 bg-card border-border hover:bg-muted"
              >
                <CheckCircle className="w-5 h-5" />
                View Approvals
              </Button>
              {totalPendingSubmissions > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center p-0 text-xs font-bold">
                  {totalPendingSubmissions}
                </Badge>
              )}
            </div>
            <Button onClick={onCreateCampaign} className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="w-5 h-5" />
              Create Campaign
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4">
          <Input placeholder="Search campaigns..." className="flex-1 bg-card border-border" />
          <Button variant="outline" className="bg-card border-border">
            Filter
          </Button>
        </div>

        {/* Campaign Cards */}
        <div className="grid gap-4">
          {mockCampaigns.map((campaign) => (
            <Card
              key={campaign.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-card"
            >
              <div className="flex">
                <div className="w-48 h-40 flex-shrink-0 relative">
                  <Image src={campaign.image || "/placeholder.svg"} alt={campaign.name} fill className="object-cover" />
                </div>

                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-foreground">{campaign.name}</h3>
                      <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{campaign.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Activity Type</p>
                        <p className="font-semibold text-foreground">{campaign.activityType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Primary Metric</p>
                        <p className="font-semibold text-foreground">{campaign.primaryMetric}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Participants</p>
                        <p className="font-semibold text-foreground">{campaign.participants}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Distance</p>
                        <p className="font-semibold text-foreground">{campaign.totalDistance} km</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>
                        {new Date(campaign.startDate).toLocaleDateString()} -{" "}
                        {new Date(campaign.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    {campaign.status !== "Closed" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 bg-card border-border hover:bg-muted"
                        onClick={() => setEditingCampaign(campaign)}
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 bg-card border-border hover:bg-muted"
                      onClick={() => onViewCampaign(campaign)}
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                    {campaign.status === "Closed" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 bg-card border-border hover:bg-muted"
                        onClick={() => onViewFinalRankings(campaign)}
                      >
                        <Trophy className="w-4 h-4" />
                        Results
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {editingCampaign && <EditCampaignModal campaign={editingCampaign} onClose={() => setEditingCampaign(null)} />}
    </>
  )
}
