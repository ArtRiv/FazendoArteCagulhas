import { DefaultPageLayout } from "@/components/default-page-layout";
import { UpdateProductForm } from "./updateProduct";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { AddProductReviewForm } from "./addProductReviewForm";
import { AddProductForm } from "./addProductForm";

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
