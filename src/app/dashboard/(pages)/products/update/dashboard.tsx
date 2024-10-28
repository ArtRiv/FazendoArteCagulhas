import { Product } from "@/types/product"
import { ProductForm } from "../create/form"
import { Category } from "@/types/categories";
import { ProductGroup } from "@/types/product-group";
import { Tag } from "@/types/tags";

interface ProductData {
  product: Product;
  tags: Tag[];
  categories: Category[];
  productGroup: ProductGroup;
}

export const UpdatePageDashboard = ({ productData }: { productData: ProductData }) => {
    return (
        <main className="grid flex-1 items-start gap-4 p-4 w-full sm:px-6 sm:py-0 md:gap-8">
            <ProductForm 
                productData={productData}
                mode="update"
            />
        </main>
    );
};
