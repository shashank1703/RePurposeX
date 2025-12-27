"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Copy, Check, Twitter, Linkedin, Instagram, Facebook, Youtube } from "lucide-react"

const platformIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
}

const platformColors = {
  twitter: "#1DA1F2",
  linkedin: "#0077B5",
  instagram: "#E1306C",
  facebook: "#4267B2",
  youtube: "#FF0000",
}

const ResultsDisplay = ({ results }) => {
  const [activeTab, setActiveTab] = useState(Object.keys(results)[0])
  const [copied, setCopied] = useState({})

  const handleCopy = (platform, content) => {
    navigator.clipboard.writeText(content)
    setCopied({ ...copied, [platform]: true })

    setTimeout(() => {
      setCopied({ ...copied, [platform]: false })
    }, 2000)
  }

  return (
    <motion.section
      className="results-section glass-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="section-title">Generated Content</h2>

      <div className="results-tabs">
        {Object.keys(results).map((platform) => {
          const Icon = platformIcons[platform] || Twitter

          return (
            <button
              key={platform}
              className={`tab-button ${activeTab === platform ? "active" : ""}`}
              onClick={() => setActiveTab(platform)}
              style={{
                borderColor: activeTab === platform ? platformColors[platform] : "transparent",
                boxShadow: activeTab === platform ? `0 0 10px ${platformColors[platform]}40` : "none",
              }}
            >
              <Icon size={18} color={activeTab === platform ? platformColors[platform] : "#fff"} />
              <span>{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="result-content"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="result-header">
            <h3 style={{ color: platformColors[activeTab] }}>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Content
            </h3>
            <button className="copy-button" onClick={() => handleCopy(activeTab, results[activeTab])}>
              {copied[activeTab] ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              <span>{copied[activeTab] ? "Copied!" : "Copy"}</span>
            </button>
          </div>

          <div className="result-text">{results[activeTab]}</div>
        </motion.div>
      </AnimatePresence>
    </motion.section>
  )
}

export default ResultsDisplay

