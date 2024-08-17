import { DefaultPageLayout } from "@/components/default-page-layout";
import { UpdateProductForm } from "./update-product";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { AddProductReviewForm } from "./add-product-review";
import { AddProductForm } from "./add-product-form";

export default async function Dashboard() {
  const { isAuthenticated, getPermission } = getKindeServerSession();

  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) {
    redirect('/api/auth/login');
  }

  const isAdmin = await getPermission('enter:admin')
  if (!isAdmin?.isGranted) {
    redirect('/');
  }

  return (
    <DefaultPageLayout>
      <div className="flex">
        <AddProductForm />
        <AddProductReviewForm />
      </div>
      <UpdateProductForm />
    </DefaultPageLayout>
  );
}
