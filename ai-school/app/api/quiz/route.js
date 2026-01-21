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

STRICT RULES (VERY IMPORTANT):
- options must be an array of 4 strings
- correctAnswer MUST be ONLY ONE LETTER: "A", "B", "C", or "D"
- correctAnswer MUST correspond to the correct option index
- DO NOT return the option text as correctAnswer

Return EXACTLY this structure:
{
  "questions": [
    {
      "question": "string",
      "options": ["option1", "option2", "option3", "option4"],
      "correctAnswer": "A"
    }
  ]
}

No markdown.
No explanation.
No extra text.

Topic: ${subject}
Difficulty: ${level}
Generate 10 questions.
`;

    const result = await model.generateContent(prompt);
    const rawText = result.response.text();

    const jsonStart = rawText.indexOf("{");
    const jsonEnd = rawText.lastIndexOf("}") + 1;
    const cleanText = rawText.substring(jsonStart, jsonEnd);

    const quiz = JSON.parse(cleanText);
    return Response.json(quiz);

  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Quiz generation failed" },
      { status: 500 }
    );
  }
}
