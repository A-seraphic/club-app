import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Home, Search, Plus, Users, User, Bell, Settings, Store, LayoutDashboard, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useApp } from "@/lib/AppContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Brand } from "@/components/club/Brand";
import { UserAvatar } from "@/components/club/ui";

import DesktopWidgets from "@/components/club/DesktopWidgets";
import { currentUser } from "@/data/mockData";

const navItems = [
  { to: "/", label: "Inicio", icon: Home },
  { to: "/search", label: "Buscar", icon: Search },
  { to: "/post", label: "Publicar", icon: Plus, center: true },
  { to: "/community", label: "Comunidad", icon: Users },
  { to: "/profile", label: "Perfil", icon: User },
];

const sidebarItems = (isBusiness) => [
  { to: "/", label: "Inicio", icon: Home },
  { to: "/search", label: "Buscar", icon: Search },
  { to: "/community", label: "Comunidad", icon: Users },
  { to: "/map", label: "Ofertas cerca", icon: MapPin },
  ...(isBusiness
    ? [
        { to: "/business-panel", label: "Panel de empresa", icon: LayoutDashboard },
        { to: "/create-offer", label: "Crear oferta", icon: Plus },
      ]
    : [{ to: "/post", label: "Publicar", icon: Plus }]),
  { to: "/notifications", label: "Notificaciones", icon: Bell },
  { to: "/profile", label: "Perfil", icon: User },
  { to: "/settings", label: "Configuración", icon: Settings },
];

export default function Layout() {
  const location = useLocation();
  const { userType } = useApp();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isBusiness = userType === "business";

  if (isDesktop) {
    const items = sidebarItems(isBusiness);
    return (
      <div className="min-h-screen bg-background flex">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 border-r border-border h-screen sticky top-0 flex flex-col px-3 py-5">
          <div className="px-2 mb-6"><Brand size="md" glow logo /></div>
          <nav className="flex-1 space-y-1">
            {items.map((it) => {
              const active = location.pathname === it.to;
              return (
                <NavLink key={it.to} to={it.to} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors relative ${active ? "bg-surface-hover text-title font-medium" : "text-muted-foreground hover:bg-surface-hover hover:text-title"}`}>
                  {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-full bg-mint" />}
                  <it.icon size={18} className={active ? "text-mint" : ""} /> {it.label}
                </NavLink>
              );
            })}
          </nav>
          <button onClick={() => (isBusiness ? window.location.href = "/business-panel" : window.location.href = "/profile")} className="flex items-center gap-3 px-2 py-3 rounded-xl border border-border bg-surface-hover mt-2">
            <UserAvatar src={currentUser.avatar} size={36} />
            <div className="text-left min-w-0">
              <p className="text-sm font-semibold text-title truncate">{currentUser.name}</p>
              <p className="text-[11px] text-muted-foreground">{isBusiness ? "Cuenta empresa" : "Cuenta personal"}</p>
            </div>
          </button>
        </aside>

        {/* Center + right */}
        <div className="flex-1 flex justify-center">
          <main className="w-full max-w-[640px] border-x border-border min-h-screen">
            <Outlet />
          </main>
          <DesktopWidgets />
        </div>

      </div>
    );
  }

  // Mobile / tablet
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-[480px] mx-auto min-h-screen relative pb-24">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[480px] z-40">
        <div className="glass border-t border-border">
          <div className="flex items-center justify-around h-16 px-2">
            {navItems.map((item) => {
              const active = location.pathname === item.to;
              if (item.center) {
                return (
                  <NavLink key={item.to} to={item.to} className="flex items-center justify-center">
                    <motion.div whileTap={{ scale: 0.9 }} className="w-12 h-12 -mt-6 rounded-full gradient-amethyst glow-amethyst grid place-items-center">
                      <item.icon size={24} className="text-white" />
                    </motion.div>
                  </NavLink>
                );
              }
              return (
                <NavLink key={item.to} to={item.to} className="flex flex-col items-center gap-0.5 w-14">
                  <motion.div whileTap={{ scale: 0.85 }} className="relative">
                    <item.icon size={22} className={active ? "text-[hsl(var(--amethyst))]" : "text-muted-foreground"} strokeWidth={active ? 2.4 : 2} />
                    {active && <motion.span layoutId="nav-dot" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[hsl(var(--amethyst))]" />}
                  </motion.div>
                  <span className={`text-[10px] ${active ? "text-title font-medium" : "text-muted-foreground"}`}>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}