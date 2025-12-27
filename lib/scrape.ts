import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeContent(url : string) {
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
  } catch (error : unknown) {
    if(error instanceof Error)
        throw new Error(`Failed to scrape content: ${error.message}`);

    throw new Error("Failed to scrape content: Unknown error occurred");
  }
}