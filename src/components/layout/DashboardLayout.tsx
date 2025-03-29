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
    {
      name: "Accueil",
      href: "/home",
      icon: LayoutDashboard,
      description: "Tableau de bord principal",
    },
    {
      name: "Notes",
      href: "/note",
      icon: Ticket,
      description: "Gérer vos notes de cours",
    },
    {
      name: "Classes",
      href: "/classe",
      icon: Users,
      description: "Gérer les classes et parcours",
    },
    {
      name: "Réclamations",
      href: "/reclamation",
      icon: BarChart2,
      description: "Suivi des réclamations",
    },
  ];

  return (
    <div className="h-full bg-gray-100 dark:bg-gray-950">
      <Sidebar
        navigation={navigation}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div className="lg:pl-64 transition-all duration-300 w-full">
        <Header toggleSidebar={() => setSidebarOpen(true)} user={user} />

        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1380px] mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
