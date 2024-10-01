// src/components/TagManagementSheet.tsx

'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
    SheetClose,
} from '@/components/ui/sheet';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Check, X, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { Tag } from '@/types/tags';
import { TagInput } from './tag';
import {
    useTags,
    useCreateTags,
    useUpdateTags,
    useDeleteTags,
} from '@/hooks/use-tags';

export const TagManagementSheet = () => {
    const { data: fetchedTags = [], isLoading, isError, error } = useTags();
    const createMutation = useCreateTags();
    const updateMutation = useUpdateTags();
    const deleteMutation = useDeleteTags();

    const [tags, setTags] = useState<Tag[]>([]);
    const [modifiedTags, setModifiedTags] = useState<number[]>([]);
    const [deletedTags, setDeletedTags] = useState<Tag[]>([]);
    const [addedTags, setAddedTags] = useState<Tag[]>([]);

    // Keep track of original tags for comparison with string keys
    const originalTags = useMemo(() => {
        const tagMap: { [key: string]: string } = {};
        fetchedTags.forEach((tag) => {
            tagMap[tag.id.toString()] = tag.name;
        });
        return tagMap;
    }, [fetchedTags]);

    useEffect(() => {
        setTags(fetchedTags);
    }, []);

    // Handle tag deletion
    const handleDelete = (tag: Tag) => {
        setTags((prevTags) => prevTags.filter((t) => t.id !== tag.id));
        if (addedTags.some((t) => t.id === tag.id)) {
            setAddedTags((prev) => prev.filter((t) => t.id !== tag.id));
        } else {
            setDeletedTags((prev) => [...prev, tag]);
        }
        setModifiedTags((prev) => prev.filter((id) => id !== tag.id));
    };

    // Handle tag name change
    const handleChange = (id: number, newName: string) => {
        const isAdded = addedTags.some(tag => tag.id === id);
        if (isAdded) {
            // Update the name in addedTags
            setAddedTags(prev =>
                prev.map(tag => tag.id === id ? { ...tag, name: newName } : tag)
            );
            // Also update in the main tags list
            setTags(prevTags =>
                prevTags.map(tag =>
                    tag.id === id ? { ...tag, name: newName } : tag
                )
            );
        } else {
            const originalName = originalTags[id.toString()]; // Access using string key
            setTags((prevTags) =>
                prevTags.map((tag) =>
                    tag.id === id ? { ...tag, name: newName } : tag
                )
            );
            if (newName !== originalName && !modifiedTags.includes(id)) {
                setModifiedTags((prev) => [...prev, id]);
            } else if (newName === originalName) {
                setModifiedTags((prev) => prev.filter((modifiedId) => modifiedId !== id));
            }
        }
    };

    // Handle reverting tag name change
    const handleRevert = (id: number) => {
        const isAdded = addedTags.some(tag => tag.id === id);
        if (isAdded) {
            // Remove the tag from addedTags and tags
            setTags(prevTags => prevTags.filter(tag => tag.id !== id));
            setAddedTags(prev => prev.filter(tag => tag.id !== id));
        } else {
            // Revert the name in the main tags list
            setTags((prevTags) =>
                prevTags.map((tag) =>
                    tag.id === id ? { ...tag, name: originalTags[id.toString()] } : tag
                )
            );
            // Remove from modifiedTags if the name matches the original
            setModifiedTags((prev) => prev.filter((modifiedId) => modifiedId !== id));
        }
    };

    // Add a new tag
    const handleAddNewTag = () => {
        const newTag: Tag = {
            id: Date.now(), // Temporary ID; replace with proper ID from backend
            name: `new-tag-${Date.now()}`,
        };
        setTags((prev) => [...prev, newTag]);
        setAddedTags((prev) => [...prev, newTag]);
    };

    // Discard all changes
    const handleDiscardChanges = () => {
        setTags(fetchedTags);
        setModifiedTags([]);
        setDeletedTags([]);
        setAddedTags([]);
    };

    // Save all changes
    const handleSaveChanges = () => {
        // Create new tags with updated names
        if (addedTags.length > 0) {
            createMutation.mutate(addedTags.map((tag) => ({ name: tag.name })));
        }

        // Update modified tags
        const tagsToUpdate = modifiedTags
            .map((id) => tags.find((tag) => tag.id === id))
            .filter((tag): tag is Tag => tag !== undefined);

        if (tagsToUpdate.length > 0) {
            updateMutation.mutate(tagsToUpdate);
        }

        // Delete removed tags
        const idsToDelete = deletedTags.map((tag) => tag.id);

        if (idsToDelete.length > 0) {
            deleteMutation.mutate(idsToDelete);
        }

        // Reset state
        setModifiedTags([]);
        setAddedTags([]);
        setDeletedTags([]);
    };

    return (
        <Sheet>
            <SheetTrigger>Para gerenciar as tags, clique aqui</SheetTrigger>
            <SheetContent className="flex flex-col h-full justify-between">
                <SheetHeader>
                    <SheetTitle>Tags</SheetTitle>
                    <SheetDescription>Gerencie suas tags</SheetDescription>
                </SheetHeader>
                <ScrollArea className="h-3/5 rounded-md grid p-4">
                    {tags.length === 0 ? (
                        <p className="text-sm text-stone-500">Nenhuma tag encontrada.</p>
                    ) : (
                        tags.map((tag) => (
                            <TagInput
                                key={tag.id}
                                tag={tag}
                                onChange={handleChange}
                                onDelete={handleDelete}
                                onRevert={handleRevert}
                                isModified={modifiedTags.includes(tag.id)}
                            />
                        ))
                    )}
                </ScrollArea>
                <Button variant="outline" onClick={handleAddNewTag} className="mt-4">
                    + Adicionar nova Tag
                </Button>
                <SheetFooter className="flex justify-end w-full self-end mt-4">
                    <SheetClose asChild>
                        <Button
                            variant="destructive"
                            onClick={handleDiscardChanges}
                            className="text-white flex justify-between items-center p-3 mr-2"
                            disabled={
                                modifiedTags.length === 0 &&
                                addedTags.length === 0 &&
                                deletedTags.length === 0
                            }
                        >
                            <X className="size-5 mr-2" />
                            <span>Descartar</span>
                        </Button>
                    </SheetClose>
                    <SheetClose asChild>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="default"
                                    className="w-1/4 bg-green-600 text-white flex justify-between items-center p-3"
                                    disabled={
                                        modifiedTags.length === 0 &&
                                        addedTags.length === 0 &&
                                        deletedTags.length === 0
                                    }
                                >
                                    <Check className="size-5 mr-2" />
                                    <span>Salvar</span>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Confirmar Alterações</AlertDialogTitle>
                                    <Separator />
                                    <div className='text-sm text-muted-foreground'>
                                        <h3 className="mb-4">
                                            Você está prestes a salvar as seguintes alterações:
                                        </h3>
                                        <div className="space-y-4">
                                            {/* Display Added Tags */}
                                            {addedTags.length > 0 && (
                                                <>
                                                    <Collapsible>
                                                        <CollapsibleTrigger className="flex items-center gap-2 cursor-pointer mb-4">
                                                            <ChevronDown className="h-4 w-4" />
                                                            <strong className="text-stone-700">
                                                                {addedTags.length} tag(s) adicionada(s)
                                                            </strong>
                                                        </CollapsibleTrigger>
                                                        <CollapsibleContent className="pl-6">
                                                            <ul className="list-disc flex flex-col gap-1">
                                                                {addedTags.map((tag) => (
                                                                    <li key={tag.id}>{tag.name}</li>
                                                                ))}
                                                            </ul>
                                                        </CollapsibleContent>
                                                    </Collapsible>
                                                    <Separator />
                                                </>
                                            )}
                                            {/* Display Modified Tags */}
                                            {modifiedTags.length > 0 && (
                                                <>
                                                    <Collapsible>
                                                        <CollapsibleTrigger className="flex items-center gap-2 cursor-pointer mb-4">
                                                            <ChevronDown className="h-4 w-4" />
                                                            <strong className="text-stone-700">
                                                                {modifiedTags.length} tag(s) modificada(s)
                                                            </strong>
                                                        </CollapsibleTrigger>
                                                        <CollapsibleContent className="pl-6">
                                                            <ul className="list-disc flex flex-col gap-1">
                                                                {modifiedTags.map((id) => {
                                                                    const originalName = originalTags[id.toString()]; // Access using string key
                                                                    const modifiedTag = tags.find((tag) => tag.id === id);
                                                                    const newName = modifiedTag?.name;
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
                                            {/* Display Deleted Tags */}
                                            {deletedTags.length > 0 && (
                                                <>
                                                    <Collapsible>
                                                        <CollapsibleTrigger className="flex items-center gap-2 cursor-pointer mb-4">
                                                            <ChevronDown className="h-4 w-4" />
                                                            <strong className="text-stone-700">
                                                                {deletedTags.length} tag(s) deletada(s)
                                                            </strong>
                                                        </CollapsibleTrigger>
                                                        <CollapsibleContent className="pl-6">
                                                            <ul className="list-disc flex flex-col gap-1">
                                                                {deletedTags.map((tag) => (
                                                                    <li className="p-1" key={tag.id}>
                                                                        {tag.name}
                                                                    </li>
                                                                ))}
                                                                <p className="border rounded-md text-xs text-center w-1/2 mt-2">
                                                                    Tenha em mente que os produtos sem tag precisarão ser
                                                                    reagrupados manualmente
                                                                </p>
                                                            </ul>
                                                        </CollapsibleContent>
                                                    </Collapsible>
                                                    <Separator />
                                                </>
                                            )}
                                            {/* If no changes */}
                                            {modifiedTags.length === 0 &&
                                                addedTags.length === 0 &&
                                                deletedTags.length === 0 && (
                                                    <p>Nenhuma alteração foi feita</p>
                                                )}
                                        </div>
                                    </div>
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
