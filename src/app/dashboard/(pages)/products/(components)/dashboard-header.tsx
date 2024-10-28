"use client"

import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import { usePathname, useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { useDeferredValue, useEffect, useState } from "react"

type NavigationParams = {
    page?: number | null;
    status: string;
    search?: string | null;
    filter?: string | null;
}

export const DashboardHeader = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const search = searchParams.get('search');
    const status = searchParams.get('status') || 'all'; // Default to 'all' if no status is provided

    const handleNavigation = (navParams: { status?: string; search?: string | null }) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(navParams).forEach(([key, value]) => {
            if (value !== undefined) {
                if (value === null) {
                    params.delete(key);
                } else {
                    params.set(key, value.toString());
                }
            }
        });

        const queryString = params.toString();
        const url = queryString ? `${pathname}?${queryString}` : pathname;

        router.replace(url);
    };

    console.log(status);

    return (
        <div className="w-full flex justify-between py-3">
            <Tabs value={status}>
                <TabsList>
                    <TabsTrigger
                        value="all"
                        onClick={() => handleNavigation({ status: 'all' })}
                        className={status == 'all' ? '!text-stone-900 !font-semibold underline' : 'text-stone-500'}
                    >
                        Todos
                    </TabsTrigger>
                    <TabsTrigger
                        value="active"
                        onClick={() => handleNavigation({ status: 'active' })}
                        className={status == 'active' ? '!text-stone-900 !font-semibold underline' : 'text-stone-500'}
                    >
                        Ativos
                    </TabsTrigger>
                    <TabsTrigger
                        value="draft"
                        onClick={() => handleNavigation({ status: 'draft' })}
                        className={status == 'draft' ? '!text-stone-900 !font-semibold underline' : 'text-stone-500'}
                    >
                        Rascunho
                    </TabsTrigger>
                    <TabsTrigger
                        value="archived"
                        onClick={() => handleNavigation({ status: 'archived' })}
                        className={status == 'archived' ? '!text-stone-900 !font-semibold underline' : 'text-stone-500'}
                    >
                        Arquivados
                    </TabsTrigger>
                </TabsList>
            </Tabs>
            <SearchInput searchQuery={search} handleNavigation={handleNavigation} />
        </div>
    );
};


type SearchInputInterface = {
    searchQuery: string | null;
    handleNavigation: ({ page, filter, search, status }: NavigationParams) => void;
}

const SearchInput = ({ searchQuery, handleNavigation }: SearchInputInterface) => {
    const [search, setSearch] = useState(searchQuery || "");
    const deferredInputValue = useDeferredValue(search);

    const searchParams = useSearchParams(); // Get search parameters to retain the current status
    const currentStatus = searchParams.get('status') || 'all'; // Ensure 'all' is used if no status is set

    useEffect(() => {
        const handler = setTimeout(() => {
            if (deferredInputValue !== searchQuery) {
                handleNavigation({
                    search: deferredInputValue || null,
                    status: currentStatus // Pass the current status along with search
                });
            }
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [deferredInputValue]);

    return (
        <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                placeholder="Pesquisar..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
        </div>
    );
};
