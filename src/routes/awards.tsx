import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Reveal, SectionHeading } from "@/components/Shared";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { Trophy, Loader2 } from "lucide-react";
import { format } from "date-fns";
import g5 from "@/assets/1000300457.jpg";

export const Route = createFileRoute("/awards")({
  component: AwardsPage,
});

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

function AwardsPage() {
  const [dynamicAwards, setDynamicAwards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const stats = [
    { value: 12, suffix: "+", label: "Best Club Awards" },
    { value: 50, suffix: "+", label: "Individual Citations" },
    { value: 25, suffix: "+", label: "District Awards" },
    { value: 100, suffix: "+", label: "Awardees Recognized" },
  ];

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const response = await fetch("/api/admin/events?category=Awards&limit=10");
        if (response.ok) {
          const data = await response.json();
          setDynamicAwards(data.events);
        }
      } catch (err) {
        console.error("Failed to fetch awards");
      } finally {
        setLoading(false);
      }
    };
    fetchAwards();
  }, []);

  return (
    <div className="pb-24">
      <PageHero
        title="Awards & Recognition"
        subtitle="Celebrating the achievements and contributions of our club and its members."
        image={g5}
      />

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Recognition"
            title={
              <>
                Celebrating our <span className="text-gradient-gold">Awardees</span>
              </>
            }
            description="Our club has been recognized consistently for its excellence in service and leadership within District 3212."
          />

          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.08 * i}>
                <div className="rounded-2xl bg-card border border-border p-8 text-center hover:bg-accent/5 hover:border-gold/40 transition-all">
                  <p className="font-display text-5xl sm:text-6xl font-bold text-gradient-gold">
                    <Counter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-sm uppercase tracking-widest text-muted-foreground font-medium">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {loading ? (
            <div className="mt-12 flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : dynamicAwards.length > 0 && (
            <div className="mt-20 grid md:grid-cols-2 gap-8">
              {dynamicAwards.map((award, i) => (
                <Reveal key={award._id} delay={0.1 * i}>
                  <div className="flex gap-6 p-6 rounded-2xl bg-white border border-border shadow-soft group hover:shadow-elegant transition-all">
                    <div className="h-16 w-16 shrink-0 rounded-xl bg-gold/10 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                      <Trophy size={32} />
                    </div>
                    <div>
                      <h4 className="font-display text-xl font-bold">{award.title}</h4>
                      <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-2">
                        {format(new Date(award.date), "MMMM yyyy")}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{award.description}</p>
                      {award.images?.length > 0 && (
                        <div className="mt-4 flex gap-2">
                          {award.images.slice(0, 3).map((img: string, idx: number) => (
                            <img key={idx} src={img} className="h-12 w-12 rounded-lg object-cover border" alt="Award" />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-24 bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <h3 className="font-display text-3xl font-bold text-foreground">A Tradition of Excellence</h3>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Every year, our members strive to reach new heights in humanitarian service. 
                From literacy projects to health initiatives, our work has earned the respect 
                of fellow Rotarians and the community at large.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
