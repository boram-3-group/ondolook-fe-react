import { Client } from '@notionhq/client';

const NOTION_API_KEY = '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';
const NOTION_DATABASE_ID = '1e569181697880e8b7cae22f0cb391c4';

const notion = new Client({
  auth: NOTION_API_KEY,
});

interface UserEnvironment {
  isIOS: boolean;
  isSafari: boolean;
  isPWAInstalled: boolean;
}

export const saveTokenToNotion = async (
  token: string,
  environment: UserEnvironment
): Promise<void> => {
  try {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!');
    const existingTokens = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        property: 'fcm_token',
        rich_text: {
          equals: token,
        },
      },
    });
    console.log('existingTokens', existingTokens);
    if (existingTokens.results.length > 0) {
      console.log('Token already exists in Notion');
      return;
    }

    await notion.pages.create({
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        environment: {
          rich_text: [
            {
              text: {
                content: `${environment.isIOS ? 'iOS' : 'Android'} - ${environment.isSafari ? 'Safari' : 'Chrome'} - ${environment.isPWAInstalled ? 'PWA' : 'Browser'}`,
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
  }
};
