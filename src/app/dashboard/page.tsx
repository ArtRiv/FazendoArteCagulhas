import { Dashboard } from "./components/dashboard/dashboard";
import { Sidebar } from "./components/sidebar/sidebar";

export default async function DashboardPage() {

  return (
    <main className="grid gap-4 p-4 grid-cols-[220px,_1fr]">
        <Sidebar />
        <Dashboard />
    </main>
  )
}