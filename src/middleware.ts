import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // const url = new URL(request.url);

    // const pathname = url.pathname;
    // const category = url.searchParams.get('category_id');
    // const sort_by = url.searchParams.get('sort_by');
    // const search_query = url.searchParams.get('search_query') || "";
    // const page = url.searchParams.get('page');
    // const productID = url.searchParams.get('id') || undefined;

    // const requestHeaders = new Headers(request.headers);

    // if (sort_by) requestHeaders.set('x-searchParams-sortBy', sort_by);
    // if (page) requestHeaders.set('x-searchParams-page', page);
    // if (productID) requestHeaders.set('x-searchParams-id', productID);
    // if (category) requestHeaders.set('x-searchParams-category_id', category);
    // requestHeaders.set('x-searchParams-search_query', search_query);
    // requestHeaders.set('x-pathname', pathname);

    // return NextResponse.next({
    //     request: {
    //         headers: requestHeaders,
    //     }
    // });
}