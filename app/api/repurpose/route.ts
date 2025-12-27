import { NextResponse } from "next/server";
import { scrapeContent } from "@/lib/scrape";
import { generateContent } from "@/lib/gemini";
import { RepurposeRequestSchema } from "@/lib/validators/repurpose";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        //Runtime validation
        const parsed = RepurposeRequestSchema.safeParse(body);

        if (!parsed.success) {
        return NextResponse.json(
            {
              error: "Invalid request payload",
              issues: parsed.error.flatten(),
            },
            { status: 400 }
        );
        }

    //Fully type-safe
    const { inputType, content, platforms } = parsed.data;

    let textContent = content;
    if (inputType === "url") {
      textContent = await scrapeContent(content);
    }

    const results : Record<string, string> = {};
    for (const platform of platforms) {
      results[platform] = await generateContent(textContent, platform);
    }

    return NextResponse.json({ results });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}