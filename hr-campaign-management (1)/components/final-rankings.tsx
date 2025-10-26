"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Trophy, Medal, Award } from "lucide-react"

const mockFinalRankings = [
  {
    rank: 1,
    name: "John Smith",
    employeeId: "EMP001",
    department: "Engineering",
    score: 245.5,
    reward: "Gold Medal + 500 Points",
  },
  {
    rank: 2,
    name: "Sarah Johnson",
    employeeId: "EMP002",
    department: "Marketing",
    score: 198.3,
    reward: "Silver Medal + 300 Points",
  },
  {
    rank: 3,
    name: "Mike Chen",
    employeeId: "EMP003",
    department: "Sales",
    score: 187.2,
    reward: "Bronze Medal + 200 Points",
  },
  {
    rank: 4,
    name: "Emma Davis",
    employeeId: "EMP004",
    department: "HR",
    score: 156.8,
    reward: "100 Points",
  },
  {
    rank: 5,
    name: "Alex Wilson",
    employeeId: "EMP005",
    department: "Engineering",
    score: 142.1,
    reward: "50 Points",
  },
]

const getMedalIcon = (rank) => {
  switch (rank) {
    case 1:
      return <Trophy className="w-6 h-6 text-yellow-500" />
    case 2:
      return <Medal className="w-6 h-6 text-gray-400" />
    case 3:
      return <Medal className="w-6 h-6 text-orange-600" />
    default:
      return <Award className="w-6 h-6 text-blue-500" />
  }
}

export default function FinalRankings({ campaign, onBack }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold text-foreground">Final Rankings</h2>
          <p className="text-muted-foreground">{campaign.name} - Campaign Completed</p>
        </div>
      </div>

      {/* Campaign Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Campaign Status</p>
          <p className="text-lg font-bold text-foreground">Completed</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Participants</p>
          <p className="text-2xl font-bold text-primary">38</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Distance</p>
          <p className="text-2xl font-bold text-accent">1,890 km</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Average per Employee</p>
          <p className="text-2xl font-bold text-blue-600">49.7 km</p>
        </Card>
      </div>

      {/* Campaign Info */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">General Campaign Information</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Campaign Name</p>
            <p className="font-semibold text-foreground">{campaign.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <Badge className="bg-gray-100 text-gray-800">Completed</Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Time Period</p>
            <p className="font-semibold text-foreground">
              {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </Card>

      {/* Final Rankings Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Final Ranking Table</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Rank</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Employee Name</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Employee ID</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Department</th>
                <th className="text-right py-3 px-4 font-semibold text-foreground">Total Distance (km)</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Reward</th>
              </tr>
            </thead>
            <tbody>
              {mockFinalRankings.map((entry) => (
                <tr key={entry.rank} className={`border-b border-border ${entry.rank <= 3 ? "bg-yellow-50/50" : ""}`}>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {getMedalIcon(entry.rank)}
                      <span className="font-bold text-lg text-foreground">#{entry.rank}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-semibold text-foreground">{entry.name}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-foreground">{entry.employeeId}</p>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant="outline">{entry.department}</Badge>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <p className="font-bold text-lg text-accent">{entry.score}</p>
                  </td>
                  <td className="py-4 px-4">
                    <Badge className="bg-primary/10 text-primary">{entry.reward}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Summary Metrics */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Summary Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-sm text-muted-foreground mb-2">Company-wide Results</p>
            <p className="text-2xl font-bold text-primary">Total distance run by all employees: 1,890 km</p>
          </div>
          <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
            <p className="text-sm text-muted-foreground mb-2">Target Comparison</p>
            <p className="text-2xl font-bold text-accent">125% of target achieved (1,500 km)</p>
          </div>
        </div>
      </Card>

      <Button onClick={onBack} className="w-full">
        Back to Campaigns
      </Button>
    </div>
  )
}
