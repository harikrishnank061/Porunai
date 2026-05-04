import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Image as ImageIcon, Users, TrendingUp, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [stats, setStats] = useState({
    events: 0,
    history: 0,
    gallery: 0,
    initiatives: 0,
    awards: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/events?limit=1000");
        if (response.ok) {
          const data = await response.json();
          const events = data.events;
          setStats({
            events: events.filter((e: any) => e.category === "Upcoming events").length,
            history: events.filter((e: any) => e.category === "Past Events" || e.category === "Leaders").length,
            gallery: events.filter((e: any) => e.category === "Gallery").length,
            initiatives: events.filter((e: any) => e.category === "Initiatives").length,
            awards: events.filter((e: any) => e.category === "Awards").length,
          });
        }
      } catch (err) {
        console.error("Failed to fetch stats");
      }
    };
    fetchStats();
  }, []);

  const sections = [
    { name: "Upcoming Events", count: stats.events, href: "/admin/events", search: { category: "Upcoming events" }, icon: Calendar, color: "text-blue-500", bg: "bg-blue-500/10" },
    { name: "Past Events", count: stats.history, href: "/admin/events", search: { category: "Past Events" }, icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { name: "Gallery Images", count: stats.gallery, href: "/admin/events", search: { category: "Gallery" }, icon: ImageIcon, color: "text-amber-500", bg: "bg-amber-500/10" },
    { name: "Initiatives", count: stats.initiatives, href: "/admin/events", search: { category: "Initiatives" }, icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
    { name: "Awards & Honors", count: stats.awards, href: "/admin/events", search: { category: "Awards" }, icon: Plus, color: "text-rose-500", bg: "bg-rose-500/10" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gradient-primary">Admin Dashboard</h1>
          <p className="text-muted-foreground text-lg">Quick overview of your club's digital presence.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section, i) => (
          <motion.div
            key={section.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link to={section.href} search={section.search}>
              <Card className="border-none shadow-soft overflow-hidden group hover:shadow-elegant transition-all cursor-pointer bg-card/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{section.name}</CardTitle>
                  <div className={`p-3 rounded-2xl ${section.bg} ${section.color} group-hover:scale-110 transition-transform`}>
                    <section.icon size={22} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-black">{section.count}</div>
                  <p className="text-xs text-muted-foreground mt-1">Total items in this section</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-none shadow-soft bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-border/50">
              <span className="text-sm font-medium">Database (MongoDB)</span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">CONNECTED</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-border/50">
              <span className="text-sm font-medium">Image Hosting (Cloudinary)</span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">ACTIVE</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-soft bg-gradient-to-br from-gold/5 to-transparent">
          <CardHeader>
            <CardTitle>Quick Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">• Images are automatically optimized for web.</p>
            <p className="text-sm text-muted-foreground">• Categories determine where content appears on the site.</p>
            <p className="text-sm text-muted-foreground">• You can upload up to 15 images per entry.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
