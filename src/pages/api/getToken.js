
export default async function handler(req, res) {
  const { name } = req.query;
  
  // Determine backend URL based on environment
  // IMPORTANT: For production, the backend must be publicly accessible
  // Set BACKEND_URL in your production environment variables
  // Example: BACKEND_URL=https://api.devmatesolutions.com or your deployed backend URL
  const isProduction = process.env.NODE_ENV === 'production';
  const backendUrl = process.env.BACKEND_URL || 
    (isProduction 
      ? process.env.PRODUCTION_BACKEND_URL || 'http://127.0.0.1:5001' // Fallback - update this!
      : 'http://127.0.0.1:5001');

  try {
    console.log(`[${isProduction ? 'PROD' : 'DEV'}] Fetching token from backend: ${backendUrl}`);
    const response = await fetch(`${backendUrl}/getToken?name=${encodeURIComponent(name || 'User')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error(`Backend error: ${response.status} - ${errorText}`);
      throw new Error(`Backend responded with status: ${response.status}`);
    }
    const token = await response.text();
    res.status(200).send(token);
  } catch (error) {
    console.error('Error fetching token:', error.message);
    // Return a more user-friendly error in production
    if (isProduction) {
      res.status(503).json({ error: 'Service temporarily unavailable' });
    } else {
      res.status(500).json({ error: 'Failed to fetch token from backend' });
    }
  }
}
