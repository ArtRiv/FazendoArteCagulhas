import { Sidebar } from "./components/sidebar/sidebar";

interface DashboardLayourProps {
    children?: React.ReactNode;
}

export default async function DashboardLayout({
    children,
}: DashboardLayourProps) {

    return (
        <div className="text-stone-950 bg-stone-100 py-2 h-screen flex flex-col">
            <main className="grid gap-4 grid-cols-[220px,_1fr] relative w-screen h-full">
                <Sidebar />
                {children}
            </main>
        </div>
    )
}