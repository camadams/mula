"use server";
import Anthropic from "@anthropic-ai/sdk";
import { testPhoto } from "./testPhotoBase64String";
import { ContentBlock } from "@anthropic-ai/sdk/resources/messages.mjs";
import { Spending, spendingTable } from "../db/schema";
import { getPrompt, typedData } from "./util";
import { db } from "@/db";

export async function llmWork(photo: string) {
  const anthropic = new Anthropic({
    apiKey: process.env["ANTHROPIC_API_KEY"],
  });

  if (process.env.NODE_ENV == "development") {
    photo = testPhoto;
  }

  photo = photo.split(",")[1];

  let parsedResponse : Spending;

  if (process.env.NODE_ENV == "development") {
    console.log("in dev mode so not doing claude api call")
    parsedResponse = typedData;
  }
  else {
    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1000,
      temperature: 0,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: await getPrompt(),
            },
            {
              type: "image",
              source: {
                type: "base64",
                media_type: "image/png",
                data: photo,
              },
            },
          ],
        },
      ],
    });
    const msgContent = msg.content[0] as ContentBlock & { content: string };
    parsedResponse = JSON.parse(msgContent.content)
  }

  console.log({ parsedResponse });
  // alert(parsedResponse);
  //upload to db
  await db.insert(spendingTable).values({
    category: "hi",
    date: new Date(),
    description: "hi",
    price: 100,
    id: 1,
  });
  alert("done uploading to db");
  return parsedResponse;
}
