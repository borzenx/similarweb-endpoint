
import { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { query } = req.query;
    
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
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
