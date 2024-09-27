import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProductGroup } from '@/types/product-group';
import { Trash, Undo2 } from 'lucide-react';
import React, { memo } from 'react';

interface ProductGroupInputProps {
  productGroup: ProductGroup;
  onChange: (id: number, newName: string) => void;
  onDelete: (productGroup: ProductGroup) => void;
  onRevert: (id: number) => void;
  isModified: boolean;
}

export const ProductGroupInput = memo(({ productGroup, onChange, onDelete, onRevert, isModified }: ProductGroupInputProps) => {
  return (
    <div className="relative grid items-center py-1">
      <Input
        id={`name-${productGroup.id}`}
        value={productGroup.name}
        onChange={(e) => onChange(productGroup.id, e.target.value)}
        className={`w-full col-span-3 pr-20 ${isModified ? "bg-yellow-100" : ""}`}
      />
      {isModified && (
        <Button
          variant="ghost"
          className="absolute right-14 text-gray-500"
          onClick={() => onRevert(productGroup.id)}
        >
          <Undo2 className="h-5 w-5" />
        </Button>
      )}
      <Button
        variant="ghost"
        onClick={() => onDelete(productGroup)}
        className="absolute right-4 text-red-500"
      >
        <Trash className="h-5 w-5" />
      </Button>
    </div>
  );
});
