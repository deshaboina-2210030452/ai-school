import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { subject, level } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });

    const prompt = `
You are an API that returns ONLY valid JSON.

Return EXACTLY this structure:
{
  "questions": [
    {
      "question": "string",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "A"
    }
  ]
}

Rules:
- No markdown
- No explanation
- No headings
- No extra text

Topic: ${subject}
Difficulty: ${level}
Generate 5 questions.
`;

    const result = await model.generateContent(prompt);
    const rawText = result.response.text();

    // ✅ Extract JSON safely
    const jsonStart = rawText.indexOf("{");
    const jsonEnd = rawText.lastIndexOf("}") + 1;
    const cleanText = rawText.substring(jsonStart, jsonEnd);

    const quiz = JSON.parse(cleanText);

    return Response.json(quiz);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Gemini JSON parsing failed" },
      { status: 500 }
    );
  }
}
