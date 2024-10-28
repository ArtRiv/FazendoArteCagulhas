"use server"
import axios from 'axios';
import { Category } from '@/types/categories';
import { ProductVariation } from '@/types/product-variation';
import { Tag } from '@/types/tags';
import { HttpRequest, RequestData } from '..';

const API_URL = 'http://localhost:8080/collection';

interface createProductDTO {
  title: string,
  price: number,
  categories: Category[],
  product_group: number,
  description: string,
  status: string,
  media: Array<string>,
  tag: Tag[],
  variations: ProductVariation[],
}

interface DashboardProductsResponse {
  products: getDashboardProductsDTO[],
  totalItems: number,
}

export interface getDashboardProductsDTO {
  id: string,
  title: string,
  price: number,
  media: string[],
  status: string,
  purchase_count: number,
  created_at: number,
  page_views: number,
}

interface getDashboardProductsParams {
  page?: number;
  status?: string;
  filter?: string;
  search?: string;
}

export const getDashboardProducts = async (params: getDashboardProductsParams): Promise<DashboardProductsResponse> => {
  const queryParams = new URLSearchParams();

  if (params.page !== undefined) queryParams.append('page', params.page.toString());
  if (params.status) queryParams.append('status', params.status);
  if (params.filter) queryParams.append('filter', params.filter);
  if (params.search) queryParams.append('search', params.search);
  
  const url = `${API_URL}/dashboard?${queryParams.toString()}`;
  
  try {
    const res = await fetch(url, { cache: 'no-store' });
    console.log('after fetch')
    
    if (!res.ok) {
      console.log(res.status)
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }

    const data = await res.json();

    const products: getDashboardProductsDTO[] = data.products.map((product: getDashboardProductsDTO) => ({
      ...product,
      created_at: new Date(product.created_at),
    }));

    return {
      products,
      totalItems: data.totalItems
    };

  } catch (error) {
    console.error(error);
    throw new Error('Error fetching products');
  }
};

export const createProduct = async (product: createProductDTO) => {
  const response = await axios.post(API_URL, product);
  return response.data;
};

export const updateProduct = async ({ product, id }: { product: createProductDTO, id: string }) => {
  const response = await axios.patch(`${API_URL}/${id}`, product);
  console.log(product);
  console.log(id);
  return response.data;
};

export const deleteProduct = async (productID: string) => {
  const requestData: RequestData = {
    url: `${API_URL}/${productID}`,
    method: 'DELETE',
  };

  const response = await HttpRequest<string>(requestData);

  if (!response.data) return 'Error';

  return response.data;
}