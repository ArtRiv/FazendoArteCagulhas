import { useEffect, useState, useMemo } from "react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Check, X, ChevronDown, Tags } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
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
} from "@/components/ui/alert-dialog";
import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Category } from "@/types/categories";
import {
    useCategories,
    useCreateCategories,
    useUpdateCategories,
    useDeleteCategories,
} from "@/hooks/use-categories";
import { CategoryInput } from "./category";


export const CategoriesSheet = () => {
    const { data: fetchedCategories = [], isLoading, isError, error } = useCategories();
    const createMutation = useCreateCategories();
    const updateMutation = useUpdateCategories();
    const deleteMutation = useDeleteCategories();

    const [categories, setCategories] = useState<Category[]>([]);
    const [modifiedCategories, setModifiedCategories] = useState<number[]>([]);
    const [deletedCategories, setDeletedCategories] = useState<Category[]>([]);
    const [addedCategories, setAddedCategories] = useState<Category[]>([]);

    const originalCategories = useMemo(() => {
        const categoryMap: { [key: string]: string } = {};
        fetchedCategories.forEach((category) => {
            categoryMap[category.id.toString()] = category.name;
        });
        return categoryMap;
    }, [fetchedCategories]);

    useEffect(() => {
        setCategories(fetchedCategories);
    }, []);

    const handleDelete = (category: Category) => {
        setCategories((prev) => prev.filter((cat) => cat.id !== category.id));
        if (addedCategories.some((cat) => cat.id === category.id)) {
            setAddedCategories((prev) => prev.filter((cat) => cat.id !== category.id));
        } else {
            setDeletedCategories((prev) => [...prev, category]);
        }
        setModifiedCategories((prev) => prev.filter((id) => id !== category.id));
    };

    const handleChange = (id: number, newName: string) => {
        const isAdded = addedCategories.some((cat) => cat.id === id);
        if (isAdded) {
            setAddedCategories((prev) =>
                prev.map((cat) => (cat.id === id ? { ...cat, name: newName } : cat))
            );
            setCategories(prevCat =>
                prevCat.map(cat =>
                    cat.id === id ? { ...cat, name: newName } : cat
                )
            );
        } else {
            const originalName = originalCategories[id.toString()];
            setCategories((prev) =>
                prev.map((cat) => (cat.id === id ? { ...cat, name: newName } : cat))
            );

            if (newName !== originalName && !modifiedCategories.includes(id)) {
                setModifiedCategories((prev) => [...prev, id]);
            } else if (newName === originalName) {
                setModifiedCategories((prev) => prev.filter((modifiedId) => modifiedId !== id));
            }
        }
    };

    const handleRevert = (id: number) => {
        const isAdded = addedCategories.some((cat) => cat.id === id);
        if (isAdded) {
            setCategories((prev) => prev.filter((cat) => cat.id !== id));
            setAddedCategories((prev) => prev.filter((cat) => cat.id !== id));
        } else {
            setCategories((prev) =>
                prev.map((cat) => (cat.id === id ? { ...cat, name: originalCategories[id.toString()] } : cat))
            );
            setModifiedCategories((prev) => prev.filter((modifiedId) => modifiedId !== id));
        }
    };

    const handleAddNewCategory = () => {
        const newCategory: Category = {
            id: Date.now(),
            name: `new-${Date.now()}`,
            _count: { products: 0 },
        };
        setCategories((prev) => [...prev, newCategory]);
        setAddedCategories((prev) => [...prev, newCategory]);
    };

    const handleDiscardChanges = () => {
        setCategories(fetchedCategories);
        setModifiedCategories([]);
        setDeletedCategories([]);
        setAddedCategories([]);
    };

    const handleSaveChanges = () => {
        if (addedCategories.length > 0) {
            createMutation.mutate(addedCategories.map((cat) => ({ name: cat.name })));
        }

        const categoriesToUpdate = modifiedCategories
            .map((id) => categories.find((cat) => cat.id === id))
            .filter((cat): cat is Category => cat !== undefined);

        if (categoriesToUpdate.length > 0) {
            updateMutation.mutate(categoriesToUpdate);
        }

        const idsToDelete = deletedCategories.map((cat) => cat.id);

        if (idsToDelete.length > 0) {
            deleteMutation.mutate(idsToDelete);
        }

        setModifiedCategories([]);
        setAddedCategories([]);
        setDeletedCategories([]);
    };
    return (
        <Sheet>
            <SheetTrigger>Para gerenciar as categorias, clique aqui</SheetTrigger>
            <SheetContent className="flex flex-col h-full justify-between">
                <SheetHeader>
                    <SheetTitle>Categorias</SheetTitle>
                    <SheetDescription>Gerencie suas categorias</SheetDescription>
                </SheetHeader>
                <ScrollArea className="h-3/5 rounded-md grid p-4">
                    {categories.length === 0 ? (
                        <p className="text-sm text-stone-500"> Nenhuma categoria encontrada. </p>
                    ) : (
                        categories.map((category) => (
                            <CategoryInput
                                key={category.id}
                                category={category}
                                onChange={handleChange}
                                onDelete={handleDelete}
                                onRevert={handleRevert}
                                isModified={modifiedCategories.includes(category.id)}
                            />

                        ))
                    )}
                </ScrollArea>
                <Button variant="outline" onClick={handleAddNewCategory} className="mt-4">
                    + Adicionar nova categoria
                </Button>
                <SheetFooter className="flex justify-end w-full self-end mt-4">
                    <SheetClose asChild>
                        <Button
                            variant="destructive"
                            onClick={handleDiscardChanges}
                            className="text-white flex justify-between items-center p-3 mr-2"
                            disabled={
                                modifiedCategories.length === 0 &&
                                addedCategories.length === 0 &&
                                deletedCategories.length === 0
                            }
                        >
                            <X className="size-5 mr-2" />
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
                                        modifiedCategories.length === 0 &&
                                        addedCategories.length === 0 &&
                                        deletedCategories.length === 0
                                    }
                                >
                                    <Check className="size-5 mr-2" />
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
                                            {/* Display Added Categories */}
                                            {addedCategories.length > 0 && (
                                                <>
                                                    <Collapsible>
                                                        <CollapsibleTrigger className="flex items-center gap-2 cursor-pointer mb-4">
                                                            <ChevronDown className="h-4 w-4" />
                                                            <strong className="text-stone-700">
                                                                {addedCategories.length} categoria(s)
                                                                adicionada(s)
                                                            </strong>
                                                        </CollapsibleTrigger>
                                                        <CollapsibleContent className="pl-6">
                                                            <ul className="list-disc flex flex-col gap-1">
                                                                {addedCategories.map((category) => (
                                                                    <li key={category.name}>{category.name}</li>
                                                                ))}
                                                            </ul>
                                                        </CollapsibleContent>
                                                    </Collapsible>
                                                    <Separator />
                                                </>
                                            )}
                                            {/* Display Modified Categories */}
                                            {modifiedCategories.length > 0 && (
                                                <>
                                                    <Collapsible>
                                                        <CollapsibleTrigger className="flex items-center gap-2 cursor-pointer mb-4">
                                                            <ChevronDown className="h-4 w-4" />
                                                            <strong className="text-stone-700">
                                                                {modifiedCategories.length} categoria(s) modificada(s)
                                                            </strong>
                                                        </CollapsibleTrigger>
                                                        <CollapsibleContent className="pl-6">
                                                            <ul className="list-disc flex flex-col gap-1">
                                                                {modifiedCategories.map((id) => {
                                                                    const originalName = originalCategories[id];
                                                                    const modifiedCategory = categories.find((cat) => cat.id === id);
                                                                    const newName = modifiedCategory?.name;
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
                                            {/* Display Deleted Categories */}
                                            {deletedCategories.length > 0 && (
                                                <>
                                                    <Collapsible>
                                                        <CollapsibleTrigger className="flex items-center gap-2 cursor-pointer mb-4">
                                                            <ChevronDown className="h-4 w-4" />
                                                            <strong className="text-stone-700">
                                                                {deletedCategories.length} categoria(s)
                                                                deletada(s)
                                                            </strong>
                                                        </CollapsibleTrigger>
                                                        <CollapsibleContent className="pl-6">
                                                            <ul className="list-disc flex flex-col gap-1">
                                                                {deletedCategories.map((category) => (
                                                                    <li className="p-1" key={category.name}>
                                                                        {category.name} -{" "}
                                                                        {category._count.products} produto(s)
                                                                        afetado(s)
                                                                    </li>
                                                                ))}
                                                                <p className="border rounded-md text-xs text-center w-1/2">
                                                                    Tenha em mente que os produtos sem categoria
                                                                    terão de ser recategorizados manualmente
                                                                </p>
                                                            </ul>
                                                        </CollapsibleContent>
                                                    </Collapsible>
                                                    <Separator />
                                                </>
                                            )}
                                            {/* If no changes */}
                                            {modifiedCategories.length === 0 &&
                                                addedCategories.length === 0 &&
                                                deletedCategories.length === 0 && (
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
            </SheetContent >
        </Sheet >
    );
};
