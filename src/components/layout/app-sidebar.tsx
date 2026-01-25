"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  LayoutDashboard,
  BarChart3,
  BookOpen,
  MessageSquare,
  Settings,
  LogOut,
  ListChecks,
} from "lucide-react";
import { user } from "@/lib/data";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "../theme-toggle";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/applications", icon: ListChecks, label: "Postulaciones" },
  { href: "/dashboard/statistics", icon: BarChart3, label: "Estadísticas" },
  { href: "/dashboard/resources", icon: BookOpen, label: "Recursos" },
  { href: "/dashboard/analyzer", icon: MessageSquare, label: "AI Feedback" },
  { href: "/dashboard/settings", icon: Settings, label: "Configuración" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="icon"
      className="border-r"
      style={
        {
          '--sidebar-width': '280px',
          '--sidebar-width-icon': '56px',
        } as React.CSSProperties
      }
    >
      <SidebarHeader className="p-0">
        <div className="flex h-20 items-center justify-start border-b border-sidebar-border px-4 w-full">
            <Link href="/dashboard" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary flex-shrink-0">
                    <Briefcase className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold font-headline group-data-[collapsible=icon]:hidden">JobTracker</span>
            </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href) && (item.href !== '/dashboard' || pathname === '/dashboard');
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={isActive} tooltip={{ children: item.label, side: 'right' }}>
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-0 mt-auto">
        <div className="border-t border-sidebar-border p-2">
            <div className="group-data-[collapsible=icon]:hidden flex justify-between items-center px-2">
                <span className="text-sm font-medium text-sidebar-foreground/70">Tema</span>
                <ThemeToggle />
            </div>
            <div className="hidden group-data-[collapsible=icon]:flex justify-center">
                <ThemeToggle />
            </div>
        </div>
        <div className="border-t border-sidebar-border p-4 group-data-[collapsible=icon]:hidden">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={user.avatar.startsWith('http') ? user.avatar : ''} alt={`${user.firstName} ${user.lastName}`} />
                <AvatarFallback>{user.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">{`${user.firstName} ${user.lastName}`}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <Link href="/" title="Cerrar Sesión">
                <Button variant="ghost" size="icon">
                  <LogOut className="h-5 w-5" />
                </Button>
              </Link>
            </div>
        </div>
        <div className="hidden group-data-[collapsible=icon]:block border-t border-sidebar-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={{children: 'Cerrar Sesión', side: 'right'}}>
                <Link href="/">
                  <LogOut />
                  <span className="sr-only">Cerrar Sesión</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
