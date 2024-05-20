import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {

    const url = new URL(request.url);
    const sort_by = url.searchParams.get('sort_by');
    const searchQuery = url.searchParams.get('search_query') || "";
    const page = url.searchParams.get('page');
    const productId = url.searchParams.get('id') || undefined;
    const pathname = url.pathname;

    const requestHeaders = new Headers(request.headers);

    if (sort_by) requestHeaders.set('x-searchParams-sortBy', sort_by);
    if (page) requestHeaders.set('x-searchParams-page', page);
    if (productId) requestHeaders.set('x-searchParams-id', productId);
    requestHeaders.set('x-searchParams-searchQuery', searchQuery);
    requestHeaders.set('x-pathname', pathname);

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        }
    });
}