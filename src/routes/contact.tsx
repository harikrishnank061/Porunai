import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { PageHero, Reveal, SectionHeading } from "@/components/Shared";
import { MapPin, Mail, Phone, ArrowRight } from "lucide-react";
import { SocialIcons } from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import heroImg from "@/assets/1000300456.jpg";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Thank you! We'll be in touch shortly.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="pb-24">
      <PageHero
        title="Contact Details"
        subtitle="We'd love to hear from you. Get in touch with us for any queries or collaborations."
        image={heroImg}
      />

      <section className="py-24">
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
                      <p className="text-sm text-white/90 mt-0.5">rc.porunai@gmail.com</p>
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
    </div>
  );
}
