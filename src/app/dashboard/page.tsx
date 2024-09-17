"use client"
import { useState } from "react";
import { Dashboard } from "./components/dashboard/dashboard";
import { Sidebar } from "./components/sidebar/sidebar";

export default function DashboardPage() {
  const [selectedRoute, setSelectedRoute] = useState("Analytics");
  return (
    <main className="grid gap-4 p-4 grid-cols-[220px,_1fr] relative w-screen h-full">
        <Sidebar selectedRoute={selectedRoute} setSelectedRoute={setSelectedRoute}/>
        <Dashboard selectedRoute={selectedRoute} />
    </main>
  )
}