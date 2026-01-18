"use client"; // Esto indica que este componente tiene interacción (clicks)

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut 
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname(); // Para saber en qué página estamos y resaltarla
  const router = useRouter();

  // Definimos los items del menú en un array para no repetir código
  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Mis Postulaciones", href: "/jobs", icon: Briefcase },
    { name: "Entrevistas", href: "/interviews", icon: FileText }, // Placeholder
    { name: "Estadísticas", href: "/stats", icon: BarChart3 },    // Placeholder
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col justify-between z-50 transition-all  md:flex">
      {/* Logo Area */}
      <div>
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">
            JT
          </div>
          <span className="text-xl font-bold text-gray-800 tracking-tight">
            JobTracker
          </span>
        </div>

        {/* Navigation */}
        <nav className="px-4 mt-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? "bg-blue-50 text-primary font-medium" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon size={20} className={isActive ? "text-primary" : "text-gray-400 group-hover:text-gray-600"} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / User Settings */}
      <div className="p-4 border-t border-gray-100">
        <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors">
          <LogOut size={20} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}