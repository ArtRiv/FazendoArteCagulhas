import { getCategories } from "@/services/categories"
import { Categories } from "@/types/categories"
import { DropdownVariants } from "@/types/component-variants/dropdown-variants";
import { useCallback, useEffect, useState } from "react"
import { FiChevronDown } from "react-icons/fi";
import { StaggeredDropDown, OptionWithLink } from "../../../ui/dropdown";

export const CategoriesList = () => {
    const [categories, setCategories] = useState<Categories[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            const response = await getCategories();
            setCategories(response);
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="inline-flex justify-self-end p-3">
            {(categories && !isLoading) && (
                <StaggeredDropDown variant={DropdownVariants.LINK} text="Produtos">
                    {categories?.map(category => {
                        return (
                            <OptionWithLink key={category.id} text={category.name.toLowerCase()} navigateLink={`/products?category_id=${category.id}`} />
                        )
                    })}
                </StaggeredDropDown>
            )}
            {isLoading && (
                <div className="flex gap-2">
                    <span className="relative font-harmonia text-normal text-font-color leading-line-height-small tracking-letter-space-small select-none underline [text-decoration-color:transparent] hover:transition-all animateBorderBottom changeTextColor">
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