import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Instagram,
  Youtube,
  Facebook,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";
import rotaryLogo from "@/assets/rotary.png";
import porunaiLogo from "@/assets/WhatsApp_Image_2026-04-24_at_16.18.28-removebg-preview.png";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const navLinks = [
  { label: "Join our club", to: "/join" },
  { label: "Club history", to: "/history" },
  { label: "Initiatives", to: "/initiatives" },
  { label: "Upcoming events", to: "/events" },
  { label: "Awards", to: "/awards" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact details", to: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex items-center gap-4 sm:gap-6">
              <BrandLogo variant="rotary" />
              <div className="h-14 w-px bg-border" />
              <BrandLogo variant="porunai" />
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-[15px] font-medium text-foreground transition-colors hover:text-accent"
                activeProps={{ className: "text-accent font-bold" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Link to="/join" className="hidden lg:inline-flex">
            <Button className="bg-gradient-to-r from-[oklch(0.78_0.14_85)] to-[oklch(0.66_0.15_75)] text-[oklch(0.18_0.06_265)] hover:opacity-90 shadow-gold font-semibold">
              Join Us
            </Button>
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-md text-foreground"
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden py-4 border-t border-border bg-background/95 backdrop-blur-xl -mx-4 px-4 sm:-mx-6 sm:px-6">
            <nav className="flex flex-col gap-2">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="py-2 text-foreground hover:text-primary font-medium"
                  activeProps={{ className: "text-primary font-bold" }}
                >
                  {l.label}
                </Link>
              ))}
              <Link to="/join" onClick={() => setOpen(false)}>
                <Button className="w-full mt-2 bg-gradient-to-r from-[oklch(0.78_0.14_85)] to-[oklch(0.66_0.15_75)] text-[oklch(0.18_0.06_265)] font-semibold">
                  Join Us
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export function BrandLogo({
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

export function SocialIcons() {
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

export function Footer() {
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
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-white/70 hover:text-gold transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="h-px w-3 bg-white/40 group-hover:w-5 group-hover:bg-gold transition-all" />
                    {l.label}
                  </Link>
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
                rc.porunai@gmail.com
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
