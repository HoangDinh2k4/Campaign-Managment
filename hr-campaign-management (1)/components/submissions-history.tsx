"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Eye } from "lucide-react"
import SubmissionDetailModal from "./submission-detail-modal"

const mockSubmissions = [
  {
    id: 1,
    employeeId: "E001",
    employeeName: "Nguyen Tuan Kiet",
    department: "IT Department",
    distance: 5.2,
    time: "45 minutes",
    pace: "8:40 min/km",
    date: "2024-11-20",
    status: "Approved",
    submittedAt: "2 hours ago",
    proof: "Running app screenshot",
    proofImages: ["/running-app-screenshot.jpg"],
    rejectionReason: null,
  },
  {
    id: 2,
    employeeId: "E002",
    employeeName: "Tran Minh Duc",
    department: "HR Department",
    distance: 3.8,
    time: "32 minutes",
    pace: "8:25 min/km",
    date: "2024-11-20",
    status: "Approved",
    submittedAt: "4 hours ago",
    proof: "Fitness tracker export",
    proofImages: ["/fitness-tracker-screenshot.jpg"],
    rejectionReason: null,
  },
  {
    id: 3,
    employeeId: "E003",
    employeeName: "Le Hoang Anh",
    department: "Finance Department",
    distance: 2.5,
    time: "25 minutes",
    pace: "10:00 min/km",
    date: "2024-11-19",
    status: "Rejected",
    submittedAt: "1 day ago",
    proof: "Photo evidence",
    proofImages: ["/running-activity-photo.jpg"],
    rejectionReason: "Duplicate entry - already submitted for this date",
  },
  {
    id: 4,
    employeeId: "E004",
    employeeName: "Pham Thi Linh",
    department: "Marketing Department",
    distance: 6.1,
    time: "52 minutes",
    pace: "8:31 min/km",
    date: "2024-11-19",
    status: "Approved",
    submittedAt: "1 day ago",
    proof: "Running app screenshot",
    proofImages: ["/running-app-screenshot.jpg"],
    rejectionReason: null,
  },
  {
    id: 5,
    employeeId: "E005",
    employeeName: "Vu Minh Tuan",
    department: "IT Department",
    distance: 4.0,
    time: "38 minutes",
    pace: "9:30 min/km",
    date: "2024-11-18",
    status: "Rejected",
    submittedAt: "2 days ago",
    proof: "Manual entry",
    proofImages: [],
    rejectionReason: "Invalid proof - no supporting evidence provided",
  },
]

export default function SubmissionsHistory({ campaign }) {
  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  const handleViewDetails = (submission) => {
    setSelectedSubmission(submission)
    setShowDetailModal(true)
  }

  const approvedCount = mockSubmissions.filter((s) => s.status === "Approved").length
  const rejectedCount = mockSubmissions.filter((s) => s.status === "Rejected").length

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 border border-border">
          <p className="text-sm text-muted-foreground">Total Approved Submissions</p>
          <p className="text-3xl font-bold text-foreground mt-2">{mockSubmissions.length}</p>
        </Card>
        <Card className="p-4 border border-border">
          <p className="text-sm text-muted-foreground">Approved</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{approvedCount}</p>
        </Card>
        <Card className="p-4 border border-border">
          <p className="text-sm text-muted-foreground">Rejected</p>
          <p className="text-3xl font-bold text-red-600 mt-2">{rejectedCount}</p>
        </Card>
      </div>

      {/* Submissions List */}
      <Card className="border border-border">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Submission History</h3>
          <div className="space-y-3">
            {mockSubmissions.map((submission) => (
              <div
                key={submission.id}
                className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="font-semibold text-foreground">{submission.employeeName}</p>
                      <p className="text-xs text-muted-foreground">({submission.employeeId})</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{submission.department}</span>
                      <span>{submission.distance} km</span>
                      <span>{submission.date}</span>
                      <span>{submission.submittedAt}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      className={
                        submission.status === "Approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }
                    >
                      {submission.status}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 bg-transparent"
                      onClick={() => handleViewDetails(submission)}
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                  </div>
                </div>

                {submission.proofImages && submission.proofImages.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Proof Evidence:</p>
                    <div className="flex gap-2 flex-wrap">
                      {submission.proofImages.map((image, idx) => (
                        <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden border border-border">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Proof ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Detail Modal */}
      {showDetailModal && selectedSubmission && (
        <SubmissionDetailModal submission={selectedSubmission} onClose={() => setShowDetailModal(false)} />
      )}
    </div>
  )
}
