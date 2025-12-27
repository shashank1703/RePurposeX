"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Rocket, Globe, Loader2 } from "lucide-react";

import PlatformSelector from "@/components/PlatformSelector";
import ContentInput from "@/components/ContentInput";
import ResultsDisplay from "@/components/ResultsDisplay";

type Platform = "twitter" | "linkedin" | "instagram" | "facebook" | "tiktok" | "youtube";
import "../App.css";
type InputType = "text" | "url";
type ResultsMap = Partial<Record<Platform, string>>;

export default function App() {
  const [inputType, setInputType] = useState<InputType>("text");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");

  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [results, setResults] = useState<ResultsMap>({});

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setResults({});

    try {
      const response = await fetch("/api/repurpose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inputType,
          content: inputType === "text" ? content : url,
          platforms: selectedPlatforms,
        }),
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || "Failed to generate content");
      }

      const data: { results: ResultsMap } = await response.json();
      setResults(data.results);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled =
    isLoading ||
    (inputType === "text" ? !content : !url) ||
    selectedPlatforms.length === 0;

  return (
    <div className="app-container">
      <div className="stars-container">
        <div id="stars" />
        <div id="stars2" />
        <div id="stars3" />
      </div>

      <motion.div
        className="content-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <header className="app-header">
          <motion.div
            className="logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="sparkle-icon" />
            <h1>RepurposeX</h1>
          </motion.div>
          <p className="tagline">
            Transform your content across the social universe
          </p>
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

            <PlatformSelector
              selectedPlatforms={selectedPlatforms}
              setSelectedPlatforms={setSelectedPlatforms}
            />

            <motion.button
              className="generate-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              disabled={isDisabled}
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

          {Object.keys(results).length > 0 && (
            <ResultsDisplay results={results} />
          )}
        </main>

        <footer className="app-footer">
          <p>
            Powered by Gemini AI • RepurposeX © {new Date().getFullYear()}
          </p>
        </footer>
      </motion.div>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Sparkles, Rocket, Globe, Loader2 } from "lucide-react";

// import PlatformSelector from "@/src/components/PlatformSelector";
// import ContentInput from "@/src/components/ContentInput";
// import ResultsDisplay from "@/src/components/ResultsDisplay";

// import styles from "./repurpose.module.css";

// type Platform =
//   | "twitter"
//   | "linkedin"
//   | "instagram"
//   | "facebook"
//   | "tiktok"
//   | "youtube";

// type InputType = "text" | "url";
// type ResultsMap = Partial<Record<Platform, string>>;

// export default function RepurposeClient() {
//   const [inputType, setInputType] = useState<InputType>("text");
//   const [content, setContent] = useState("");
//   const [url, setUrl] = useState("");
//   const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
//   const [results, setResults] = useState<ResultsMap>({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async () => {
//     setIsLoading(true);
//     setError(null);
//     setResults({});

//     try {
//       const response = await fetch("/api/repurpose", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           inputType,
//           content: inputType === "text" ? content : url,
//           platforms: selectedPlatforms,
//         }),
//       });

//       if (!response.ok) {
//         const msg = await response.text();
//         throw new Error(msg || "Failed to generate content");
//       }

//       const data: { results: ResultsMap } = await response.json();
//       setResults(data.results);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Something went wrong");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const isDisabled =
//     isLoading ||
//     (inputType === "text" ? !content : !url) ||
//     selectedPlatforms.length === 0;

//   return (
//     <div className={styles.appContainer}>
//       {/* Background stars */}
//       <div className={styles.starsContainer}>
//         <div className={styles.stars} />
//         <div className={styles.stars2} />
//         <div className={styles.stars3} />
//       </div>

//       {/* Main content */}
//       <motion.div
//         className={styles.contentContainer}
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         {/* Header */}
//         <header className={styles.appHeader}>
//           <motion.div
//             className={styles.logo}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Sparkles className={styles.sparkleIcon} />
//             <h1>RepurposeX</h1>
//           </motion.div>

//           <p className={styles.tagline}>
//             Transform your content across the social universe
//           </p>
//         </header>

//         {/* Main */}
//         <main className={styles.appMain}>
//           <section className={styles.glassPanel}>
//             <h2 className={styles.sectionTitle}>
//               <Globe className={styles.sectionIcon} />
//               Input Your Content
//             </h2>

//             <ContentInput
//               inputType={inputType}
//               setInputType={setInputType}
//               content={content}
//               setContent={setContent}
//               url={url}
//               setUrl={setUrl}
//             />

//             <PlatformSelector
//               selectedPlatforms={selectedPlatforms}
//               setSelectedPlatforms={setSelectedPlatforms}
//             />

//             <motion.button
//               className={styles.generateButton}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleSubmit}
//               disabled={isDisabled}
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className="animate-spin mr-2" />
//                   Generating...
//                 </>
//               ) : (
//                 <>
//                   <Rocket className="mr-2" />
//                   Launch Content
//                 </>
//               )}
//             </motion.button>

//             {error && <div className={styles.errorMessage}>{error}</div>}
//           </section>

//           {Object.keys(results).length > 0 && (
//             <ResultsDisplay results={results} />
//           )}
//         </main>

//         {/* Footer */}
//         <footer className={styles.appFooter}>
//           <p>
//             Powered by Gemini AI • RepurposeX © {new Date().getFullYear()}
//           </p>
//         </footer>
//       </motion.div>
//     </div>
//   );
// }