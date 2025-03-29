import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { LayoutDashboard, Ticket, Users, BarChart2 } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  const navigation = [
    { name: "Acceuil", href: "/home", icon: LayoutDashboard },
    { name: "Notes", href: "/note", icon: Ticket },
    { name: "classe", href: "/classe", icon: Users },
    { name: "Reclamation ", href: "/reclamation", icon: BarChart2 },
  ];
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar
        navigation={navigation}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div className="lg:pl-64">
        <Header toggleSidebar={() => setSidebarOpen(true)} user={user} />

        <main className="py-8">
          <div className=" ">{children}</div>
        </main>
      </div>
    </div>
  );
}
