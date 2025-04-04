import { Link, useLocation } from "react-router-dom";
import { Logo } from "../ui/Logo";
// import { X, LayoutDashboard, Users, BarChart2, Ticket } from "lucide-react";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";
import { ComponentType } from "react";

// const navigation = [
//   { name: "Acceuil", href: "/dashboard", icon: LayoutDashboard },
//   { name: "Notes", href: "/dashboard/tickets", icon: Ticket },
//   { name: "classe", href: "/dashboard/agents", icon: Users },
//   { name: "Reclamation ", href: "/dashboard/reports", icon: BarChart2 },
// ];
interface NavigationItem {
  name: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  navigation: NavigationItem[];
}

export function Sidebar({ isOpen, setIsOpen, navigation }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-gray-900/80 lg:hidden",
          isOpen ? "block" : "hidden"
        )}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={cn(
          "fixed inset-y-0 top-2 left-3 z-50 w-64 h-[95vh]  shadow-full rounded-lg bg-white transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <Logo />
          <button className="lg:hidden" onClick={() => setIsOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md my-1",
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
