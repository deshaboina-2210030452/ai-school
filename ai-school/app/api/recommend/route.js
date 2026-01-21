import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  const { subject, level } = await req.json();

  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview", 
  });

  const prompt = `
Generate exactly 5 multiple-choice questions in JSON format.

Return ONLY valid JSON. No explanation.

Format:
{
  "questions": [
    {
      "question": "string",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "A"
    }
  ]
}

Subject: ${subject}
Difficulty: ${level}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  // ✅ Safely parse JSON
  const quiz = JSON.parse(text);

  return Response.json(quiz);
}
