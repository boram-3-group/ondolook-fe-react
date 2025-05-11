import { Client } from '@notionhq/client';

const notion = new Client({
  auth: import.meta.env.VITE_APP_NOTION_API_KEY,
});

interface UserEnvironment {
  isIOS: boolean;
  isSafari: boolean;
  isPWA: boolean;
}

export const saveTokenToNotion = async (
  token: string,
  environment: UserEnvironment
): Promise<void> => {
  try {
    console.log('Starting token save process...');
    console.log('Database ID:', import.meta.env.VITE_APP_NOTION_DATABASE_ID);
    console.log('Token to save:', token);

    const existingTokens = await notion.databases.query({
      database_id: import.meta.env.VITE_APP_NOTION_DATABASE_ID,
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
    console.log('Query response:', JSON.stringify(existingTokens, null, 2));
    if (existingTokens.results.length > 0) {
      console.log('Token already exists in Notion');
      return;
    }

    await notion.pages.create({
      parent: { database_id: import.meta.env.VITE_APP_NOTION_DATABASE_ID },
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

    console.log('Token saved to Notion successfully');
  } catch (error) {
    console.error('Error saving token to Notion:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    throw error;
  }
};
