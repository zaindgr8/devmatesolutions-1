// Ziina Payment API Route
// Creates a payment intent for 1050 AED consultation fee

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ZIINA_API_URL = 'https://api-v2.ziina.com/api';
  const ZIINA_API_KEY = 'WQq2Jrqt1L/dKZPsGKHpGnHY4541IPkRSdKMGUh9OLk57UWHidf1FF4/LMiSPlJL';

  if (!ZIINA_API_KEY) {
    console.error('ZIINA_API_KEY not configured');
    return res.status(500).json({ error: 'Payment service not configured' });
  }

  try {
    // 1050 AED = 105000 fils
    const amount = 105000;
    
    // Get the base URL for redirects
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host;
    const baseUrl = `${protocol}://${host}`;

    const paymentData = {
      amount: amount,
      currency_code: 'AED',
      message: 'CEO 1:1 Consultation Session (45 Minutes) - Devmate Solutions',
      success_url: `${baseUrl}/book-meeting?payment=success`,
      cancel_url: `${baseUrl}/book-meeting?payment=cancelled`,
      test: process.env.NODE_ENV !== 'production' // Test mode in development
    };

    const response = await fetch(`${ZIINA_API_URL}/payment_intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ZIINA_API_KEY}`
      },
      body: JSON.stringify(paymentData)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Ziina API Error:', data);
      return res.status(response.status).json({ 
        error: data.message || 'Failed to create payment intent',
        details: data
      });
    }

    return res.status(200).json({
      success: true,
      payment_intent_id: data.id,
      redirect_url: data.redirect_url,
      amount: data.amount,
      currency: data.currency_code,
      status: data.status
    });

  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}

