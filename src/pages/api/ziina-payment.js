// Ziina Payment API Route
// Creates a payment intent for $599 USD — 1:1 CEO Consultation Session
// Accepts form data (name, email, phone, reason) from request body

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ZIINA_API_URL = 'https://api-v2.ziina.com/api';
  const ZIINA_API_KEY = process.env.ZIINA_API_KEY;

  if (!ZIINA_API_KEY) {
    console.error('ZIINA_API_KEY not configured');
    return res.status(500).json({ error: 'Payment service not configured' });
  }

  const { name, email, phone, reason } = req.body || {};

  if (!name || !email || !phone || !reason) {
    return res.status(400).json({ error: 'Missing required booking fields' });
  }

  try {
    // $599 USD = 59900 cents
    const amount = 59900;

    // Get the base URL for redirects
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host;
    const baseUrl = `${protocol}://${host}`;

    const paymentData = {
      amount: amount,
      currency_code: 'USD',
      message: '1:1 CEO Discovery Session - DevMate Solutions',
      success_url: `${baseUrl}/book-meeting?payment=success`,
      cancel_url: `${baseUrl}/book-meeting?payment=cancelled`,
      test: process.env.NODE_ENV !== 'production',
    };

    const response = await fetch(`${ZIINA_API_URL}/payment_intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ZIINA_API_KEY}`,
      },
      body: JSON.stringify(paymentData),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Ziina API Error:', data);
      return res.status(response.status).json({
        error: data.message || 'Failed to create payment intent',
        details: data,
      });
    }

    return res.status(200).json({
      success: true,
      payment_intent_id: data.id,
      redirect_url: data.redirect_url,
      amount: data.amount,
      currency: data.currency_code,
      status: data.status,
    });

  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
}
