interface DashboardLayourProps {
    children?: React.ReactNode;
}

export default async function DashboardLayout({
    children,
}: DashboardLayourProps) {

    return (
        <div className="text-stone-950 bg-stone-100 h-screen flex flex-col">
            {children}
        </div>
    )
}