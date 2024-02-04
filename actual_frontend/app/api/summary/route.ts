import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { initialProgrammerMessages } from "./messages";

const openai = new OpenAI({
  apiKey: "",
});

export const runtime = "edge";

export async function POST(req: Request) {
  const { text } = await req.json();
  const chatCompletion = await openai.chat.completions.create({
    messages: [...initialProgrammerMessages, { role: "user", content: text }],
    model: "gpt-3.5-turbo-0125",
    stream: true,
    max_tokens: 4096, //be careful with this one as price
  });

  const stream = OpenAIStream(chatCompletion, {
    onStart: async () => {
      console.log({ chatCompletion });
    },
    onToken: async (token: string) => {
      console.log({ chatCompletion, token });
    },
    onCompletion: async (completion: string) => {},
  });

  return new StreamingTextResponse(stream);
}
