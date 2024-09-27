import { useEffect, useState, useMemo } from 'react';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Check, X, ChevronDown } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { useProductGroups, useCreateProductGroups, useUpdateProductGroups, useDeleteProductGroups } from '@/hooks/use-product-group';
import { ProductGroup } from '@/types/product-group';
import { ProductGroupInput } from './product-group';


export const ProductGroupsSheet = () => {
    const {
        data: fetchedProductGroups = [],
        isLoading,
        isError,
        error,
    } = useProductGroups();
    const createMutation = useCreateProductGroups();
    const updateMutation = useUpdateProductGroups();
    const deleteMutation = useDeleteProductGroups();

    const [productGroups, setProductGroups] = useState<ProductGroup[]>([]);
    const [modifiedProductGroups, setModifiedProductGroups] = useState<number[]>([]);
    const [deletedProductGroups, setDeletedProductGroups] = useState<ProductGroup[]>([]);
    const [addedProductGroups, setAddedProductGroups] = useState<ProductGroup[]>([]);

    // Keep track of original product groups for comparison
    const originalProductGroups = useMemo(() => {
        const productGroupMap: { [key: number]: string } = {};
        fetchedProductGroups.forEach((productGroup) => {
            productGroupMap[productGroup.id] = productGroup.name;
        });
        return productGroupMap;
    }, [fetchedProductGroups]);

    useEffect(() => {
        setProductGroups(fetchedProductGroups);
    }, [fetchedProductGroups]);

    // Handle product group deletion
    const handleDelete = (productGroup: ProductGroup) => {
        setProductGroups((prevProductGroups) =>
            prevProductGroups.filter((pg) => pg.id !== productGroup.id)
        );
        if (addedProductGroups.some((pg) => pg.id === productGroup.id)) {
            setAddedProductGroups((prev) => prev.filter((pg) => pg.id !== productGroup.id));
        } else {
            setDeletedProductGroups((prev) => [...prev, productGroup]);
        }
    };

    // Handle product group update
    const handleChange = (id: number, newName: string) => {
        const originalName = originalProductGroups[id];
        setProductGroups((prevProductGroups) =>
            prevProductGroups.map((productGroup) =>
                productGroup.id === id ? { ...productGroup, name: newName } : productGroup
            )
        );

        // Track modified product groups by ID
        if (newName !== originalName && !modifiedProductGroups.includes(id)) {
            setModifiedProductGroups((prev) => [...prev, id]);
        } else if (newName === originalName) {
            setModifiedProductGroups((prev) => prev.filter((modifiedId) => modifiedId !== id));
        }
    };

    const handleRevert = (id: number) => {
        setProductGroups((prevProductGroups) =>
            prevProductGroups.map((productGroup) =>
                productGroup.id === id
                    ? { ...productGroup, name: originalProductGroups[id] }
                    : productGroup
            )
        );
        setModifiedProductGroups((prev) => prev.filter((modifiedId) => modifiedId !== id));
    };

    // Add new product group
    const handleAddNewProductGroup = () => {
        const newProductGroup: ProductGroup = {
            id: Date.now(), // Temporary ID; replace with proper ID from backend
            name: `new-${Date.now()}`, // Generate a unique name or handle differently
            _count: { products: 0 }
        };
        setProductGroups((prev) => [...prev, newProductGroup]);
        setAddedProductGroups((prev) => [...prev, newProductGroup]);
    };

    // Reset all changes (Discard)
    const handleDiscardChanges = () => {
        setProductGroups(fetchedProductGroups);
        setModifiedProductGroups([]);
        setDeletedProductGroups([]);
        setAddedProductGroups([]);
    };

    const handleSaveChanges = () => {
        if (addedProductGroups.length > 0) {
            createMutation.mutate(addedProductGroups.map((pg) => ({ name: pg.name })));
        }

        const productGroupsToUpdate = modifiedProductGroups
            .map((id) => productGroups.find((pg) => pg.id === id))
            .filter((pg): pg is ProductGroup => pg !== undefined);

        if (productGroupsToUpdate.length > 0) {
            updateMutation.mutate(productGroupsToUpdate);
        }

        const idsToDelete = deletedProductGroups.map((pg) => pg.id);

        if (idsToDelete.length > 0) {
            deleteMutation.mutate(idsToDelete);
        }

        setModifiedProductGroups([]);
        setAddedProductGroups([]);
        setDeletedProductGroups([]);
    };

    return (
        <Sheet>
            <SheetTrigger>Para gerenciar os grupos de produtos, clique aqui</SheetTrigger>
            <SheetContent className="flex flex-col h-full justify-between">
                <div className="h-4/5">
                    <SheetHeader className="h-1/5">
                        <SheetTitle>Grupos de Produtos</SheetTitle>
                        <SheetDescription>Gerencie seus grupos de produtos</SheetDescription>
                    </SheetHeader>
                    <ScrollArea className="h-3/5 rounded-md grid p-4">
                        {productGroups.map((productGroup) => (
                            <ProductGroupInput
                                key={productGroup.id}
                                productGroup={productGroup}
                                onChange={handleChange}
                                onDelete={handleDelete}
                                onRevert={handleRevert}
                                isModified={modifiedProductGroups.includes(productGroup.id)}
                            />
                        ))}
                    </ScrollArea>
                    <Button
                        className="h-1/5"
                        variant="outline"
                        onClick={handleAddNewProductGroup}
                    >
                        + Adicionar Novo Grupo de Produtos
                    </Button>
                </div>

                <SheetFooter className="flex justify-end w-full self-end">
                    <SheetClose asChild className="self-start">
                        <Button
                            variant="destructive"
                            onClick={handleDiscardChanges}
                            className="text-white flex justify-between items-center p-3"
                            disabled={
                                modifiedProductGroups.length === 0 &&
                                addedProductGroups.length === 0 &&
                                deletedProductGroups.length === 0
                            }
                        >
                            <X className="size-5" />
                            <p>Descartar</p>
                        </Button>
                    </SheetClose>
                    <SheetClose asChild>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="default"
                                    className="w-1/4 bg-green-600 text-white flex justify-between items-center p-3"
                                    disabled={
                                        modifiedProductGroups.length === 0 &&
                                        addedProductGroups.length === 0 &&
                                        deletedProductGroups.length === 0
                                    }
                                >
                                    <Check className="size-5" />
                                    <p>Salvar</p>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Confirmar Alterações</AlertDialogTitle>
                                    <Separator />
                                    <AlertDialogDescription>
                                        <h3 className="mb-4">
                                            Você está prestes a salvar as seguintes alterações:
                                        </h3>
                                        <div className="space-y-4">
                                            {/* Display Added Product Groups */}
                                            {addedProductGroups.length > 0 && (
                                                <>
                                                    <Collapsible>
                                                        <CollapsibleTrigger className="flex items-center gap-2 cursor-pointer mb-4">
                                                            <ChevronDown className="h-4 w-4" />
                                                            <strong className="text-stone-700">
                                                                {addedProductGroups.length} grupo(s) de produtos
                                                                adicionado(s)
                                                            </strong>
                                                        </CollapsibleTrigger>
                                                        <CollapsibleContent className="pl-6">
                                                            <ul className="list-disc flex flex-col gap-1">
                                                                {addedProductGroups.map((pg) => (
                                                                    <li key={pg.name}>{pg.name}</li>
                                                                ))}
                                                            </ul>
                                                        </CollapsibleContent>
                                                    </Collapsible>
                                                    <Separator />
                                                </>
                                            )}
                                            {/* Display Modified Product Groups */}
                                            {modifiedProductGroups.length > 0 && (
                                                <>
                                                    <Collapsible>
                                                        <CollapsibleTrigger className="flex items-center gap-2 cursor-pointer mb-4">
                                                            <ChevronDown className="h-4 w-4" />
                                                            <strong className="text-stone-700">
                                                                {modifiedProductGroups.length} grupo(s) de produtos
                                                                modificado(s)
                                                            </strong>
                                                        </CollapsibleTrigger>
                                                        <CollapsibleContent className="pl-6">
                                                            <ul className="list-disc flex flex-col gap-1">
                                                                {modifiedProductGroups.map((id) => {
                                                                    const originalName = originalProductGroups[id];
                                                                    const modifiedProductGroup = productGroups.find(
                                                                        (pg) => pg.id === id
                                                                    );
                                                                    const newName = modifiedProductGroup?.name;
                                                                    return (
                                                                        <li key={id}>
                                                                            {originalName} → {newName}
                                                                        </li>
                                                                    );
                                                                })}
                                                            </ul>
                                                        </CollapsibleContent>
                                                    </Collapsible>
                                                    <Separator />
                                                </>
                                            )}
                                            {/* Display Deleted Product Groups */}
                                            {deletedProductGroups.length > 0 && (
                                                <>
                                                    <Collapsible>
                                                        <CollapsibleTrigger className="flex items-center gap-2 cursor-pointer mb-4">
                                                            <ChevronDown className="h-4 w-4" />
                                                            <strong className="text-stone-700">
                                                                {deletedProductGroups.length} grupo(s) de produtos
                                                                deletado(s)
                                                            </strong>
                                                        </CollapsibleTrigger>
                                                        <CollapsibleContent className="pl-6">
                                                            <ul className="list-disc flex flex-col gap-1">
                                                                {deletedProductGroups.map((pg) => (
                                                                    <li className="p-1" key={pg.name}>
                                                                        {pg.name} - {pg._count.products} produto(s) afetado(s)
                                                                    </li>
                                                                ))}
                                                                <p className="border rounded-md text-xs text-center w-1/2">
                                                                    Tenha em mente que os produtos sem grupo precisarão ser
                                                                    reagrupados manualmente
                                                                </p>
                                                            </ul>
                                                        </CollapsibleContent>
                                                    </Collapsible>
                                                    <Separator />
                                                </>
                                            )}
                                            {/* If no changes */}
                                            {modifiedProductGroups.length === 0 &&
                                                addedProductGroups.length === 0 &&
                                                deletedProductGroups.length === 0 && (
                                                    <p>Nenhuma alteração foi feita</p>
                                                )}
                                        </div>
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleSaveChanges}>
                                        Continuar
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};
