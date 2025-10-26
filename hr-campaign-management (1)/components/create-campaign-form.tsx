"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, CheckCircle } from "lucide-react"

const activityTypes = [
  { id: "running", name: "Running", metrics: ["Distance (km)", "Time (minutes)", "Average Pace"] },
  { id: "fitness", name: "Fitness", metrics: ["Time (minutes)", "Calories Burned", "Reps"] },
  { id: "cycling", name: "Cycling", metrics: ["Distance (km)", "Time (minutes)", "Elevation (m)"] },
]

export default function CreateCampaignForm({ onBack }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    startTime: "09:00",
    endDate: "",
    endTime: "17:00",
    activityType: "",
    primaryMetric: "",
    secondaryMetrics: [],
  })

  const [showSuccess, setShowSuccess] = useState(false)
  const [selectedActivityType, setSelectedActivityType] = useState(null)

  const handleActivityTypeChange = (typeId) => {
    setSelectedActivityType(typeId)
    setFormData({
      ...formData,
      activityType: typeId,
      primaryMetric: "",
      secondaryMetrics: [],
    })
  }

  const handlePrimaryMetricChange = (metric) => {
    setFormData({
      ...formData,
      primaryMetric: metric,
    })
  }

  const handleSecondaryMetricChange = (metric) => {
    setFormData((prev) => ({
      ...prev,
      secondaryMetrics: prev.secondaryMetrics.includes(metric)
        ? prev.secondaryMetrics.filter((m) => m !== metric)
        : [...prev.secondaryMetrics, metric],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (new Date(formData.endDate) <= new Date(formData.startDate)) {
      alert("End Date must be after Start Date")
      return
    }
    setShowSuccess(true)
    setTimeout(() => {
      onBack()
    }, 2000)
  }

  const currentActivityType = activityTypes.find((t) => t.id === selectedActivityType)

  if (showSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-8 text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Campaign Created Successfully!</h2>
          <p className="text-muted-foreground mb-6">Your new campaign has been created and is ready to launch.</p>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={onBack}>
              Back to Campaigns
            </Button>
            <Button className="flex-1">View Details</Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold text-foreground">Create New Campaign</h2>
          <p className="text-muted-foreground">Set up a new employee activity campaign</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Basic Information</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Campaign Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Company Running Challenge 2025"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the campaign and its goals"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
            </div>
          </div>
        </Card>

        {/* Date and Time */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Campaign Duration</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              />
            </div>
          </div>
        </Card>

        {/* Activity Type Selection */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Activity Type *</h3>
          <div className="grid grid-cols-3 gap-4">
            {activityTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => handleActivityTypeChange(type.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedActivityType === type.id
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <p className="font-semibold text-foreground">{type.name}</p>
              </button>
            ))}
          </div>
        </Card>

        {/* Metrics Selection */}
        {currentActivityType && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Metrics</h3>

            <div className="mb-6">
              <Label className="text-base font-semibold mb-3 block">Primary Ranking Metric * (Select one)</Label>
              <div className="space-y-2">
                {currentActivityType.metrics.map((metric) => (
                  <label
                    key={metric}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-secondary/50 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="primaryMetric"
                      value={metric}
                      checked={formData.primaryMetric === metric}
                      onChange={() => handlePrimaryMetricChange(metric)}
                      className="w-4 h-4"
                    />
                    <span className="text-foreground">{metric}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base font-semibold mb-3 block">Secondary Metrics (Optional)</Label>
              <div className="space-y-2">
                {currentActivityType.metrics
                  .filter((m) => m !== formData.primaryMetric)
                  .map((metric) => (
                    <label
                      key={metric}
                      className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-secondary/50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.secondaryMetrics.includes(metric)}
                        onChange={() => handleSecondaryMetricChange(metric)}
                        className="w-4 h-4"
                      />
                      <span className="text-foreground">{metric}</span>
                    </label>
                  ))}
              </div>
            </div>
          </Card>
        )}

        {/* Submit Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack} className="flex-1 bg-transparent">
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!formData.name || !selectedActivityType || !formData.primaryMetric}
            className="flex-1"
          >
            Create Campaign
          </Button>
        </div>
      </form>
    </div>
  )
}
