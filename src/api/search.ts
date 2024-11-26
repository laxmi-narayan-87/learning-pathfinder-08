import { customsearch_v1 } from '@googleapis/customsearch';

const customSearch = new customsearch_v1.Customsearch({
  auth: process.env.GOOGLE_API_KEY,
});

export const searchGoogle = async (query: string) => {
  try {
    const response = await customSearch.cse.list({
      cx: process.env.GOOGLE_SEARCH_ENGINE_ID,
      q: query,
      num: 5,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error performing Google search:', error);
    throw error;
  }
};