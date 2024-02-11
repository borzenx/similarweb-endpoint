import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

type ResponseData = {
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {

    const apiUrl = `https://data.similarweb.com/api/v1/data?domain=facebook.com`;
    console.log('API URL:', apiUrl);

    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
      }
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error('Failed to fetch data:', errorMessage);
      throw new Error('Failed to fetch data');
    }

    const data: ResponseData = await response.json() as ResponseData;
    console.log('Response data:', data);

    const responseData: ResponseData = {
      message: data?.message || 'No message found'
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
}
