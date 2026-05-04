import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Reveal, SectionHeading } from "@/components/Shared";
import { 
  Sparkles, 
  GraduationCap, 
  Stethoscope, 
  Sprout, 
  Users, 
  Heart,
  ArrowRight,
  Loader2, 
  HelpCircle
} from "lucide-react";
import g3 from "@/assets/1000300458.jpg";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/initiatives")({
  component: InitiativesPage,
});

function InitiativesPage() {
  const [dynamicItems, setDynamicItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const staticItems = [
    {
      icon: Sparkles,
      title: "Women Empowerment",
      desc: "Mentorship circles, financial literacy workshops and entrepreneurship support for women across Tirunelveli.",
    },
    {
      icon: GraduationCap,
      title: "Education & Skills",
      desc: "Scholarships, digital literacy and skill development for girls and underprivileged youth.",
    },
    {
      icon: Stethoscope,
      title: "Health & Wellness",
      desc: "Free medical camps, maternal-care drives and mental wellness programs for rural communities.",
    },
    {
      icon: Sprout,
      title: "Community Service",
      desc: "Tree plantation, water conservation and clean-village initiatives that strengthen our region.",
    },
    {
      icon: Users,
      title: "Youth & Leadership",
      desc: "Interact and Rotaract collaborations nurturing the next generation of compassionate leaders.",
    },
    {
      icon: Heart,
      title: "Service Projects",
      desc: "Targeted humanitarian projects supporting widows, single mothers and senior citizens.",
    },
  ];

  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        const response = await fetch("/api/admin/events?category=Initiatives&limit=10");
        if (response.ok) {
          const data = await response.json();
          const mapped = data.events.map((e: any) => ({
            icon: HelpCircle,
            title: e.title,
            desc: e.description,
          }));
          setDynamicItems(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch initiatives");
      } finally {
        setLoading(false);
      }
    };
    fetchInitiatives();
  }, []);

  const allItems = [...dynamicItems, ...staticItems];

  return (
    <div className="pb-24">
      <PageHero
        title="Our Initiatives"
        subtitle="Programs designed to create real impact and transform lives."
        image={g3}
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Initiatives"
            title={
              <>
                Past events & <span className="text-gradient-gold">services rendered</span>
              </>
            }
            description="From education to enterprise, our initiatives are built to uplift, equip and inspire."
          />

          {loading && dynamicItems.length === 0 ? (
            <div className="mt-12 flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allItems.map((item, i) => (
                <Reveal key={i} delay={0.05 * (i % 3)}>
                  <div className="group relative h-full rounded-2xl bg-card border border-border p-7 hover:border-primary transition-all duration-300 hover:-translate-y-2 hover:shadow-elegant overflow-hidden">
                    <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br from-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-2xl" />
                    <div className="relative">
                      <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-[oklch(0.5_0.18_295)] flex items-center justify-center shadow-soft mb-5 group-hover:rotate-6 transition-transform">
                        <item.icon className="h-6 w-6 text-gold" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground">{item.title}</h3>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        Learn more <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
