import { ProductForm } from "./form"

export const CreatePageDashboard = () => {
    return (
        <main className="grid flex-1 items-start gap-4 p-4 w-full sm:px-6 sm:py-0 md:gap-8">
            <ProductForm mode="create"/>
        </main>
    )
}