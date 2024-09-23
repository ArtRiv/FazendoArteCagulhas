import { useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash, Undo2, Check, X } from "lucide-react";
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
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Category } from "@/types/categories";

export const CategoriesSheet = ({ categories: initialCategories }: { categories: Category[] }) => {
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [modifiedCategories, setModifiedCategories] = useState<string[]>([]);
    const [deletedCategories, setDeletedCategories] = useState<Category[]>([]);
    const [addedCategories, setAddedCategories] = useState<Category[]>([]);
    const [originalCategories, setOriginalCategories] = useState<Record<string, string>>(
        initialCategories.reduce((acc, category) => ({ ...acc, [category.name]: category.name }), {})
    );

    // Handle category deletion
    const handleDelete = (category: Category) => {
        setCategories((prevCategories) => prevCategories.filter((cat) => cat.name !== category.name));
        if (addedCategories.includes(category)) {
            setAddedCategories((prev) => prev.filter((cat) => cat.name !== category.name));
        } else {
            setDeletedCategories((prev) => [...prev, category]);
        }
    };

    // Handle category update
    const handleChange = (name: string, newLabel: string) => {
        const originalLabel = originalCategories[name];
        setCategories((prevCategories) =>
            prevCategories.map((category) =>
                category.name === name ? { ...category, label: newLabel } : category
            )
        );

        // Track modified categories
        if (newLabel !== originalLabel && !modifiedCategories.includes(name)) {
            setModifiedCategories((prev) => [...prev, name]);
        } else if (newLabel === originalLabel) {
            setModifiedCategories((prev) => prev.filter((modifiedName) => modifiedName !== name));
        }
    };

    // Revert category label to its original value
    const handleRevert = (name: string) => {
        setCategories((prevCategories) =>
            prevCategories.map((category) =>
                category.name === name ? { ...category, label: originalCategories[name] } : category
            )
        );
        setModifiedCategories((prev) => prev.filter((modifiedName) => modifiedName !== name));
    };

    // Add new category
    const handleAddNewCategory = () => {
        const newCategory = { id: Date.now(), name: `new-${Date.now()}`, label: "Nova Categoria", _count: { products: 0 } };
        setCategories((prev) => [...prev, newCategory]);
        setAddedCategories((prev) => [...prev, newCategory]);
    };

    // Reset all changes (Discard)
    const handleDiscardChanges = () => {
        setCategories(initialCategories);
        setModifiedCategories([]);
        setDeletedCategories([]);
        setAddedCategories([]);
    };

    return (
        <Sheet>
            <SheetTrigger>
                Para gerenciar as categorias, clique aqui
            </SheetTrigger>
            <SheetContent className="flex flex-col h-full justify-between">
                <div className="h-4/5">
                    <SheetHeader className="h-1/5">
                        <SheetTitle>Categorias</SheetTitle>
                        <SheetDescription>Gerencie suas categorias</SheetDescription>
                    </SheetHeader>
                    <ScrollArea className="h-3/5 rounded-md grid p-4">
                        {categories.map((category) => (
                            <div className="relative grid items-center py-1" key={category.name}>
                                <Input
                                    id="name"
                                    value={category.name}
                                    onChange={(e) => handleChange(category.name, e.target.value)}
                                    className={`w-full col-span-3 pr-20 ${modifiedCategories.includes(category.name) ? "bg-yellow-100" : ""}`}
                                />
                                {modifiedCategories.includes(category.name) && (
                                    <Button
                                        variant="ghost"
                                        className="absolute right-14 text-gray-500"
                                        onClick={() => handleRevert(category.name)}
                                    >
                                        <Undo2 className="h-5 w-5" />
                                    </Button>
                                )}
                                <Button
                                    variant="ghost"
                                    onClick={() => handleDelete(category)}
                                    className="absolute right-4 text-red-500"
                                >
                                    <Trash className="h-5 w-5" />
                                </Button>
                            </div>
                        ))}
                    </ScrollArea>
                    <Button className="h-1/5" variant="outline" onClick={handleAddNewCategory}>
                        + Adicionar Nova Categoria
                    </Button>
                </div>

                <SheetFooter className="flex justify-end w-full self-end">
                    <SheetClose asChild className="self-start">
                        <Button variant="destructive" onClick={handleDiscardChanges} className="text-white flex justify-between items-center p-3">
                            <X className="size-5" />
                            <p>Descartar</p>
                        </Button>
                    </SheetClose>
                    <SheetClose asChild>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="default" className="w-1/4 bg-green-600 text-white flex justify-between items-center p-3">
                                    <Check className="size-5" />
                                    <p>Salvar</p>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Confirmar Alterações</AlertDialogTitle>
                                    <Separator />
                                    <AlertDialogDescription>
                                        <h3 className="mb-4">Você está prestes a salvar as seguintes alterações:</h3>
                                        <div className="space-y-4">
                                            {/* Display Added Categories */}
                                            {addedCategories.length > 0 && (
                                                <>
                                                    <Collapsible>
                                                        <CollapsibleTrigger className="flex items-center gap-2 cursor-pointer mb-4">
                                                            <ChevronDown className="h-4 w-4" />
                                                            <strong className="text-stone-700">{addedCategories.length} categoria(s) adicionada(s)</strong>
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
                                                            <strong className="text-stone-700">{modifiedCategories.length} categoria(s) modificada(s)</strong>
                                                        </CollapsibleTrigger>
                                                        <CollapsibleContent className="pl-6">
                                                            <ul className="list-disc flex flex-col gap-1">
                                                                {modifiedCategories.map((name) => (
                                                                    <li key={name}>
                                                                        {originalCategories[name]} →{" "}
                                                                        {categories.find((cat) => cat.name === name)?.name}
                                                                    </li>
                                                                ))}
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
                                                            <strong className="text-stone-700">{deletedCategories.length} categoria(s) deletada(s)</strong>
                                                        </CollapsibleTrigger>
                                                        <CollapsibleContent className="pl-6">
                                                            <ul className="list-disc flex flex-col gap-1">
                                                                {deletedCategories.map((category) => (
                                                                    <li className="p-1" key={category.name}>
                                                                        {category.name} - {category._count.products} produto(s) afetado(s)
                                                                    </li>
                                                                ))}
                                                                <p className="border rounded-md text-xs text-center w-1/2">
                                                                    Tenha em mente que os produtos sem categoria terão de ser recategorizados manualmente
                                                                </p>
                                                            </ul>
                                                        </CollapsibleContent>
                                                    </Collapsible>
                                                    <Separator />
                                                </>
                                            )}
                                            {/* If no changes */}
                                            {modifiedCategories.length === 0 && addedCategories.length === 0 && deletedCategories.length === 0 && (
                                                <p>Nenhuma alteração foi feita</p>
                                            )}
                                        </div>
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction>Continuar</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};