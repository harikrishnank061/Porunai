import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Reveal, SectionHeading } from "@/components/Shared";
import g1 from "@/assets/1000300451.jpg";
import g2 from "@/assets/1000300455.jpg";
import g3 from "@/assets/1000300458.jpg";
import g4 from "@/assets/1000300454.jpg";
import g5 from "@/assets/1000300457.jpg";
import g6 from "@/assets/1000300461.jpg";
import img1 from "@/assets/WhatsApp Image 2026-04-28 at 1.57.14 PM.jpeg";
import img2 from "@/assets/WhatsApp Image 2026-04-28 at 1.57.18 PM (1).jpeg";
import img3 from "@/assets/WhatsApp Image 2026-04-28 at 1.57.18 PM.jpeg";
import img4 from "@/assets/WhatsApp Image 2026-04-28 at 1.57.19 PM (1).jpeg";
import img5 from "@/assets/WhatsApp Image 2026-04-28 at 1.57.19 PM.jpeg";
import img6 from "@/assets/WhatsApp Image 2026-04-28 at 1.57.20 PM (1).jpeg";
import img7 from "@/assets/WhatsApp Image 2026-04-28 at 1.57.20 PM (2).jpeg";
import img8 from "@/assets/WhatsApp Image 2026-04-28 at 1.57.20 PM.jpeg";
import img9 from "@/assets/WhatsApp Image 2026-04-28 at 1.57.21 PM (1).jpeg";
import img10 from "@/assets/WhatsApp Image 2026-04-28 at 1.57.21 PM (2).jpeg";
import img11 from "@/assets/WhatsApp Image 2026-04-28 at 1.57.21 PM.jpeg";
import img12 from "@/assets/WhatsApp Image 2026-04-28 at 1.57.22 PM.jpeg";
import img13 from "@/assets/WhatsApp Image 2026-04-28 at 1.57.23 PM (1).jpeg";
import img14 from "@/assets/WhatsApp Image 2026-04-28 at 1.57.23 PM (2).jpeg";
import img15 from "@/assets/WhatsApp Image 2026-04-28 at 1.57.23 PM.jpeg";
import img16 from "@/assets/WhatsApp Image 2026-04-28 at 1.57.24 PM (1).jpeg";
import img17 from "@/assets/WhatsApp Image 2026-04-28 at 1.57.24 PM.jpeg";
import img18 from "@/assets/WhatsApp Image 2026-04-28 at 1.57.25 PM (1).jpeg";
import img19 from "@/assets/WhatsApp Image 2026-04-28 at 1.57.26 PM (1).jpeg";
import img20 from "@/assets/WhatsApp Image 2026-04-28 at 1.57.26 PM (2).jpeg";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
});

function GalleryPage() {
  const [dynamicItems, setDynamicItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const staticItems = [
    { src: g1, caption: "Celebrating community achievements" },
    { src: g2, caption: "Volunteers making a lasting impact" },
    { src: g3, caption: "Uniting for a brighter tomorrow" },
    { src: g4, caption: "Moments of shared joy and purpose" },
    { src: g5, caption: "Empowering our local youth" },
    { src: g6, caption: "Building connections that matter" },
    { src: img1, caption: "Transforming lives through service" },
    { src: img2, caption: "A legacy of community support" },
    { src: img3, caption: "Inspiring action, driving change" },
    { src: img4, caption: "Together, we achieve more" },
    { src: img5, caption: "Fostering hope and opportunities" },
    { src: img6, caption: "Commitment to positive growth" },
    { src: img7, caption: "Celebrating milestones in service" },
    { src: img8, caption: "Dedicated hands, compassionate hearts" },
    { src: img9, caption: "Building a foundation for the future" },
    { src: img10, caption: "Strengthening bonds within our community" },
    { src: img11, caption: "Making every moment count" },
    { src: img12, caption: "Smiles that light up our journey" },
    { src: img13, caption: "Action-driven community engagement" },
    { src: img14, caption: "Creating sustainable impact" },
    { src: img15, caption: "Bridging gaps, building futures" },
    { src: img16, caption: "Passion for serving others" },
    { src: img17, caption: "Empowerment through collective effort" },
    { src: img18, caption: "A shared vision for a better world" },
    { src: img19, caption: "Leading with compassion and care" },
    { src: img20, caption: "Every contribution makes a difference" },
  ];

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch("/api/admin/events?category=Gallery&limit=50");
        if (response.ok) {
          const data = await response.json();
          const items = data.events.flatMap((event: any) => 
            event.images.map((img: string) => ({
              src: img,
              caption: event.title
            }))
          );
          setDynamicItems(items);
        }
      } catch (err) {
        console.error("Failed to fetch gallery items");
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const allItems = [...dynamicItems, ...staticItems];

  return (
    <div className="pb-24">
      <PageHero
        title="Gallery"
        subtitle="Capturing the moments that define our journey of service."
        image={g1}
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Moments"
            title={
              <>
                Moments from <span className="text-gradient-gold">our journey</span>
              </>
            }
            description="A glimpse into the events, smiles and milestones that define our work."
          />

          {loading && dynamicItems.length === 0 ? (
            <div className="mt-12 flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="mt-12 grid grid-cols-2 lg:grid-cols-3 gap-4">
              {allItems.map((item, i) => (
                <Reveal key={i} delay={0.05 * (i % 6)}>
                  <div className="group relative aspect-square rounded-2xl overflow-hidden shadow-soft hover:shadow-elegant cursor-pointer">
                    <img
                      src={item.src}
                      alt={`Rotary Porunai event ${i + 1}`}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center">
                      <p className="text-white font-display text-sm md:text-base font-semibold text-center leading-snug">
                        {item.caption}
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
