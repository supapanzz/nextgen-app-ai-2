"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDict } from "@/lib/i18n";

const stats = [
  { key: "statMakers", value: "120+" },
  { key: "statProducts", value: "1,500+" },
  { key: "statStories", value: "860" },
  { key: "statCommunity", value: "24" },
] as const;

export default function Hero() {
  const t = useDict();

  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      {/* warm layered background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 55% at 15% 10%, rgba(212,163,115,0.28) 0%, rgba(255,251,245,0) 70%), radial-gradient(55% 50% at 90% 85%, rgba(194,65,12,0.14) 0%, rgba(255,251,245,0) 70%)",
        }}
      />

      <div className="mx-auto grid max-w-(--breakpoint-xl) items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
        <div className="max-w-xl">
          <Badge
            variant="secondary"
            className="inline-flex items-center gap-1.5 rounded-full border-border px-3 py-1 text-[11px] uppercase tracking-[0.09em]"
          >
            <Sparkles className="size-3.5" />
            {t.hero.badge}
          </Badge>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.15] tracking-[-0.01em] sm:text-5xl md:text-[3.4rem]">
            {t.hero.title}
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            {t.hero.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild size="lg">
              <Link href="/product">
                {t.hero.ctaPrimary} <ArrowUpRight className="size-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/about">{t.hero.ctaSecondary}</Link>
            </Button>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.key}>
                <dd className="font-heading text-2xl font-semibold text-primary">
                  {stat.value}
                </dd>
                <dt className="mt-1 text-xs font-medium uppercase tracking-[0.09em] text-muted-foreground">
                  {t.hero[stat.key]}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        {/* Feature collage card */}
        <div className="relative hidden lg:block">
          <div className="rounded-2xl border-2 border-border bg-surface p-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-[4/5] rounded-xl bg-gradient-to-br from-secondary/60 to-tertiary/30" />
              <div className="aspect-[4/5] rounded-xl bg-gradient-to-br from-primary/30 to-secondary/40" />
              <div className="aspect-[4/5] rounded-xl bg-gradient-to-br from-tertiary/40 to-primary/25" />
              <div className="aspect-[4/5] rounded-xl bg-gradient-to-br from-secondary/50 to-tertiary/25" />
            </div>
            <div className="mt-3 flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3">
              <div>
                <p className="text-xs text-muted-foreground">
                  {t.products.handmade}
                </p>
                <p className="font-heading text-sm font-semibold">
                  MarketNest
                </p>
              </div>
              <span className="font-mono text-xs text-primary">
                #thai-artisan
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}