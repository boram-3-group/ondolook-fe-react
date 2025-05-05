import { api } from '../core/axios';

const NOTION_API_KEY = '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';
const NOTION_DATABASE_ID = '1e569181697880e8b7cae22f0cb391c4';

export const useNotion = () => {
  const getExistToken = async () => {
    try {
      // First request to get temporary access
      await api.service.get('https://cors-anywhere.herokuapp.com/corsdemo');

      // Then make the actual request
      const response = await api.service.post(
        `https://cors-anywhere.herokuapp.com/https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${NOTION_API_KEY}`,
            'Notion-Version': '2022-06-28',
          },
        }
      );
      console.log('response', response);
      return response.data;
    } catch (error) {
      console.error('Error fetching from Notion:', error);
      throw error;
    }
  };

  return { getExistToken };
};
