import { Client } from '@notionhq/client';

const NOTION_API_KEY = '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';
const NOTION_DATABASE_ID = '1e569181697880e8b7cae22f0cb391c4';

if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
  throw new Error('Missing required environment variables');
}

const notion = new Client({
  auth: NOTION_API_KEY,
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token, environment } = req.body;

    if (!token || !environment) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if token already exists
    const existingTokens = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        and: [
          {
            property: 'fcm_token',
            rich_text: {
              equals: token,
            },
          },
        ],
      },
    });

    if (existingTokens.results.length > 0) {
      return res.status(200).json({ message: 'Token already exists' });
    }

    // Save new token
    await notion.pages.create({
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        environment: {
          rich_text: [
            {
              text: {
                content: `${environment.isIOS ? 'iOS' : 'Android'} - ${environment.isSafari ? 'Safari' : 'Chrome'} - ${environment.isPWA ? 'PWA' : 'Browser'}`,
              },
            },
          ],
        },
        fcm_token: {
          rich_text: [
            {
              text: {
                content: token,
              },
            },
          ],
        },
        created_at: {
          date: {
            start: new Date().toISOString(),
          },
        },
      },
    });

    return res.status(200).json({ message: 'Token saved successfully' });
  } catch (error) {
    console.error('Error saving token:', error);
    return res.status(500).json({
      error: 'Failed to save token',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
