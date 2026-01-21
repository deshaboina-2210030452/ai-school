import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  const { answers } = await req.json();

  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
  });

  const prompt = `
  Analyze the following student answers.
  Identify weak topics and explain mistakes simply.

  Answers:
  ${JSON.stringify(answers)}
  `;

  const result = await model.generateContent(prompt);
  const analysis = result.response.text();

  return Response.json({ analysis });
}
