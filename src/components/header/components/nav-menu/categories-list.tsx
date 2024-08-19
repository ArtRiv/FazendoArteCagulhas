import { StaggeredDropDown, OptionWithLink } from "@/components/ui/dropdown";
import { useGetCategories } from "@/hooks/use-categories";
import { Categories } from "@/types/categories"
import { DropdownVariants } from "@/types/component-variants/dropdown-variants";
import { FiChevronDown } from "react-icons/fi";

export const CategoriesList = () => {
    const { data: categories, isLoading, error } = useGetCategories();

    return (
        <div className="inline-flex justify-self-end md:p-3">
            {(categories && !isLoading) && (
                <StaggeredDropDown variant={DropdownVariants.LINK} text="Produtos">
                    {categories.data?.map((category: Categories) => {
                        return (
                            <OptionWithLink key={category.id} text={category.name.toLowerCase()} navigateLink={`/products?category_id=${category.id}`} />
                        )
                    })}
                </StaggeredDropDown>
            )}
            {isLoading && (
                <div className="flex gap-2">
                    <span className="relative text-xl md:text-base text-font-color leading-line-height-small tracking-letter-space-small font-harmonia select-none underline [text-decoration-color:transparent] hover:transition-all animateBorderBottom changeTextColor">
                        Produtos
                    </span>
                    <FiChevronDown />
                </div>
            )}
            {error && (
                <div>
                    Erro
                </div>
            )}
        </div>
    )
}