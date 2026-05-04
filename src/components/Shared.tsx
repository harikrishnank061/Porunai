import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Reveal({
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

export function SectionHeading({
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

export function PageHero({ 
  title, 
  subtitle, 
  image 
}: { 
  title: React.ReactNode; 
  subtitle?: string; 
  image?: string 
}) {
  return (
    <section className="relative min-h-[70vh] lg:min-h-[80vh] flex items-center overflow-hidden bg-background">
      {image && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={image}
            alt="Hero background"
            className="h-full w-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.18_0.1_268)]/60 via-transparent to-background" />
        </motion.div>
      )}
      
      {/* Absolute positioned Back Button relative to the full section */}
      <div className="absolute top-6 sm:top-8 left-4 sm:left-8 lg:left-12 z-20">
        <Reveal>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 backdrop-blur px-4 py-2 hover:bg-white/10 transition-colors shadow-soft"
          >
            <ArrowLeft className="h-4 w-4 text-gold" />
            <span className="text-xs font-semibold tracking-widest uppercase text-gold">
              Back to Home
            </span>
          </Link>
        </Reveal>
      </div>

      {/* Centered Text Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full text-center">
        <Reveal>
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05]">
              {title}
            </h1>
            
            {subtitle && (
              <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
