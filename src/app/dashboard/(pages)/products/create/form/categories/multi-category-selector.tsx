import React, { useState, useMemo, useEffect } from 'react';
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
import { Category } from '@/types/categories';

type MultiCategorySelectorProps = {
    categories: Category[];
    selectedCategories: Category[];
    onChange: (selected: Category[]) => void;
    searchPlaceholder?: string;
    noResultsMsg?: string;
    selectItemMsg?: string;
    className?: string;
    disabled?: boolean;
};

export const MultiCategorySelector = ({
    categories,
    selectedCategories,
    onChange,
    searchPlaceholder = 'Buscar categoria...',
    noResultsMsg = 'Nenhuma categoria encontrada...',
    selectItemMsg = 'Selecione uma categoria',
    className,
    disabled = false,
}: MultiCategorySelectorProps) => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    // Filter categories based on input value
    const filteredCategories = useMemo(() => {
        return categories.filter(category =>
            category.name.toLowerCase().includes(inputValue.toLowerCase())
        );
    }, [inputValue, categories]);

    // Update selectedCategories if any category has been updated or deleted
    useEffect(() => {
        const updatedSelectedCategories = selectedCategories
            .map(selectedCategory =>
                categories.find(category => category.id === selectedCategory.id)
            )
            .filter((category): category is Category => category !== undefined);

        // Check if there are differences between selectedCategories and updatedSelectedCategories
        const isDifferent =
            selectedCategories.length !== updatedSelectedCategories.length ||
            selectedCategories.some(
                (selectedCategory, index) =>
                    selectedCategory.id !== updatedSelectedCategories[index].id ||
                    selectedCategory.name !== updatedSelectedCategories[index].name
            );

        if (isDifferent) {
            onChange(updatedSelectedCategories);
        }
    }, [categories, selectedCategories, onChange]);

    const handleSelect = (category: Category) => {
        const isAlreadySelected = selectedCategories.some(
            selected => selected.id === category.id
        );
        let newSelectedCategories: Category[];
        if (isAlreadySelected) {
            newSelectedCategories = selectedCategories.filter(
                selected => selected.id !== category.id
            );
        } else {
            newSelectedCategories = [...selectedCategories, category];
        }
        onChange(newSelectedCategories);
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
                    <div className="flex max-h-32 overflow-y-auto flex-wrap gap-2">
                        {selectedCategories.length > 0 ? (
                            selectedCategories.map(category => (
                                <span
                                    key={category.id}
                                    className="flex items-center gap-1 px-2 py-1 bg-green-300 rounded-md text-sm"
                                >
                                    {category.name}
                                    <span
                                        role="button"
                                        tabIndex={0}
                                        className="ml-1 text-base text-gray-600 hover:text-gray-900 cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSelect(category);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                handleSelect(category);
                                            }
                                        }}
                                    >
                                        &times;
                                    </span>
                                </span>
                            ))
                        ) : (
                            selectItemMsg
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
                        <CommandEmpty className='text-sm text-stone-500 p-3'>{noResultsMsg}</CommandEmpty>
                        <CommandGroup>
                            {filteredCategories.map(category => (
                                <CommandItem
                                    key={category.id}
                                    onSelect={() => handleSelect(category)}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            selectedCategories.some(
                                                selected => selected.id === category.id
                                            )
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        )}
                                    />
                                    {category.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
