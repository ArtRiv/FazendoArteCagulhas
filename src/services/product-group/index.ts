import axios from 'axios';
import { ProductGroup } from '@/types/product-group'

const API_URL = 'http://localhost:8080/product_group';

// Fetch product groups
export const fetchProductGroups = async (): Promise<ProductGroup[]> => {
  const response = await axios.get<ProductGroup[]>(API_URL);
  return response.data;
};

export const fetchProductGroupByID = async (id: string): Promise<ProductGroup> => {
  const response = await axios.get<ProductGroup>(`${API_URL}/${id}`);
  return response.data;
}

// Create product groups
interface CreateProductGroupDto {
  name: string;
}

export const createProductGroups = async (
  productGroups: CreateProductGroupDto[]
): Promise<ProductGroup[]> => {
  const response = await axios.post<ProductGroup[]>(API_URL, productGroups);
  return response.data;
};

// Update product groups
export const updateProductGroups = async (
  productGroups: ProductGroup[]
): Promise<ProductGroup[]> => {
  const response = await axios.patch<ProductGroup[]>(API_URL, productGroups);
  return response.data;
};

// Delete product groups
export const deleteProductGroups = async (
  productGroupIds: number[]
): Promise<void> => {
  await axios.delete(API_URL, { data: { productGroupIds } });
};
