"use client"
import { motion } from "framer-motion"
import { FileText, Link } from "lucide-react"

const ContentInput = ({ inputType, setInputType, content, setContent, url, setUrl }) => {
  return (
    <div className="content-input">
      <div className="input-type-selector">
        <button
          className={`input-type-button ${inputType === "text" ? "active" : ""}`}
          onClick={() => setInputType("text")}
        >
          <FileText size={18} />
          <span>Paste Text</span>
        </button>
        <button
          className={`input-type-button ${inputType === "url" ? "active" : ""}`}
          onClick={() => setInputType("url")}
        >
          <Link size={18} />
          <span>Enter URL</span>
        </button>
      </div>

      <motion.div
        className="input-container"
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: 1,
          height: "auto",
        }}
        transition={{ duration: 0.3 }}
      >
        {inputType === "text" ? (
          <textarea
            className="content-textarea"
            placeholder="Paste your blog post or article content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
          />
        ) : (
          <input
            type="url"
            className="url-input"
            placeholder="https://example.com/your-blog-post"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        )}
      </motion.div>
    </div>
  )
}

export default ContentInput

