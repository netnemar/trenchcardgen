
const { Configuration, OpenAIApi } = require("openai");

module.exports = async (req, res) => {
  console.log("✅ /api/generate hit");

  if (!process.env.OPENAI_API_KEY) {
    console.log("❌ Missing API Key");
    return res.status(500).json({ error: "Missing OpenAI API key" });
  }

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  const { username, avatarUrl } = req.body || {};

  if (!username || !avatarUrl) {
    return res.status(400).json({ error: "Missing input" });
  }

  const prompt = `Create a Ghibli-style trading card:
  - Character: ${username}
  - Background: peaceful, magical landscape
  - Art style: watercolor, soft fantasy
  - Inspired by avatar: ${avatarUrl}`;

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = response.data.data[0].url;
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("OpenAI error:", error.response?.data || error.message);
    res.status(500).json({ error: "Image generation failed" });
  }
};
