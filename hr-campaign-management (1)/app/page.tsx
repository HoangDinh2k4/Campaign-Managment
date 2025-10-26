"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import TopHeader from "@/components/top-header"
import CampaignList from "@/components/campaign-list"
import CampaignDetail from "@/components/campaign-detail"
import CreateCampaignForm from "@/components/create-campaign-form"
import EditCampaignForm from "@/components/edit-campaign-form"
import FinalRankings from "@/components/final-rankings"
import ApprovalsPage from "@/components/approvals-page"

export default function Page() {
  const [currentView, setCurrentView] = useState("list")
  const [selectedCampaign, setSelectedCampaign] = useState(null)

  const handleViewCampaign = (campaign) => {
    setSelectedCampaign(campaign)
    setCurrentView("detail")
  }

  const handleViewFinalRankings = (campaign) => {
    setSelectedCampaign(campaign)
    setCurrentView("rankings")
  }

  const handleCreateCampaign = () => {
    setCurrentView("create")
  }

  const handleEditCampaign = (campaign) => {
    setSelectedCampaign(campaign)
    setCurrentView("edit")
  }

  const handleViewApprovals = () => {
    setCurrentView("approvals")
  }

  const handleBackToList = () => {
    setCurrentView("list")
    setSelectedCampaign(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <TopHeader />
      <Sidebar />

      <main className="ml-64 mt-16 p-6">
        {currentView === "list" && (
          <CampaignList
            onCreateCampaign={handleCreateCampaign}
            onViewCampaign={handleViewCampaign}
            onViewFinalRankings={handleViewFinalRankings}
            onViewApprovals={handleViewApprovals}
          />
        )}
        {currentView === "detail" && selectedCampaign && (
          <CampaignDetail campaign={selectedCampaign} onBack={handleBackToList} onEdit={handleEditCampaign} />
        )}
        {currentView === "create" && <CreateCampaignForm onBack={handleBackToList} />}
        {currentView === "edit" && selectedCampaign && (
          <EditCampaignForm campaign={selectedCampaign} onBack={handleBackToList} />
        )}
        {currentView === "rankings" && selectedCampaign && (
          <FinalRankings campaign={selectedCampaign} onBack={handleBackToList} />
        )}
        {currentView === "approvals" && <ApprovalsPage onBack={handleBackToList} />}
      </main>
    </div>
  )
}
