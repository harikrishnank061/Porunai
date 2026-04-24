import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Heart,
  Users,
  GraduationCap,
  Stethoscope,
  Sprout,
  Award,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Instagram,
  Youtube,
  Facebook,
  ArrowRight,
  Menu,
  X,
  Quote,
  Sparkles,
} from "lucide-react";
import heroImg from "@/assets/hero-women.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import rotaryLogo from "@/assets/rotary.png";
import porunaiLogo from "@/assets/WhatsApp_Image_2026-04-24_at_16.18.28-removebg-preview.png";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  component: Index,
});

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Initiatives", href: "#initiatives" },
  { label: "Events", href: "#events" },
  { label: "Impact", href: "#impact" },
  { label: "Team", href: "#team" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between">
          <a href="#home" className="flex items-center gap-3">
            <div className="flex items-center gap-4 sm:gap-6">
              <BrandLogo variant="rotary" />
              <div
                className={`h-14 w-px transition-colors ${scrolled ? "bg-border" : "bg-white/30"}`}
              />
              <BrandLogo variant="porunai" />
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  scrolled ? "text-foreground" : "text-white/90"
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a href="#contact" className="hidden lg:inline-flex">
            <Button className="bg-gradient-to-r from-[oklch(0.78_0.14_85)] to-[oklch(0.66_0.15_75)] text-[oklch(0.18_0.06_265)] hover:opacity-90 shadow-gold font-semibold">
              Join Us
            </Button>
          </a>

          <button
            onClick={() => setOpen(!open)}
            className={`lg:hidden p-2 rounded-md ${
              scrolled ? "text-foreground" : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden py-4 border-t border-border bg-background/95 backdrop-blur-xl -mx-4 px-4 sm:-mx-6 sm:px-6">
            <nav className="flex flex-col gap-2">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-2 text-foreground hover:text-primary font-medium"
                >
                  {l.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)}>
                <Button className="w-full mt-2 bg-gradient-to-r from-[oklch(0.78_0.14_85)] to-[oklch(0.66_0.15_75)] text-[oklch(0.18_0.06_265)] font-semibold">
                  Join Us
                </Button>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function BrandLogo({
  variant,
  className = "",
}: {
  variant: "porunai" | "rotary";
  className?: string;
}) {
  const src = variant === "porunai" ? porunaiLogo : rotaryLogo;
  return (
    <img
      src={src}
      className={cn("h-16 sm:h-20 w-auto object-contain py-1", className)}
      alt={`${variant} logo`}
    />
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Women community leaders of Rotary Tirunelveli Porunai"
          className="h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.18_0.1_268)]/95 via-[oklch(0.22_0.12_275)]/80 to-[oklch(0.28_0.14_285)]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 backdrop-blur px-4 py-1.5 mb-6">
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
            <span className="text-xs font-semibold tracking-widest uppercase text-gold">
              Service Truly Different
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05]">
            Empowering Women,
            <br />
            <span className="text-gradient-gold">Transforming</span> Communities
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl leading-relaxed">
            A Rotary initiative for service and leadership — Rotary Club of Tirunelveli Porunai
            unites changemakers committed to uplifting women and serving humanity.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[oklch(0.82_0.14_88)] to-[oklch(0.66_0.15_75)] text-[oklch(0.18_0.06_265)] hover:opacity-90 shadow-gold font-semibold h-12 px-8 text-base"
              >
                Get Involved <ArrowRight className="ml-1" />
              </Button>
            </a>
            <a href="#about">
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 bg-white/5 text-white hover:bg-white/15 hover:text-white backdrop-blur h-12 px-8 text-base"
              >
                Learn More
              </Button>
            </a>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 text-white/80">
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
              <p className="text-3xl font-display font-bold text-gold">100+</p>
              <p className="text-xs uppercase tracking-widest">Lives Touched Monthly</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  center = true,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  center?: boolean;
}) {
  return (
    <Reveal>
      <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-foreground/80">
          <span className="text-gradient-gold">{eyebrow}</span>
        </p>
        <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold text-foreground">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}

function About() {
  const pillars = [
    {
      icon: Award,
      title: "Leadership",
      desc: "Cultivating women leaders who shape inclusive communities.",
    },
    {
      icon: Heart,
      title: "Service",
      desc: "Living the Rotary motto — Service Above Self — every day.",
    },
    {
      icon: Users,
      title: "Community",
      desc: "Building partnerships that uplift Tirunelveli and beyond.",
    },
  ];

  return (
    <section id="about" className="relative py-16 sm:py-24 bg-gradient-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About Us"
          title={
            <>
              A circle of women writing
              <span className="text-gradient-gold"> a new chapter of service</span>
            </>
          }
          description="Rotary Club of Tirunelveli Porunai is a vibrant chapter of Rotary International, founded on the belief that empowered women build empowered communities. We bring together professionals, entrepreneurs and changemakers committed to lasting impact."
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
              <div className="absolute -bottom-6 -right-6 rounded-2xl bg-card p-6 shadow-gold border border-gold/30 max-w-xs">
                <Quote className="h-6 w-6 text-gold mb-2" />
                <p className="text-sm font-medium text-foreground italic leading-relaxed">
                  "When women lead with purpose, communities flourish."
                </p>
              </div>
            </div>
          </Reveal>

          <div className="space-y-8">
            <Reveal delay={0.1}>
              <div className="rounded-2xl bg-card border border-border p-6 shadow-soft">
                <p className="text-xs font-bold uppercase tracking-widest text-primary">
                  Our Mission
                </p>
                <p className="mt-2 text-foreground leading-relaxed">
                  To empower women through education, health, leadership and economic opportunity —
                  while serving the wider community with integrity and compassion.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="rounded-2xl bg-gradient-to-br from-primary to-[oklch(0.5_0.18_295)] p-6 shadow-elegant text-white">
                <p className="text-xs font-bold uppercase tracking-widest text-gold">Our Vision</p>
                <p className="mt-2 leading-relaxed">
                  A Tirunelveli where every woman has the dignity, opportunity and voice to shape
                  her own future and lead change for others.
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
  );
}

function Initiatives() {
  const items = [
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

  return (
    <section id="initiatives" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Initiatives"
          title={
            <>
              Programs designed to <span className="text-gradient-gold">create real impact</span>
            </>
          }
          description="From education to enterprise, our initiatives are built to uplift, equip and inspire."
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={0.05 * i}>
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
      </div>
    </section>
  );
}

function Events() {
  const events = [
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

  return (
    <section id="events" className="py-16 sm:py-24 bg-gradient-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Upcoming Events"
          title={
            <>
              Join us at our next <span className="text-gradient-gold">gathering</span>
            </>
          }
          description="Be part of meaningful work happening in and around Tirunelveli."
        />

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((e, i) => (
            <Reveal key={e.title} delay={0.08 * i}>
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
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
                  <Button
                    variant="ghost"
                    className="mt-4 -ml-3 text-primary hover:text-primary hover:bg-primary/5"
                  >
                    Register <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

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

function Impact() {
  const stats = [
    { value: 1200, suffix: "+", label: "Women Empowered" },
    { value: 85, suffix: "+", label: "Events Conducted" },
    { value: 30, suffix: "+", label: "Villages Reached" },
    { value: 15, suffix: "K+", label: "Lives Touched" },
  ];

  return (
    <section id="impact" className="relative py-16 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, oklch(0.78 0.14 85 / 0.4) 0%, transparent 40%), radial-gradient(circle at 80% 80%, oklch(0.5 0.18 295 / 0.4) 0%, transparent 40%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Our Impact
            </p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold text-white">
              Numbers that tell <span className="text-gradient-gold">our story</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={0.08 * i}>
              <div className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-8 text-center hover:bg-white/10 hover:border-gold/40 transition-all">
                <p className="font-display text-5xl sm:text-6xl font-bold text-gradient-gold">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm uppercase tracking-widest text-white/80 font-medium">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Team() {
  const team = [
    { name: "Rtn. Lakshmi Sundaram", role: "Charter President", initials: "LS" },
    { name: "Rtn. Priya Krishnan", role: "Secretary", initials: "PK" },
    { name: "Rtn. Meena Rajan", role: "Treasurer", initials: "MR" },
    { name: "Rtn. Anitha Devi", role: "Service Director", initials: "AD" },
  ];

  const gradients = [
    "from-[oklch(0.36_0.18_268)] to-[oklch(0.5_0.18_295)]",
    "from-[oklch(0.5_0.18_295)] to-[oklch(0.66_0.15_75)]",
    "from-[oklch(0.78_0.14_85)] to-[oklch(0.36_0.18_268)]",
    "from-[oklch(0.4_0.16_280)] to-[oklch(0.78_0.14_85)]",
  ];

  return (
    <section id="team" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Leadership"
          title={
            <>
              Meet the women <span className="text-gradient-gold">leading our chapter</span>
            </>
          }
          description="Our leadership team brings decades of professional experience and a shared commitment to service."
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={0.08 * i}>
              <div className="group rounded-2xl bg-card border border-border overflow-hidden hover:shadow-elegant transition-all hover:-translate-y-2">
                <div
                  className={`aspect-square bg-gradient-to-br ${gradients[i]} flex items-center justify-center relative overflow-hidden`}
                >
                  <span className="font-display text-6xl font-bold text-white/90">
                    {m.initials}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-display font-bold text-foreground">{m.name}</h3>
                  <p className="text-sm text-primary font-medium mt-0.5">{m.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const imgs = [g1, g2, g3, g4, g5, g6];
  return (
    <section id="gallery" className="py-16 sm:py-24 bg-gradient-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Gallery"
          title={
            <>
              Moments from <span className="text-gradient-gold">our journey</span>
            </>
          }
          description="A glimpse into the events, smiles and milestones that define our work."
        />

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-3 gap-4">
          {imgs.map((src, i) => (
            <Reveal key={i} delay={0.05 * i}>
              <div className="group relative aspect-square rounded-2xl overflow-hidden shadow-soft hover:shadow-elegant cursor-pointer">
                <img
                  src={src}
                  alt={`Rotary Porunai event ${i + 1}`}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                  <p className="text-white font-display font-semibold">Service in Action</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Thank you! We'll be in touch shortly.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Get in Touch"
          title={
            <>
              Let's build something <span className="text-gradient-gold">meaningful together</span>
            </>
          }
          description="Whether you'd like to volunteer, partner with us or simply learn more — we'd love to hear from you."
        />

        <div className="mt-12 grid lg:grid-cols-5 gap-8">
          <Reveal className="lg:col-span-2">
            <div className="rounded-3xl bg-gradient-to-br from-primary to-[oklch(0.4_0.18_290)] p-8 text-white shadow-elegant h-full">
              <h3 className="font-display text-2xl font-bold">Reach Us</h3>
              <p className="mt-2 text-white/80 text-sm">
                Rotary Club of Tirunelveli Porunai welcomes your message.
              </p>
              <ul className="mt-8 space-y-5">
                <li className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gold">Location</p>
                    <p className="text-sm text-white/90 mt-0.5">Tirunelveli, Tamil Nadu, India</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gold">Email</p>
                    <p className="text-sm text-white/90 mt-0.5">info@porunairotary.org</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gold">Phone</p>
                    <p className="text-sm text-white/90 mt-0.5">+91 98000 00000</p>
                  </div>
                </li>
              </ul>

              <div className="mt-10 pt-8 border-t border-white/15">
                <p className="text-xs uppercase tracking-widest text-gold mb-4">Follow Us</p>
                <SocialIcons />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <form
              onSubmit={onSubmit}
              className="rounded-3xl bg-card border border-border p-8 shadow-soft"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Name
                  </label>
                  <Input required placeholder="Your full name" className="mt-2 h-12" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Email
                  </label>
                  <Input
                    required
                    type="email"
                    placeholder="you@example.com"
                    className="mt-2 h-12"
                  />
                </div>
              </div>
              <div className="mt-5">
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Subject
                </label>
                <Input placeholder="How can we help?" className="mt-2 h-12" />
              </div>
              <div className="mt-5">
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Message
                </label>
                <Textarea
                  required
                  placeholder="Share your thoughts, ideas or interest in volunteering..."
                  rows={6}
                  className="mt-2"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="mt-6 w-full sm:w-auto bg-gradient-to-r from-primary to-[oklch(0.5_0.18_295)] text-white hover:opacity-90 shadow-elegant h-12 px-8 font-semibold"
              >
                Send Message <ArrowRight className="ml-1" />
              </Button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SocialIcons() {
  const socials = [
    {
      icon: Instagram,
      href: "https://www.instagram.com/tirunelveliporunai?igsh=MTJ4dDJnZnFsOXQ0MQ==",
      label: "Instagram",
      hover: "hover:bg-gradient-to-tr hover:from-[#feda75] hover:via-[#d62976] hover:to-[#4f5bd5]",
    },
    {
      icon: Youtube,
      href: "https://youtube.com",
      label: "YouTube",
      hover: "hover:bg-[#FF0000]",
    },
    {
      icon: Facebook,
      href: "https://www.facebook.com/share/1FaWb5nxbW/?mibextid=wwXIfr",
      label: "Facebook",
      hover: "hover:bg-[#1877F2]",
    },
  ];
  return (
    <div className="flex items-center gap-3">
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className={`h-11 w-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:border-transparent hover:shadow-gold ${s.hover}`}
        >
          <s.icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[oklch(0.13_0.05_268)] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 0% 0%, oklch(0.36 0.18 268 / 0.6) 0%, transparent 50%), radial-gradient(circle at 100% 100%, oklch(0.78 0.14 85 / 0.2) 0%, transparent 50%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-x-10 gap-y-16">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 sm:gap-6">
              <BrandLogo variant="rotary" className="h-16" />
              <div className="h-12 w-px bg-white/20" />
              <BrandLogo variant="porunai" className="h-16" />
            </div>
            <h3 className="mt-8 font-display text-2xl font-bold">
              Rotary Club of Tirunelveli Porunai
            </h3>
            <p className="text-xs uppercase tracking-widest text-gold mt-2 font-semibold">
              Service Truly Different
            </p>
            <div className="mt-6 space-y-2 text-sm text-white/70">
              <p>Charter No: <span className="text-white font-semibold">222586</span></p>
              <p>District: <span className="text-white font-semibold">3212</span></p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {navLinks.slice(0, 5).map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-white/70 hover:text-gold transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="h-px w-3 bg-white/40 group-hover:w-5 group-hover:bg-gold transition-all" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display font-bold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                Tirunelveli, Tamil Nadu, India
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                info@porunairotary.org
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                +91 98000 00000
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-display font-bold text-white mb-4">Follow Us</h4>
            <p className="text-sm text-white/70 mb-4">
              Stay connected with our latest events, stories and impact updates.
            </p>
            <SocialIcons />
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© 2026 Rotary Club of Tirunelveli Porunai. All Rights Reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with <Heart className="h-3.5 w-3.5 text-gold fill-gold" /> for our community
          </p>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Initiatives />
        <Events />
        <Impact />
        <Team />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
