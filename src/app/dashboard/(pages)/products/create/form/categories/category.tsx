import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Category } from '@/types/categories';
import { Trash, Undo2 } from 'lucide-react';
import React, { memo } from 'react';

interface CategoryInputProps {
    category: Category;
    onChange: (id: number, newName: string) => void;
    onDelete: (category: Category) => void;
    onRevert: (id: number) => void;
    isModified: boolean;
  }

export const CategoryInput = memo(({ category, onChange, onDelete, onRevert, isModified }: CategoryInputProps) => {
    return (
        <div className="relative grid items-center py-1">
            <Input
                id={`name-${category.id}`}
                value={category.name}
                onChange={(e) => onChange(category.id, e.target.value)}
                className={`w-full col-span-3 pr-20 ${isModified ? "bg-yellow-100" : ""}`}
            />
            {isModified && (
                <Button
                    variant="ghost"
                    className="absolute right-14 text-gray-500"
                    onClick={() => onRevert(category.id)}
                >
                    <Undo2 className="h-5 w-5" />
                </Button>
            )}
            <Button
                variant="ghost"
                onClick={() => onDelete(category)}
                className="absolute right-4 text-red-500"
            >
                <Trash className="h-5 w-5" />
            </Button>
        </div>
    );
});
