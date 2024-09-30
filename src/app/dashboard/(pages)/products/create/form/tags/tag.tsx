import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tag } from '@/types/tags';
import { Trash, Undo2 } from 'lucide-react';
import React, { memo } from 'react';

interface TagInputProps {
  tag: Tag;
  onChange: (id: number, newName: string) => void;
  onDelete: (tag: Tag) => void;
  onRevert: (id: number) => void;
  isModified: boolean;
}

export const TagInput = memo(({ tag, onChange, onDelete, onRevert, isModified }: TagInputProps) => {
  return (
    <div className="relative grid items-center py-1">
      <Input
        id={`name-${tag.id}`}
        value={tag.name}
        onChange={(e) => onChange(tag.id, e.target.value)}
        className={`w-full col-span-3 pr-20 ${isModified ? 'bg-yellow-100' : ''}`}
      />
      {isModified && (
        <Button
          variant="ghost"
          className="absolute right-14 text-gray-500"
          onClick={() => onRevert(tag.id)}
        >
          <Undo2 className="h-5 w-5" />
        </Button>
      )}
      <Button
        variant="ghost"
        onClick={() => onDelete(tag)}
        className="absolute right-4 text-red-500"
      >
        <Trash className="h-5 w-5" />
      </Button>
    </div>
  );
});
