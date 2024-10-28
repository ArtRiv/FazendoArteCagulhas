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
import { Tag } from '@/types/tags';

type MultiTagSelectorProps = {
    tags: Tag[];
    selectedTags: Tag[];
    onChange: (selected: Tag[]) => void;
    searchPlaceholder?: string;
    noResultsMsg?: string;
    selectItemMsg?: string;
    className?: string;
    disabled?: boolean;
};

export const MultiTagSelector = ({
    tags,
    selectedTags,
    onChange,
    searchPlaceholder = 'Buscar tag...',
    noResultsMsg = 'Nenhuma tag encontrada',
    selectItemMsg = 'Selecione uma tag',
    className,
    disabled = false,
}: MultiTagSelectorProps) => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    // Filter tags based on inputValue
    const filteredTags = useMemo(() => {
        return tags.filter(tag =>
            tag.name.toLowerCase().includes(inputValue.toLowerCase())
        );
    }, [inputValue, tags]);

    // Update selectedTags if any tag has been updated or deleted
    useEffect(() => {
        const updatedSelectedTags = selectedTags
            .map(selectedTag => tags.find(tag => tag.id === selectedTag.id))
            .filter((tag): tag is Tag => tag !== undefined);

        // Check if there are differences between selectedTags and updatedSelectedTags
        const isDifferent =
            selectedTags.length !== updatedSelectedTags.length ||
            selectedTags.some(
                (selectedTag, index) =>
                    selectedTag.id !== updatedSelectedTags[index].id ||
                    selectedTag.name !== updatedSelectedTags[index].name
            );

        if (isDifferent) {
            onChange(updatedSelectedTags);
        }
    }, [tags]);

    const handleSelect = (tag: Tag) => {
        const isAlreadySelected = selectedTags.some(t => t.id === tag.id);
        let newSelectedTags: Tag[];
        if (isAlreadySelected) {
            newSelectedTags = selectedTags.filter(t => t.id !== tag.id);
        } else {
            newSelectedTags = [...selectedTags, tag];
        }
        onChange(newSelectedTags);
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
                        {selectedTags.length > 0 ? (
                            selectedTags.map(tag => (
                                <span
                                    key={tag.id}
                                    className="flex items-center gap-1 px-2 bg-green-300 rounded-md text-sm"
                                >
                                    {tag.name}
                                    <span
                                        role="button"
                                        tabIndex={0}
                                        className="ml-1 text-base text-gray-600 hover:text-gray-800 cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSelect(tag);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                handleSelect(tag);
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
                            {filteredTags.map(tag => (
                                <CommandItem
                                    key={tag.id}
                                    onSelect={() => handleSelect(tag)}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            selectedTags.some(t => t.id === tag.id)
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        )}
                                    />
                                    {tag.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
