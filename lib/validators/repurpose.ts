import { z } from "zod";

export const RepurposeRequestSchema = z.object({
  inputType: z.enum(["text", "url"]),
  content: z.string().min(10, "Content is too short"),
  platforms: z.array(
    z.enum([
      "twitter",
      "linkedin",
      "instagram",
      "facebook",
      "youtube",
    ])
  ).min(1, "Select at least one platform"),
});

export type RepurposeRequest = z.infer<
  typeof RepurposeRequestSchema
>;