require("dotenv").config(); // Load environment variables 

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = ['https://re-purpose-x.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin like mobile apps or curl
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  // credentials: true, // only needed if using cookies or sessions
}));

// Allow preflight requests
app.options('*', cors());
app.use(express.json());

// ✅ Initialize Google Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Platform-specific prompts
const platformPrompts = {
  twitter: `
    You are a Twitter content specialist. Transform the following content into engaging tweets.
    - Keep it under 280 characters
    - Use relevant hashtags (2-3 max)
    - Make it conversational and engaging
    - Include a call to action when appropriate
    - Format it properly for Twitter
  `,
  linkedin: `
    You are a LinkedIn content specialist. Transform the following content into a professional LinkedIn post.
    - Use professional language and tone
    - Structure with paragraphs and bullet points for readability
    - Include 3-5 relevant hashtags at the end
    - Keep it concise but comprehensive (under 1300 characters)
    - Add a thoughtful question or call to action at the end
  `,
  instagram: `
    You are an Instagram content specialist. Transform the following content into an engaging Instagram post.
    - Create a captivating caption (under 2200 characters)
    - Use emojis strategically to enhance the message
    - Include line breaks for readability
    - Add 5-10 relevant hashtags at the end
    - Include a call to action to encourage engagement
  `,
  facebook: `
    You are a Facebook content specialist. Transform the following content into an engaging Facebook post.
    - Create a conversational and personal tone
    - Keep it concise but informative
    - Use emojis where appropriate
    - Include a question or call to action to encourage engagement
    - Format with paragraphs for readability
  `,
  youtube: `
    You are a YouTube content specialist. Transform the following content into a YouTube video description.
    - Create an attention-grabbing first 2-3 lines (visible before "Show more")
    - Include timestamps if relevant content sections are mentioned
    - Add relevant keywords naturally throughout
    - Include links to related content if mentioned
    - End with a call to action (subscribe, comment, etc.)
  `,
};

// ✅ Utility function: Scrape content from a URL
async function scrapeContent(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    $("script, style, comment").remove();

    let content = $("article, main, div.post, div.content").text().trim();

    if (!content) {
      $("header, footer, nav, aside, .sidebar, .navigation, .menu, .comments").remove();
      content = $("body").text().trim();
    }

    return content || "Failed to extract meaningful content from the webpage.";
  } catch (error) {
    throw new Error(`Failed to scrape content: ${error.message}`);
  }
}

// ✅ Utility function: Generate AI-powered content
async function generateContent(content, platform) {
  try {
    if (!platformPrompts[platform]) {
      throw new Error(`Invalid platform: ${platform}`);
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      ${platformPrompts[platform]}
      
      Original Content:
      ${content}
      
      Transform this content for ${platform} "without * and any other make sure its styled well":
    `;

    console.log(`🟢 Sending request to Gemini AI for ${platform}`);

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    console.log(`🟢 Full API Response:`, JSON.stringify(result, null, 2));

    // ✅ Extracting text properly from the response
    const responseText = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "Failed to generate content.";

    console.log(`🟢 Generated Content for ${platform}:`, responseText);

    return responseText;
  } catch (error) {
    console.error(`🔴 Error in generateContent:`, error);
    throw new Error(`Failed to generate content for ${platform}: ${error.message}`);
  }
}

// ✅ API Endpoint: Repurpose content
app.post("/api/repurpose", async (req, res) => {
  try {
    const { inputType, content, platforms } = req.body;

    let textContent = content;
    if (inputType === "url") {
      textContent = await scrapeContent(content);
    }

    const results = {};
    for (const platform of platforms) {
      results[platform] = await generateContent(textContent, platform);
    }

    res.json({ results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌍 API Endpoint: http://localhost:${PORT}/api/repurpose`);
});
