import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHero, Reveal, SectionHeading } from "@/components/Shared";
import { Award, Heart, Users, Quote, Loader2 } from "lucide-react";
import { format } from "date-fns";
import g4 from "@/assets/1000300454.jpg";
import eventImg1 from "@/assets/WhatsApp Image 2026-04-27 at 11.56.01 AM.jpeg";
import eventImg2 from "@/assets/WhatsApp Image 2026-04-27 at 11.56.00 AM.jpeg";
import eventImg3 from "@/assets/WhatsApp Image 2026-04-27 at 11.56.00 AM (4).jpeg";
import eventImg4 from "@/assets/WhatsApp Image 2026-04-27 at 11.56.00 AM (3).jpeg";
import eventImg5 from "@/assets/WhatsApp Image 2026-04-27 at 11.56.00 AM (1).jpeg";
import eventImg6 from "@/assets/WhatsApp Image 2026-04-27 at 11.55.59 AM.jpeg";
import eventImg7 from "@/assets/WhatsApp Image 2026-04-27 at 11.55.59 AM (3).jpeg";
import eventImg8 from "@/assets/WhatsApp Image 2026-04-27 at 11.55.59 AM (2).jpeg";
import eventImg9 from "@/assets/WhatsApp Image 2026-04-27 at 11.55.58 AM (3).jpeg";
import eventImg10 from "@/assets/WhatsApp Image 2026-04-27 at 11.55.58 AM (2).jpeg";
import eventImg11 from "@/assets/WhatsApp Image 2026-04-27 at 11.55.58 AM (1).jpeg";

export const Route = createFileRoute("/history")({
  component: HistoryPage,
});

function HistoryPage() {
  const [dynamicImpact, setDynamicImpact] = useState<any[]>([]);
  const [dynamicLeaders, setDynamicLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const pillars = [
    {
      icon: Award,
      title: "Legacy",
      desc: "Honoring the leaders who built our foundation.",
    },
    {
      icon: Users,
      title: "Presidents",
      desc: "Celebrating our past presidents and their vision.",
    },
    {
      icon: Heart,
      title: "Service",
      desc: "Continuing the tradition of service excellence.",
    },
  ];

  const historyData = [
    {
      year: "2021 – 2022",
      riTheme: "Shekhar Mehta",
      themeDesc: "Focused on empowering girls, increasing membership to 1.3 million, and hands-on service through the 'Each One, Bring One' initiative.",
      president: "Rtn. Swarnalatha Arunachalam",
      secretary: "Rtn. Amutha Rajendran",
      treasurer: "Rtn. Gomathi Mariappan",
      governor: "Rtn. Murugadoss",
      isCharter: true,
    },
    {
      year: "2022 – 2023",
      riTheme: "Jennifer Jones",
      themeDesc: "The first female president, she prioritized the 'Imagine Impact Tour' to highlight scalable, sustainable projects, particularly focusing on polio eradication and environmental action.",
      president: "Rtn. Swarnalatha Arunachalam",
      secretary: "Rtn. Bavithera Gopinath",
      treasurer: "Rtn. Gomathi Mariappan",
      governor: "Rtn. Jesindha Dharma",
    },
    {
      year: "2023 – 2024",
      riTheme: "Gordon McInally",
      themeDesc: "Focused on mental health initiatives, promoting peace in troubled nations, and maintaining the momentum of empowering women and girls.",
      president: "Rtn. Gomathy Mariappan",
      secretary: "Rtn. Bavithera Gopinath",
      treasurer: "Rtn. Amutha Rajendran",
      governor: "Rtn. Muthaiya Pillai",
    },
    {
      year: "2024 – 2025",
      riTheme: "Stephanie Urchick",
      themeDesc: "Focused on implementing the Action Plan, promoting peace through a special peace conference in Istanbul, and expanding the 'Magic' of Rotary through hands-on service.",
      president: "Rtn. Karpagam Guhan",
      secretary: "Rtn. Nagammal Pitchumani",
      treasurer: "Rtn. Amutha Rajendran",
      governor: "Rtn. Meerankhan Salim",
    },
    {
      year: "2025 – 2026",
      riTheme: "Francesco Arezzo",
      themeDesc: "Emphasized membership growth, 'Unite for Good,' and fostering collaboration between Rotarians and Rotaractors.",
      president: "Rtn. Sumathy Gandhi",
      secretary: "Rtn. Bavithera Gopinath",
      treasurer: "Rtn. Amutha Rajendran",
      governor: "Rtn. Dhinesh Babu",
    },
    {
      year: "2026 – 2027",
      riTheme: "Future of Service",
      themeDesc: "Continuing the legacy of compassion and grace, focused on community empowerment and sustainable impact for the next generation.",
      president: "Rtn. Amutha Rajendran",
      secretary: "Rtn. Bhagavathi Priya",
      treasurer: "Rtn. Bavithera Gopinath",
      governor: "Rtn. Gandhi",
    },
  ];

  const staticImpact = [
    { img: eventImg1, alt: "Community Service", caption: "Empowering the community through dedicated outreach and care." },
    { img: eventImg2, alt: "Support Initiative", caption: "Uniting hands and hearts to bring joy and support to those in need." },
    { img: eventImg3, alt: "Milestone Celebration", caption: "Celebrating milestones of service that leave a lasting impact." },
    { img: eventImg4, alt: "District Collaboration", caption: "Fostering collaboration and growth within our vibrant district." },
    { img: eventImg5, alt: "Vision to Action", caption: "Transforming vision into action with every project we undertake." },
    { img: eventImg6, alt: "Honoring Dedication", caption: "Honoring dedication and unwavering commitment to Rotary's ideals." },
    { img: eventImg7, alt: "Building Futures", caption: "Building stronger futures through educational and health initiatives." },
    { img: eventImg8, alt: "Spreading Hope", caption: "Spreading hope and resilience across the Porunai region." },
    { img: eventImg9, alt: "Inspiring Leaders", caption: "Inspiring the next generation of leaders with compassion and grace." },
    { img: eventImg10, alt: "Fellowship and Service", caption: "Strengthening bonds of fellowship while serving humanity." },
    { img: eventImg11, alt: "Tangible Difference", caption: "Making a tangible difference, one service project at a time." },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const impactRes = await fetch("/api/admin/events?category=Past Events&limit=20");
        if (impactRes.ok) {
          const data = await impactRes.json();
          const mapped = data.events.map((e: any) => ({
            img: e.images?.[0] || eventImg1,
            alt: e.title,
            caption: e.description,
          }));
          setDynamicImpact(mapped);
        }

        const leadersRes = await fetch("/api/admin/events?category=Leaders&limit=50");
        if (leadersRes.ok) {
          const data = await leadersRes.json();
          const mapped = data.events.map((e: any) => ({
            year: e.title,
            riTheme: e.riTheme || "Theme Year",
            themeDesc: e.description,
            president: e.president || "Club Leader",
            secretary: e.secretary || "Club Secretary",
            treasurer: e.treasurer || "Club Treasurer",
            governor: e.governor || "District Governor",
          }));
          setDynamicLeaders(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch history data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const allImpact = [...dynamicImpact, ...staticImpact];
  const allLeaders = [...dynamicLeaders, ...historyData];

  return (
    <div className="pb-24">
      <PageHero
        title="Club History"
        subtitle="A legacy of service and leadership that continues to inspire."
        image={g4}
      />

      <section className="py-24 bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Journey"
            title={
              <>
                The Story of <span className="text-gradient-gold">Tirunelveli Porunai</span>
              </>
            }
            description="Rotary Club of Tirunelveli Porunai started its journey on May 11, 2021. Since then, it has been a vibrant chapter of Rotary International, founded on the belief that empowered women build empowered communities."
          />

          <div className="mt-12 grid lg:grid-cols-2 gap-10 items-center">
            <Reveal>
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-elegant">
                  <img
                    src={g4}
                    alt="Rotary women receiving recognition"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 rounded-2xl bg-card p-6 shadow-gold border border-gold/30 max-w-xs text-center">
                  <p className="text-gold font-display font-bold text-lg">Chartered On</p>
                  <p className="text-2xl font-display font-bold text-foreground">11 / 05 / 2021</p>
                </div>
              </div>
            </Reveal>

            <div className="space-y-8">
              <Reveal delay={0.1}>
                <div className="rounded-2xl bg-card border border-border p-8 shadow-soft">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
                    Core Mission
                  </p>
                  <p className="text-foreground leading-relaxed italic text-lg">
                    "When women lead with purpose, communities flourish. Our journey is one of compassion, resilience, and unwavering service to the Porunai region."
                  </p>
                </div>
              </Reveal>
              
              <div className="grid sm:grid-cols-3 gap-4 pt-2">
                {pillars.map((p, i) => (
                  <Reveal key={p.title} delay={0.1 * i}>
                    <div className="group rounded-2xl bg-card border border-border p-5 hover:border-gold transition-all hover:shadow-gold hover:-translate-y-1">
                      <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary to-[oklch(0.5_0.18_295)] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <p.icon className="h-5 w-5 text-gold" />
                      </div>
                      <h3 className="font-display font-bold text-foreground">{p.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Chronicle of Leadership"
            title={
              <>
                Honoring our <span className="text-gradient-gold">Past & Present Leaders</span>
              </>
            }
            description="A year-by-year record of the dedicated individuals who have guided our club and the global themes that inspired our service."
          />

          <div className="mt-16 space-y-12">
            {[...allLeaders].sort((a, b) => b.year.localeCompare(a.year)).map((data, i) => (
              <Reveal key={data.year} delay={0.1}>
                <div className={`relative flex flex-col lg:flex-row gap-8 items-start p-8 rounded-3xl border border-border bg-card hover:shadow-elegant transition-all ${data.isCharter ? 'ring-2 ring-gold/30' : ''}`}>
                  {data.isCharter && (
                    <div className="absolute -top-4 left-8 px-4 py-1 bg-gold text-white text-xs font-bold rounded-full tracking-widest uppercase">
                      Charter Year
                    </div>
                  )}
                  
                  <div className="lg:w-1/3 space-y-4">
                    <div className="text-4xl font-display font-bold text-primary">{data.year}</div>
                    <div className="p-4 rounded-xl bg-gradient-soft border border-border/50">
                      <p className="text-xs font-bold uppercase tracking-tighter text-muted-foreground mb-1">RI Theme President</p>
                      <p className="font-display font-bold text-foreground">{data.riTheme}</p>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{data.themeDesc}</p>
                    </div>
                  </div>

                  <div className="lg:w-2/3 grid sm:grid-cols-2 gap-6 w-full">
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-bold uppercase text-gold tracking-widest">President</p>
                        <p className="text-lg font-medium text-foreground">{data.president}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase text-gold tracking-widest">Secretary</p>
                        <p className="text-lg font-medium text-foreground">{data.secretary}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-bold uppercase text-gold tracking-widest">Treasurer</p>
                        <p className="text-lg font-medium text-foreground">{data.treasurer}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase text-gold tracking-widest">District Governor</p>
                        <p className="text-lg font-medium text-foreground">{data.governor}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Impact"
            title={
              <>
                Past Events & <span className="text-gradient-gold">Services Rendered</span>
              </>
            }
            description="A glimpse into our compassion in action, transforming lives and uplifting the Porunai community."
          />

          {loading && dynamicImpact.length === 0 ? (
            <div className="mt-12 flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {allImpact.map((item, index) => (
                <Reveal key={index} delay={0.1 * (index % 3 + 1)}>
                  <div className="group rounded-3xl overflow-hidden bg-card border border-border shadow-soft hover:shadow-elegant transition-all hover:-translate-y-2 h-full flex flex-col">
                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={item.img}
                        alt={item.alt}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6 text-center flex-grow flex items-center justify-center">
                      <p className="text-foreground font-medium leading-relaxed italic">
                        "{item.caption}"
                      </p>
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
