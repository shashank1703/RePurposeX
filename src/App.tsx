"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, Rocket, Globe, Loader2 } from "lucide-react"
import PlatformSelector from "@/src/components/PlatformSelector"
import ContentInput from "@/src/components/ContentInput"
import ResultsDisplay from "@/src/components/ResultsDisplay"
import "./App.css"


function App() {
  const [inputType, setInputType] = useState("text") // 'text' or 'url'
  const [content, setContent] = useState("")
  const [url, setUrl] = useState("")
  const [selectedPlatforms, setSelectedPlatforms] = useState([])
  const [results, setResults] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)
    setResults({})

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/repurpose`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputType,
          content: inputType === "text" ? content : url,
          platforms: selectedPlatforms,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate content")
      }

      const data = await response.json()
      setResults(data.results)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app-container">
      <div className="stars-container">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      </div>

      <motion.div
        className="content-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <header className="app-header">
          <motion.div className="logo" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Sparkles className="sparkle-icon" />
            <h1>RepurposeX</h1>
          </motion.div>
          <p className="tagline">Transform your content across the social universe</p>
        </header>

        <main className="app-main">
          <section className="input-section glass-panel">
            <h2 className="section-title">
              <Globe className="section-icon" />
              Input Your Content
            </h2>

            <ContentInput
              inputType={inputType}
              setInputType={setInputType}
              content={content}
              setContent={setContent}
              url={url}
              setUrl={setUrl}
            />

            <PlatformSelector selectedPlatforms={selectedPlatforms} setSelectedPlatforms={setSelectedPlatforms} />

            <motion.button
              className="generate-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              disabled={isLoading || (!content && !url) || selectedPlatforms.length === 0}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Rocket className="mr-2" />
                  Launch Content
                </>
              )}
            </motion.button>

            {error && <div className="error-message">{error}</div>}
          </section>

          {Object.keys(results).length > 0 && <ResultsDisplay results={results} />}
        </main>

        <footer className="app-footer">
          <p>Powered by Gemini AI • RepurposeX © {new Date().getFullYear()}</p>
        </footer>
      </motion.div>
    </div>
  )
}

export default App

