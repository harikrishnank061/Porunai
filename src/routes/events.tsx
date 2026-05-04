import { createFileRoute } from '@tanstack/react-router'
import React, { useEffect, useState, useRef } from "react";
import { PageHero, Reveal, SectionHeading } from "@/components/Shared";
import { Calendar, MapPin, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import g1 from "@/assets/1000300451.jpg";
import g2 from "@/assets/1000300455.jpg";
import g4 from "@/assets/1000300454.jpg";

export const Route = createFileRoute("/events")({
  component: EventsPage,
});

function EventsPage() {
  const [dynamicEvents, setDynamicEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const staticEvents = [
    {
      title: "Women Leadership Summit 2026",
      date: "12 May 2026",
      location: "Tirunelveli Convention Hall",
      desc: "A full-day summit featuring inspiring women leaders, panel discussions and networking.",
      tag: "Featured",
      img: g4,
    },
    {
      title: "Free Health Camp for Rural Women",
      date: "28 May 2026",
      location: "Palayamkottai Village Center",
      desc: "Comprehensive health screenings, gynaecological care and wellness counselling.",
      tag: "Health",
      img: g2,
    },
    {
      title: "Skill & Tailoring Workshop",
      date: "10 June 2026",
      location: "Porunai Community Center",
      desc: "Six-week certified program to help women launch home-based tailoring businesses.",
      tag: "Education",
      img: g1,
    },
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/admin/events?category=Upcoming events&limit=10");
        if (response.ok) {
          const data = await response.json();
          const mapped = data.events.map((e: any) => ({
            title: e.title,
            date: format(new Date(e.date), "dd MMM yyyy"),
            location: e.location || "Announced soon",
            desc: e.description,
            tag: "Dynamic",
            img: e.images?.[0] || g4,
          }));
          setDynamicEvents(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const allEvents = [...dynamicEvents, ...staticEvents].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <div className="pb-24">
      <PageHero
        title="Upcoming Events"
        subtitle="Be a part of meaningful work happening in and around Tirunelveli."
        image={g2}
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Calendar"
            title={
              <>
                What's <span className="text-gradient-gold">happening next</span>
              </>
            }
            description="Join us at our next gathering and contribute to our community initiatives."
          />

          {loading && dynamicEvents.length === 0 ? (
            <div className="mt-12 flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allEvents.map((e, i) => (
                <Reveal key={i} delay={0.08 * (i % 3)}>
                  <article className="group h-full rounded-2xl overflow-hidden bg-card border border-border hover:shadow-elegant transition-all hover:-translate-y-2">
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img
                        src={e.img}
                        alt={e.title}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      <span className="absolute top-4 left-4 rounded-full bg-gradient-to-r from-gold to-gold-deep text-[oklch(0.18_0.06_265)] text-xs font-bold px-3 py-1 shadow-gold">
                        {e.tag}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-3">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-primary" /> {e.date}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-primary" /> {e.location}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {e.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">{e.desc}</p>
                      <Button
                        variant="ghost"
                        className="mt-4 -ml-3 text-primary hover:text-primary hover:bg-primary/5"
                      >
                        Learn More <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
