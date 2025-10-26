"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft, CheckCircle, X, AlertCircle } from "lucide-react"

const mockCampaigns = [
  {
    id: 1,
    name: "Company Running Challenge 2025",
    pendingCount: 5,
  },
  {
    id: 2,
    name: "Fitness Month - March",
    pendingCount: 0,
  },
  {
    id: 3,
    name: "Q4 2024 Marathon",
    pendingCount: 3,
  },
]

const mockSubmissions = [
  {
    id: 1,
    employeeId: "EMP001",
    employeeName: "John Smith",
    employeeEmail: "john.smith@company.com",
    submissionDate: "2025-01-20",
    distance: 15.5,
    time: 95,
    status: "Pending",
    proofUrl: "https://example.com/proof1.jpg",
    proofImages: ["/running-app-screenshot.jpg", "/running-activity-photo.jpg"],
  },
  {
    id: 2,
    employeeId: "EMP002",
    employeeName: "Sarah Johnson",
    employeeEmail: "sarah.johnson@company.com",
    submissionDate: "2025-01-20",
    distance: 12.3,
    time: 78,
    status: "Pending",
    proofUrl: "https://example.com/proof2.jpg",
    proofImages: ["/fitness-tracker-screenshot.jpg"],
  },
  {
    id: 3,
    employeeId: "EMP003",
    employeeName: "Mike Chen",
    employeeEmail: "mike.chen@company.com",
    submissionDate: "2025-01-19",
    distance: 18.7,
    time: 112,
    status: "Pending",
    proofUrl: "https://example.com/proof3.jpg",
    proofImages: ["/running-app-screenshot.jpg", "/running-activity-photo.jpg", "/fitness-tracker-screenshot.jpg"],
  },
]

export default function ApprovalsPage({ onBack }) {
  const [selectedCampaign, setSelectedCampaign] = useState(null)
  const [submissions, setSubmissions] = useState(mockSubmissions)
  const [rejectingId, setRejectingId] = useState(null)
  const [rejectReason, setRejectReason] = useState("")
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [approvedSubmissions, setApprovedSubmissions] = useState([])
  const [rejectedSubmissions, setRejectedSubmissions] = useState([])

  const handleApprove = (submission) => {
    setSubmissions(submissions.filter((s) => s.id !== submission.id))
    setApprovedSubmissions([...approvedSubmissions, submission.id])

    // Simulate notification to employee
    console.log(`[v0] Notification sent to ${submission.employeeName}: Your submission has been approved!`)
    console.log(`[v0] Added ${submission.distance}km to leaderboard for ${submission.employeeName}`)
  }

  const handleRejectClick = (submission) => {
    setRejectingId(submission.id)
    setShowRejectDialog(true)
  }

  const handleConfirmReject = () => {
    if (!rejectReason.trim()) {
      alert("Please provide a reason for rejection")
      return
    }

    const submission = submissions.find((s) => s.id === rejectingId)
    if (!submission) return

    setSubmissions(submissions.filter((s) => s.id !== rejectingId))
    setRejectedSubmissions([
      ...rejectedSubmissions,
      {
        id: rejectingId,
        reason: rejectReason,
      },
    ])

    // Simulate notification to employee with rejection reason
    console.log(
      `[v0] Notification sent to ${submission.employeeName}: Your submission has been rejected. Reason: ${rejectReason}`,
    )

    // Reset form
    setRejectingId(null)
    setRejectReason("")
    setShowRejectDialog(false)
  }

  if (selectedCampaign) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedCampaign(null)}
            className="rounded-full hover:bg-muted"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold text-foreground">{selectedCampaign.name}</h2>
            <p className="text-muted-foreground">Review and approve employee submissions</p>
          </div>
        </div>

        {/* Submissions List */}
        <Card className="p-6 bg-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Pending Submissions ({submissions.length})</h3>

          {submissions.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <p className="text-muted-foreground font-medium">All submissions have been reviewed!</p>
              <p className="text-sm text-muted-foreground mt-1">
                Approved: {approvedSubmissions.length} | Rejected: {rejectedSubmissions.length}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  className="border border-border rounded-lg p-5 hover:shadow-md transition-shadow"
                >
                  {/* Employee Info */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-foreground text-lg">{submission.employeeName}</p>
                        <Badge className="bg-blue-100 text-blue-800 text-xs">{submission.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{submission.employeeEmail}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Submitted on {new Date(submission.submissionDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Submission Data */}
                  <div className="grid grid-cols-3 gap-4 mb-5 p-4 bg-muted/30 rounded-lg">
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase">Distance</p>
                      <p className="text-lg font-bold text-foreground">{submission.distance} km</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase">Time</p>
                      <p className="text-lg font-bold text-foreground">{submission.time} min</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase">Pace</p>
                      <p className="text-lg font-bold text-foreground">
                        {(submission.time / submission.distance).toFixed(1)} min/km
                      </p>
                    </div>
                  </div>

                  {/* Proof Images Gallery */}
                  {submission.proofImages && submission.proofImages.length > 0 && (
                    <div className="mb-5 p-4 bg-muted/20 rounded-lg">
                      <p className="text-xs text-muted-foreground font-medium uppercase mb-3">Proof Evidence</p>
                      <div className="flex gap-3 flex-wrap">
                        {submission.proofImages.map((image, idx) => (
                          <div
                            key={idx}
                            className="relative group cursor-pointer rounded-lg overflow-hidden border border-border hover:border-primary transition-colors"
                          >
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`Proof ${idx + 1}`}
                              className="w-24 h-24 object-cover hover:scale-105 transition-transform"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleApprove(submission)}
                      className="flex-1 gap-2 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleRejectClick(submission)}
                      variant="outline"
                      className="flex-1 gap-2 border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Summary Stats */}
        {(approvedSubmissions.length > 0 || rejectedSubmissions.length > 0) && (
          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Review Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-green-600">{approvedSubmissions.length}</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{rejectedSubmissions.length}</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    )
  }

  const campaignsWithPending = mockCampaigns.filter((campaign) => campaign.pendingCount > 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Approvals</h2>
          <p className="text-muted-foreground mt-1">Review and approve employee activity submissions</p>
        </div>
        <Button variant="outline" onClick={onBack} className="gap-2 bg-transparent">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>

      {/* Campaign List - Only show campaigns with pending submissions */}
      {campaignsWithPending.length === 0 ? (
        <Card className="p-12 bg-card text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <p className="text-lg font-semibold text-foreground">All submissions reviewed!</p>
          <p className="text-muted-foreground mt-2">There are no pending submissions to review.</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {campaignsWithPending.map((campaign) => (
            <Card
              key={campaign.id}
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-card hover:bg-card/80"
              onClick={() => setSelectedCampaign(campaign)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{campaign.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Click to review submissions</p>
                </div>
                <Badge className="bg-red-100 text-red-800 text-base px-3 py-1">{campaign.pendingCount} pending</Badge>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Rejection Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              Reject Submission
            </DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this submission. The employee will be notified with this reason.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="reject-reason" className="text-foreground font-medium">
                Reason for Rejection *
              </Label>
              <Textarea
                id="reject-reason"
                placeholder="e.g., Invalid proof, Duplicate entry, Incorrect date, etc."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={4}
                className="mt-2 bg-input border-border"
              />
            </div>

            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setShowRejectDialog(false)
                  setRejectingId(null)
                  setRejectReason("")
                }}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleConfirmReject} className="gap-2 bg-red-600 hover:bg-red-700">
                <X className="w-4 h-4" />
                Confirm Rejection
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
