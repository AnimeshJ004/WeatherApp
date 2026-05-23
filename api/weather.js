// Vercel Serverless Function — handles /api/weather
// Set API_KEY in Vercel Dashboard → Project Settings → Environment Variables

export default async function handler(req, res) {
  // Always respond with JSON
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const city = req.query.city || 'London';
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: 'API_KEY is not set. Add it in Vercel → Project Settings → Environment Variables.',
    });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || 'City not found' });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error('Weather API error:', err);
    res.status(500).json({ error: 'Failed to fetch weather data.' });
  }
}
