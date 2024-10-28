"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { File, ListFilter, PlusCircle } from "lucide-react"
import { useSearchParams, usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import Link from "next/link"

type NavigationParams = {
    page?: number | null;
    status?: string | null;
    search?: string | null;
    filter?: string | null;
}

export const CardActions = () => {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const filter = searchParams.get('filter') || 'most_recent';

    const handleNavigation = (navParams: NavigationParams) => {
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

    return (
        <div className="flex items-center justify-center gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Filtro
                        </span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                        onCheckedChange={(checked) =>
                            handleNavigation({ filter: checked ? "most_recent" : null })
                        }
                        checked={filter === "most_recent"}
                        className={filter === "most_recent" ? "!text-stone-900 !font-semibold" : "text-stone-500"}
                    >
                        Mais recente
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        onCheckedChange={(checked) =>
                            handleNavigation({ filter: checked ? "most_viewed" : null })
                        }
                        checked={filter === "most_viewed"}
                        className={filter === "most_viewed" ? "!text-stone-900 !font-semibold" : "text-stone-500"}
                    >
                        Mais visto
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        onCheckedChange={(checked) =>
                            handleNavigation({ filter: checked ? "best_selling" : null })
                        }
                        checked={filter === "best_selling"}
                        className={filter === "best_selling" ? "!text-stone-900 !font-semibold" : "text-stone-500"}
                    >
                        Mais vendido
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Exportar
                </span>
            </Button>
            <Link href="products/create">
                <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Adicionar produto
                    </span>
                </Button>
            </Link>
        </div>
    )
}
