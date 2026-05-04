import { createFileRoute, Outlet, redirect, Link, useNavigate, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LayoutDashboard, Calendar, Image as ImageIcon, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import AdminLogin from "../components/AdminLogin";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("admin_token");
      setIsLoggedIn(!!token);
      setMounted(true);
    };

    checkLogin();
    
    // Listen for storage changes (for same-page updates)
    const interval = setInterval(checkLogin, 500);
    window.addEventListener('storage', checkLogin);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', checkLogin);
    };
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsLoggedIn(false);
    navigate({ to: "/admin" });
  };

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Leaders (History Part 1)", href: "/admin/events", search: { category: "Leaders" }, icon: Calendar },
    { name: "Past Events (History Part 2)", href: "/admin/events", search: { category: "Past Events" }, icon: Calendar },
    { name: "Upcoming Events", href: "/admin/events", search: { category: "Upcoming events" }, icon: Calendar },
    { name: "Gallery", href: "/admin/events", search: { category: "Gallery" }, icon: ImageIcon },
    { name: "Initiatives", href: "/admin/events", search: { category: "Initiatives" }, icon: LayoutDashboard },
    { name: "Awards", href: "/admin/events", search: { category: "Awards" }, icon: Calendar },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center w-full">
        <AdminLogin />
        <Toaster position="top-center" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-background border-b">
        <Link to="/admin" className="font-display text-xl font-bold text-primary">
          Porunai <span className="text-gold">Admin</span>
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="mb-10 hidden md:block">
            <Link to="/admin" className="font-display text-2xl font-bold text-primary">
              Porunai <span className="text-gold">Admin</span>
            </Link>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              // Simple check for active state
              const isActive = pathname === item.href && 
                (!item.search || (location.search as any).category === item.search.category);

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  search={item.search}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-6 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>

      <Toaster position="top-center" />
    </div>
  );
}
