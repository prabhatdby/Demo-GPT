import OpenAIApi from 'openai';

const configuration = new OpenAIApi({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Use the appropriate model
      messages,
    });
    const reply = completion.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (error) {
    console.error("Error fetching AI response:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
}
