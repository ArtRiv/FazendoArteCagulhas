import axios from 'axios';
import { Category } from '@/types/categories';

const API_URL = 'http://localhost:8080/category';

// Fetch categories
export const fetchCategories = async (): Promise<Category[]> => {
  const response = await axios.get<Category[]>(API_URL);
  return response.data;
};

export const fetchCategoriesByID = async (id: string): Promise<Category[]> => {
  const response = await axios.get<Category[]>(`${API_URL}/${id}`);
  return response.data;
}

interface createCategoryDto {
  name: string
} 
export const createCategories = async (categories: createCategoryDto[]): Promise<Category[]> => {
  const response = await axios.post<Category[]>(API_URL, categories);
  return response.data;
};

// Update categories
export const updateCategories = async (categories: Category[]): Promise<Category[]> => {
  const response = await axios.patch<Category[]>(API_URL, categories);
  return response.data;
};

// Delete categories
export const deleteCategories = async (categoryIds: number[]): Promise<void> => {
  await axios.delete(API_URL, { data: { categoryIds } });
};
