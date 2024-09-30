import axios from 'axios';
import { Tag } from '@/types/tags'; // You will need a Tag type definition

const API_URL = 'http://localhost:8080/tags';
const SEARCH_API_URL = 'http://localhost:8080/tags/search'

// Fetch tags
export const fetchTags = async (): Promise<Tag[]> => {
  const response = await axios.get<Tag[]>(API_URL);
  return response.data;
};

interface CreateTagDto {
  name: string;
}

export const createTags = async (tags: CreateTagDto[]): Promise<Tag[]> => {
  const response = await axios.post<Tag[]>(API_URL, tags);
  return response.data;
};

// Update tags
export const updateTags = async (tags: Tag[]): Promise<Tag[]> => {
  const response = await axios.patch<Tag[]>(API_URL, tags);
  return response.data;
};

// Delete tags
export const deleteTags = async (tagIds: number[]): Promise<void> => {
  await axios.delete(API_URL, { data: { tagIds } });
};

export const searchTags = async (query: string): Promise<Tag[]> => {
    const response = await axios.get<Tag[]>(SEARCH_API_URL, {
        params: { q: query },
    });
    console.log(response.data);
    return response.data;
}
