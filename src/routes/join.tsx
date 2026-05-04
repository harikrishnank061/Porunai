import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { PageHero, Reveal, SectionHeading } from "@/components/Shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/1000300456.jpg";

export const Route = createFileRoute("/join")({
  component: JoinPage,
});

function JoinPage() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Thank you for your interest! We'll be in touch shortly.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="pb-24">
      <PageHero
        title="Join Our Club"
        subtitle="Become a part of a global network of changemakers. Join Rotary Tirunelveli Porunai today."
        image={heroImg}
      />

      <section className="mt-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <SectionHeading
          eyebrow="Membership"
          title="Start Your Journey"
          description="Fill out the form below to express your interest in joining our club. We welcome women professionals and leaders committed to service."
        />

        <Reveal delay={0.1} className="mt-12">
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
                Profession
              </label>
              <Input required placeholder="Your profession" className="mt-2 h-12" />
            </div>
            <div className="mt-5">
              <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Why do you want to join?
              </label>
              <Textarea
                required
                placeholder="Tell us about your interest in service..."
                rows={6}
                className="mt-2"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="mt-6 w-full sm:w-auto bg-gradient-to-r from-primary to-[oklch(0.5_0.18_295)] text-white hover:opacity-90 shadow-elegant h-12 px-8 font-semibold"
            >
              Submit Interest <ArrowRight className="ml-1" />
            </Button>
          </form>
        </Reveal>
      </section>
    </div>
  );
}
