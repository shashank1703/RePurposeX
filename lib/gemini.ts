import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
//Platform-specific prompts
const platformPrompts: Record<string, string> = {
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

// export const platformPrompts: Record<string, string> = {
//   twitter: `
//     You are a Twitter content specialist.
//     Keep it under 280 characters.
//     Use 2–3 hashtags.
//   `,
//   linkedin: `
//     You are a LinkedIn content specialist.
//     Use professional tone.
//     Add 3–5 hashtags.
//   `,
//   instagram: `
//     You are an Instagram content specialist.
//     Use emojis and 5–10 hashtags.
//   `,
//   facebook: `
//     You are a Facebook content specialist.
//     Conversational tone.
//   `,
//   youtube: `
//     You are a YouTube content specialist.
//     Write a video description.
//   `,
// };

export async function generateContent(content: string, platform: string) {
  try {
    if (!platformPrompts[platform]) {
      throw new Error(`Invalid platform: ${platform}`);
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      ${platformPrompts[platform]}
      
      Original Content:
      ${content}
      
      Transform this content for ${platform} "without * and any other make sure its styled well":
    `;

    console.log(`Sending request to Gemini AI for ${platform}`);

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    console.log(`Full API Response:`, JSON.stringify(result, null, 2));

    //Extracting text properly from the response
    const responseText = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "Failed to generate content.";

    console.log(`Generated Content for ${platform}:`, responseText);

    return responseText;
  } catch (error) {
    console.error(`Error in generateContent:`, error);
    if(error instanceof Error)
        throw new Error(`Failed to generate content for ${platform}: ${error.message}`);
    throw new Error(`Failed to generate content for ${platform}: Unknown error occurred`);
  }
}