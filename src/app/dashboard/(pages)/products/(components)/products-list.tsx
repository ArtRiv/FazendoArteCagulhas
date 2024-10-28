'use client'
import Image from "next/image"
import { MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { formatPrice } from "@/utils/format-price"
import { formatUnixDateTime } from "@/utils/format-date"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { deleteProduct, getDashboardProductsDTO } from "@/services/product_crud"
import Link from "next/link"

export const ProductsList = ({ products }: { products: getDashboardProductsDTO[] }) => {

    return (
        <>
            {products && (
                <>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell className="hidden sm:table-cell">
                                <Image
                                    alt={`Imagem do produto ${product.title}`}
                                    className="aspect-square rounded-md object-cover"
                                    height="64"
                                    src={product.media[0]}
                                    width="64"
                                />
                            </TableCell>

                            <TableCell className="font-medium">{product.title}</TableCell>

                            <TableCell>
                                <Badge variant="outline">
                                    {(() => {
                                        switch (product.status) {
                                            case "active":
                                                return "Ativo";
                                            case "draft":
                                                return "Rascunho";
                                            case "archived":
                                                return "Arquivado";
                                            default:
                                                return "Desconhecido";
                                        }
                                    })()}
                                </Badge>
                            </TableCell>

                            <TableCell className="hidden md:table-cell">
                                {formatPrice(product.price)}
                            </TableCell>

                            <TableCell className="hidden md:table-cell">
                                {product.purchase_count}
                            </TableCell>

                            <TableCell className="hidden md:table-cell">
                                {product.page_views}
                            </TableCell>
                            
                            <TableCell className="hidden md:table-cell">
                                {formatUnixDateTime(product.created_at)}
                            </TableCell>

                            <TableCell>
                                <AlertDialog>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">Expandir menu</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <Link href={`products/update?id=${product.id}`}>
                                                <DropdownMenuItem className="cursor-pointer">
                                                    Editar
                                                </DropdownMenuItem>
                                            </Link>
                                            <AlertDialogTrigger>
                                                <DropdownMenuItem className="cursor-pointer">
                                                    Deletar
                                                </DropdownMenuItem>
                                            </AlertDialogTrigger>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Essa ação é irreversível. Todos os dados deste produto serão permanentemente removidos e excluídos de nosso servidor.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => deleteProduct(product.id)}>Deletar</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </>
            )}
        </>
    );
};
