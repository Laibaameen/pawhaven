export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS preflight request handle karo
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Sirf POST allow karo
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { imageBase64, mimeType } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Image data required hai' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key configure nahi hai' });
    }

    // Gemini API call
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  inline_data: {
                    mime_type: mimeType || 'image/jpeg',
                    data: imageBase64,
                  },
                },
                {
                  text: `You are a veterinary AI assistant. Analyze this animal image and provide:

1. **Animal Type**: What animal is this? (dog, cat, bird, etc.)
2. **Breed**: What breed if identifiable?
3. **Approximate Age**: Puppy/kitten, young, adult, senior?
4. **Health Assessment**: Do they look healthy? Any visible concerns?
5. **Body Condition Score**: 1-9 scale (1=emaciated, 5=ideal, 9=obese)
6. **Visible Issues**: Any wounds, skin problems, eye/ear issues?
7. **Recommendations**: What care or veterinary attention might be needed?

Please be compassionate and helpful. If this appears to be a stray or injured animal, note that too.
Format your response clearly with these sections.`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      return res.status(response.status).json({ 
        error: 'AI service mein masla aa gaya', 
        details: errorData 
      });
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return res.status(500).json({ error: 'AI se response nahi mila' });
    }

    return res.status(200).json({ result: text });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Server mein masla: ' + error.message });
  }
}