import React, { useState, useMemo } from 'react';
import { ChevronsUpDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ProductGroup } from '@/types/product-group';

type ProductGroupSelectorProps = {
  productGroups: ProductGroup[];
  selectedProductGroup: ProductGroup | null;
  onChange: (selected: ProductGroup | null) => void;
  searchPlaceholder?: string;
  noResultsMsg?: string;
  selectItemMsg?: string;
  className?: string;
  disabled?: boolean;
};

export const ProductGroupSelector = ({
  productGroups,
  selectedProductGroup,
  onChange,
  searchPlaceholder = 'Buscar grupo de produto...',
  noResultsMsg = 'Nenhum grupo de produto encontrado',
  selectItemMsg = 'Selecione um grupo de produto',
  className,
  disabled = false,
}: ProductGroupSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Filter product groups based on inputValue
  const filteredProductGroups = useMemo(() => {
    return productGroups.filter((group) =>
      group.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [inputValue, productGroups]);

  const handleSelect = (group: ProductGroup) => {
    if (selectedProductGroup?.id === group.id) {
      // Deselect if the same group is selected
      onChange(null);
    } else {
      onChange(group);
    }
    setOpen(false); // Close the popover after selection
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full justify-between ${className}`}
          disabled={disabled}
        >
          <div className="flex items-center">
            {selectedProductGroup ? (
              <span className="text-sm">{selectedProductGroup.name}</span>
            ) : (
              <span className="text-sm text-gray-500">{selectItemMsg}</span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder={searchPlaceholder}
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            <CommandEmpty className="text-sm text-stone-500 p-3">
              {noResultsMsg}
            </CommandEmpty>
            <CommandGroup>
              {filteredProductGroups.map((group) => (
                <CommandItem key={group.id} onSelect={() => handleSelect(group)}>
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedProductGroup?.id === group.id
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {group.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
