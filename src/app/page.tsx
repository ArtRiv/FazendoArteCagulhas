import { DefaultPageLayout } from "@/components/default-page-layout";
import { getProductById, getSimilarProducts } from "@/hooks/useProducts";
import { Product } from "@/types/product";
import { getSimilarProductsParams } from "@/types/productParams";

export default async function Home() {
  const productData = await getProductById("Oi53nwcL6nkVKDgLnwcD");
  let similarProducts;
  if (productData) {
    const params: getSimilarProductsParams = {
      productGroup: productData?.product_group,
      currentProduct: productData as Product,
    };
    similarProducts = await getSimilarProducts(params);
  }

  return (
    <DefaultPageLayout>
      <div> home </div>
      <div className="w-full flex justify-center gap-10 overflow-hidden">
      </div>
    </DefaultPageLayout>
  );
}

