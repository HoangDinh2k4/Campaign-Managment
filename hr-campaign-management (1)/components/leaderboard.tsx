"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal } from "lucide-react"

const mockLeaderboardData = [
  {
    rank: 1,
    name: "John Smith",
    department: "Engineering",
    score: 245.5,
    submissions: 12,
  },
  {
    rank: 2,
    name: "Sarah Johnson",
    department: "Marketing",
    score: 198.3,
    submissions: 10,
  },
  {
    rank: 3,
    name: "Mike Chen",
    department: "Sales",
    score: 187.2,
    submissions: 9,
  },
  {
    rank: 4,
    name: "Emma Davis",
    department: "HR",
    score: 156.8,
    submissions: 8,
  },
  {
    rank: 5,
    name: "Alex Wilson",
    department: "Engineering",
    score: 142.1,
    submissions: 7,
  },
]

const getMedalIcon = (rank) => {
  switch (rank) {
    case 1:
      return <Trophy className="w-5 h-5 text-yellow-500" />
    case 2:
      return <Medal className="w-5 h-5 text-gray-400" />
    case 3:
      return <Medal className="w-5 h-5 text-orange-600" />
    default:
      return null
  }
}

export default function Leaderboard({ campaign }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5">
          <p className="text-sm text-muted-foreground">Total Participants</p>
          <p className="text-3xl font-bold text-primary">45</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-accent/10 to-accent/5">
          <p className="text-sm text-muted-foreground">Total Distance</p>
          <p className="text-3xl font-bold text-accent">2,340 km</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-blue-100 to-blue-50">
          <p className="text-sm text-muted-foreground">Average per Employee</p>
          <p className="text-3xl font-bold text-blue-600">52 km</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Real-time Rankings</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Rank</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Employee Name</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Department</th>
                <th className="text-right py-3 px-4 font-semibold text-foreground">{campaign.primaryMetric}</th>
                <th className="text-right py-3 px-4 font-semibold text-foreground">Submissions</th>
              </tr>
            </thead>
            <tbody>
              {mockLeaderboardData.map((entry) => (
                <tr key={entry.rank} className="border-b border-border hover:bg-secondary/50 transition-colors">
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
                    <Badge variant="outline">{entry.department}</Badge>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <p className="font-bold text-lg text-accent">{entry.score}</p>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <p className="text-foreground">{entry.submissions}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
