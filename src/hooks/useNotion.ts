import { useState, useEffect } from 'react';
import axios from 'axios';
import { Client } from '@notionhq/client';

const NOTION_API_KEY = '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';
const NOTION_DATABASE_ID = '1e569181697880e8b7cae22f0cb391c4';

export const useNotion = () => {
  const notion = new Client({
    auth: NOTION_API_KEY,
  });

  const getExistToken = async () => {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
    });
    console.log('notion', response);
    return response.results;
  };

  return { getExistToken };
};
