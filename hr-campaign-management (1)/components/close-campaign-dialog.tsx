"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function CloseCampaignDialog({ campaign, onClose, onConfirm }) {
  const [isConfirming, setIsConfirming] = useState(false)

  const handleConfirm = () => {
    setIsConfirming(true)
    setTimeout(() => {
      onConfirm()
    }, 1500)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="max-w-md p-6 space-y-4">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-destructive" />
          <h3 className="text-lg font-semibold text-foreground">Close Campaign?</h3>
        </div>

        <p className="text-muted-foreground">Are you sure you want to close "{campaign.name}"? Once closed:</p>

        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>Employees cannot submit new activities</li>
          <li>Final rankings will be calculated and published</li>
          <li>The campaign cannot be reopened</li>
        </ul>

        {isConfirming && (
          <div className="p-3 bg-green-50 rounded border border-green-200">
            <p className="text-sm text-green-800">Campaign is being closed...</p>
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onClose} disabled={isConfirming} className="flex-1 bg-transparent">
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={isConfirming} className="flex-1">
            {isConfirming ? "Closing..." : "Close Campaign"}
          </Button>
        </div>
      </Card>
    </div>
  )
}
