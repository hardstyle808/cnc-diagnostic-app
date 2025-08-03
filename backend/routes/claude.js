const router = require('express').Router();
const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

// POST to get analysis from Claude AI
router.post('/analyze', async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await anthropic.messages.create({
      model: "claude-3-opus-20240229", // or another model
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });
    res.json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
