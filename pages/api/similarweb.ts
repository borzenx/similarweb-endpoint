import type { NextApiRequest, NextApiResponse } from 'next';

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

    const response = await fetch(`https://data.similarweb.com/api/v1/data?domain=${query}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
