"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"

export default function SubmissionDetailModal({ submission, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-white">
          <h2 className="text-2xl font-bold text-foreground">Submission Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Employee Info */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Employee Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Employee Name</p>
                <p className="text-lg font-semibold text-foreground mt-1">{submission.employeeName}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Employee ID</p>
                <p className="text-lg font-semibold text-foreground mt-1">{submission.employeeId}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Department</p>
                <p className="text-lg font-semibold text-foreground mt-1">{submission.department}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge
                  className={`mt-1 ${
                    submission.status === "Approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {submission.status}
                </Badge>
              </div>
            </div>
          </div>

          {/* Activity Details */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Activity Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Distance</p>
                <p className="text-2xl font-bold text-accent mt-1">{submission.distance} km</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="text-lg font-semibold text-foreground mt-1">{submission.time}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Pace</p>
                <p className="text-lg font-semibold text-foreground mt-1">{submission.pace}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Activity Date</p>
                <p className="text-lg font-semibold text-foreground mt-1">{submission.date}</p>
              </div>
            </div>
          </div>

          {/* Submission Info */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Submission Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Submitted At</p>
                <p className="text-lg font-semibold text-foreground mt-1">{submission.submittedAt}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Proof Type</p>
                <p className="text-lg font-semibold text-foreground mt-1">{submission.proof}</p>
              </div>
            </div>
          </div>

          {submission.proofImages && submission.proofImages.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Proof Evidence</h3>
              <div className="grid grid-cols-2 gap-4">
                {submission.proofImages.map((image, idx) => (
                  <div
                    key={idx}
                    className="relative w-full h-48 rounded-lg overflow-hidden border border-border bg-muted"
                  >
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

          {/* Rejection Reason (if rejected) */}
          {submission.status === "Rejected" && submission.rejectionReason && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Rejection Reason</h3>
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800">{submission.rejectionReason}</p>
              </div>
            </div>
          )}

          {/* Close Button */}
          <div className="flex justify-end gap-2 pt-4 border-t border-border">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
