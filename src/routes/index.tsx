import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Landmark, Waves, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading } from "@/components/Shared";
import heroImg from "@/assets/1000300456.jpg";
import g3 from "@/assets/1000300458.jpg";
import g4 from "@/assets/1000300454.jpg";
import geminiImg from "@/assets/Gemini_Generated_Image_50l4v150l4v150l4.png";

export const Route = createFileRoute("/")({
  component: Index,
});

const slides = [
  {
    image: geminiImg,
    tag: "Welcome",
    title: (
      <>
        Rotary Club of
        <br />
        <span className="text-gradient-gold">Tirunelveli Porunai</span>
      </>
    ),
    description:
      "A vibrant collective of women dedicated to service, leadership, and community transformation, inspired by the perennial Porunai River.",
    link: "/history",
    btnText: "Our Story",
  },
  {
    image: heroImg,
    tag: "Service Truly Different",
    title: (
      <>
        Empowering Women,
        <br />
        <span className="text-gradient-gold">Transforming</span> Communities
      </>
    ),
    description:
      "A Rotary initiative for service and leadership — Rotary Club of Tirunelveli Porunai unites changemakers committed to uplifting women and serving humanity.",
    link: "/join",
    btnText: "Get Involved",
  },
  {
    image: g3,
    tag: "Our Initiatives",
    title: (
      <>
        Past Events &
        <br />
        <span className="text-gradient-gold">Services</span> Rendered
      </>
    ),
    description:
      "From education to enterprise, our initiatives are built to uplift, equip and inspire the community through targeted humanitarian projects.",
    link: "/initiatives",
    btnText: "Explore Initiatives",
  },
  {
    image: g4,
    tag: "Club History",
    title: (
      <>
        Legacy of
        <br />
        <span className="text-gradient-gold">Leadership</span> & Service
      </>
    ),
    description:
      "Honoring the dedicated leaders and the rich heritage of the Thamirabharani river that inspires our commitment to social welfare.",
    link: "/history",
    btnText: "Learn Our Story",
  },
];

function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt="Hero background"
            className="h-full w-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.18_0.1_268)]/60 via-transparent to-background" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-20 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 backdrop-blur px-4 py-1.5 mb-6">
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
              <span className="text-xs font-semibold tracking-widest uppercase text-gold">
                {slides[current].tag}
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05]">
              {slides[current].title}
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              {slides[current].description}
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to={slides[current].link}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[oklch(0.82_0.14_88)] to-[oklch(0.66_0.15_75)] text-[oklch(0.18_0.06_265)] hover:opacity-90 shadow-gold font-semibold h-12 px-8 text-base"
                >
                  {slides[current].btnText} <ArrowRight className="ml-1" />
                </Button>
              </Link>
              <Link to="/history">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 bg-white/5 text-white hover:bg-white/15 hover:text-white backdrop-blur h-12 px-8 text-base"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-white/80">
          <div>
            <p className="text-3xl font-display font-bold text-gold">222586</p>
            <p className="text-xs uppercase tracking-widest">Charter Number</p>
          </div>
          <div className="hidden sm:block h-10 w-px bg-white/20" />
          <div>
            <p className="text-3xl font-display font-bold text-gold">3212</p>
            <p className="text-xs uppercase tracking-widest">District</p>
          </div>
          <div className="hidden sm:block h-10 w-px bg-white/20" />
          <div>
            <p className="text-3xl font-display font-bold text-gold">1000+</p>
            <p className="text-xs uppercase tracking-widest">Lives Impacted</p>
          </div>
        </div>

        <div className="mt-12 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${current === i ? "w-8 bg-gold" : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutUs() {
  return (
    <section className="py-24 bg-gradient-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              Welcome to the <span className="text-gradient-gold">Rotary Club of Tirunelveli Porunai</span>
            </h2>
            <p className="mt-8 text-lg sm:text-xl text-muted-foreground leading-relaxed">
              A vibrant collective of women dedicated to service, leadership, and community transformation.
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <Reveal>
            <div className="space-y-6">
              <h3 className="font-display text-3xl font-bold text-foreground">Our Inspiration: The Porunai</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our club draws its name and spirit from the "Porunai River"—the ancient, perennial Thamirabharani that has nurtured the civilization of Tirunelveli for millennia.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Just as the river flows with unwavering strength to sustain the lands it touches, our members are committed to being a source of empowerment and positive change.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="rounded-3xl overflow-hidden shadow-elegant bg-card p-8 border border-border">
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">Who We Are</h3>
              <p className="text-muted-foreground leading-relaxed">
                As a premier women’s club within the Rotary international network, we bring together professionals, entrepreneurs, and homemakers who share a common vision: "Service Above Self." We believe that when women lead, the entire community thrives.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {[
            {
              title: "Heritage",
              desc: "We honor the deep cultural and historical roots of the Thamirabharani river.",
              icon: Landmark,
            },
            {
              title: "Resilience",
              desc: "Like the perennial waters of our namesake, our commitment to social welfare remains constant regardless of the season.",
              icon: Waves,
            },
            {
              title: "Life-Giving Service",
              desc: "From education and healthcare to environmental sustainability, our projects aim to nourish the social fabric of Tirunelveli.",
              icon: Sprout,
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="h-full rounded-2xl bg-white/50 backdrop-blur border border-border p-8 hover:shadow-soft transition-all group">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-[oklch(0.5_0.18_295)] flex items-center justify-center shadow-soft mb-6 group-hover:rotate-6 transition-transform">
                  <item.icon className="h-7 w-7 text-gold" />
                </div>
                <h4 className="font-display text-xl font-bold text-foreground mb-3">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="rounded-3xl bg-gradient-to-br from-primary to-[oklch(0.4_0.18_290)] p-10 md:p-16 text-white text-center shadow-elegant">
            <h3 className="font-display text-3xl sm:text-4xl font-bold mb-6 text-gold">Our Mission</h3>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              To foster fellowship among women leaders and to implement impactful service projects that address the unique challenges of our region. Whether it is empowering the girl child, supporting local artisans, or preserving our natural resources, the "Rotary Club of Tirunelveli Porunai" members flow & fill where the need is greatest.
              <br />
              <span className="block mt-8 text-2xl font-display italic text-gold/90">
                "Flowing with Compassion Leading with Grace."
              </span>
              <span className="block mt-6 text-gold font-display font-bold uppercase tracking-widest text-base">
                Rotary Club of Tirunelveli Porunai
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">Ready to make a difference?</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Join a community of women dedicated to service and transformation.
          </p>
          <Link to="/join">
            <Button size="lg" variant="secondary" className="h-14 px-10 text-lg font-bold">
              Join Rotary Tirunelveli Porunai
            </Button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function Index() {
  return (
    <>
      <Hero />
      <AboutUs />
      <CTA />
    </>
  );
}
