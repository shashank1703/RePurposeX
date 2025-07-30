"use client"
import { motion } from "framer-motion"
import { Twitter, Linkedin, Instagram, Facebook, Youtube } from "lucide-react"

const platforms = [
  { id: "twitter", name: "Twitter", icon: Twitter, color: "#1DA1F2" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "#0077B5" },
  { id: "instagram", name: "Instagram", icon: Instagram, color: "#E1306C" },
  { id: "facebook", name: "Facebook", icon: Facebook, color: "#4267B2" },
  { id: "youtube", name: "YouTube", icon: Youtube, color: "#FF0000" },
]

const PlatformSelector = ({ selectedPlatforms, setSelectedPlatforms }) => {
  const togglePlatform = (platformId) => {
    if (selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms(selectedPlatforms.filter((id) => id !== platformId))
    } else {
      setSelectedPlatforms([...selectedPlatforms, platformId])
    }
  }

  return (
    <div className="platform-selector">
      <h3 className="platform-title">Select Target Platforms</h3>
      <div className="platforms-grid">
        {platforms.map((platform) => {
          const Icon = platform.icon
          const isSelected = selectedPlatforms.includes(platform.id)

          return (
            <motion.div
              key={platform.id}
              className={`platform-card ${isSelected ? "selected" : ""}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => togglePlatform(platform.id)}
              style={{
                borderColor: isSelected ? platform.color : "transparent",
                boxShadow: isSelected ? `0 0 15px ${platform.color}40` : "none",
              }}
            >
              <div
                className="platform-icon-container"
                style={{
                  backgroundColor: isSelected ? `${platform.color}20` : "rgba(255, 255, 255, 0.05)",
                }}
              >
                <Icon size={24} color={isSelected ? platform.color : "#fff"} />
              </div>
              <span className="platform-name">{platform.name}</span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default PlatformSelector

