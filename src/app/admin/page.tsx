import { DefaultPageLayout } from "@/components/default-page-layout";
import { AddProduct } from "./addProduct";
import { UpdateProductForm } from "./updateProduct";

export default function Admin() {

  return (
    <DefaultPageLayout>
      <AddProduct/>
      <UpdateProductForm/>
    </DefaultPageLayout>
  );
}
