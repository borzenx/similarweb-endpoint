import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const query = req.query.query as string; // Accessing directly, no need for destructuring
    
    if (!query || typeof query !== 'string') {
      throw new Error('Invalid query parameter');
    }

    const apiUrl = `https://data.similarweb.com/api/v1/data?domain=${query}`;
    console.log('API URL:', apiUrl); // Log the API URL for debugging

    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      const errorMessage = await response.text();
      console.error('Failed to fetch data:', errorMessage);
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    res.json(data as ResponseData); // Type assertion here
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data' }); // Respond with an error message
  }
}
