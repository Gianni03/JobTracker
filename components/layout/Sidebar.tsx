"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { 
  LayoutDashboard, 
  Briefcase,      // Icono para Postulaciones
  MessageSquare,  // Icono para Feedback/Notas
  BarChart3,      // Icono para Estadísticas
  Settings,       // Icono para Configuración
  LogOut 
} from "lucide-react";
import Swal from 'sweetalert2';

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  // 1. Definimos los elementos exactos que quieres
  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Estadísticas", href: "/stats", icon: BarChart3 },
    { name: "Feedback", href: "/feedback", icon: MessageSquare },
    { name: "Recursos", href: "/jobs", icon: Briefcase },
  ];

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: '¿Cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#f96e46',
    });

    if (result.isConfirmed) {
      await supabase.auth.signOut();
      router.push("/login");
      router.refresh();
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col justify-between z-50">
      <div>
        {/* Logo con tu color #f96e46 */}
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f96e46] flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-orange-100">
              <Briefcase size={20} />
            </div>
            <span className="text-xl font-bold text-gray-800 italic">JobTracker</span>
          </div>
        </div>

        {/* Navegación Principal */}
        <nav className="px-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? "bg-orange-50 text-[#f96e46] font-semibold" 
                    : "text-gray-400 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sección Inferior: Configuración y Logout */}
      <div className="p-4 space-y-2">
        <Link
          href="/settings"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            pathname === "/settings" ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:bg-gray-50"
          }`}
        >
          <Settings size={20} />
          <span>Configuración</span>
        </Link>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-xl transition-colors"
        >
          <LogOut size={20} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}