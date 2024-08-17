"use client"

import { useAllSettings } from '@/utils/settings/get-client-settings';
import Pagination from '@mui/material/Pagination';
import { usePathname } from 'next/navigation';
import { PaginationItem } from '@mui/material';
import { useRouter } from "next/navigation";
import { SortByTypes } from '@/types/product-params';

type ProductsPaginationProps = {
  productsCount: number,
  pageSize: number,
}

export const ProductsPagination = ({ productsCount, pageSize }: ProductsPaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const pages = Math.ceil(productsCount / pageSize);
  const { searchQuery, currentSortBy, currentPage } = useAllSettings();

  const getUrl = () => {
    if (searchQuery) return `${pathname}?search_query=${searchQuery}&page=${currentPage}`;
    if (currentSortBy === SortByTypes.NEWS) return `${pathname}?page=`
    return `${pathname}?sort_by=${currentSortBy.toLowerCase()}&page=`
  }
  
  const handleChange = (event: any, value: any) => {
    const url = getUrl();
    router.push(`${url}${value}`);
  };
  
  return (
    <div className='w-full max-w-[120rem] mx-auto mt-10 flex justify-center'>
      <Pagination
        page={currentPage}
        count={pages}
        color='secondary'
        onChange={handleChange}
        renderItem={(item) => (
          <PaginationItem 
          {...item} 
          component="a" 
          sx={{ 
            '&.Mui-selected': { backgroundColor: 'rgba(var(--decoration), .6)', color: 'rgb(var(--font-color))' }, 
            '&.MuiPaginationItem-page': { color: 'rgb(var(--font-color))' },
            '&.MuiPaginationItem-previousNext': { color: 'rgb(var(--font-color))' }
          }} 
          />
        )}
      />
    </div>
  );
}