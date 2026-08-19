"use client";

import Link from "next/link";
import { ArrowRight, HandHeart, Leaf, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDict } from "@/lib/i18n";

const categories = [
  { key: "ceramic", icon: HandHeart, tint: "bg-secondary/20 text-tertiary" },
  { key: "natural", icon: Leaf, tint: "bg-tertiary/10 text-tertiary" },
  { key: "local", icon: Globe, tint: "bg-primary/10 text-primary" },
];

export default function CtaBanner() {
  const t = useDict();

  const categoryLabels: Record<string, string> = {
    ceramic: "Ceramics · เซรามิก",
    natural: "Natural Fibers · ผ้าธรรมชาติ",
    local: "Local Crafts · งานฝีมือท้องถิ่น",
  };

  return (
    <section className="mx-auto max-w-(--breakpoint-xl) px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-2xl border-2 border-border bg-surface p-8 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-3">
          {categories.map((cat) => (
            <div key={cat.key} className="flex items-start gap-4">
              <span
                className={`flex size-12 shrink-0 items-center justify-center rounded-lg ${cat.tint}`}
              >
                <cat.icon className="size-6" />
              </span>
              <div>
                <h3 className="font-heading text-lg font-semibold">
                  {categoryLabels[cat.key]}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {cat.key === "ceramic"
                    ? t.hero.subtitle
                    : cat.key === "natural"
                      ? t.products.subtitle
                      : t.about.mission}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-border pt-10 lg:flex-row">
          <div>
            <h2 className="font-heading text-2xl font-semibold sm:text-3xl">
              {t.products.title}
            </h2>
            <p className="mt-2 text-muted-foreground">{t.products.subtitle}</p>
          </div>
          <Button asChild size="lg">
            <Link href="/product">
              {t.common.viewAll} <ArrowRight className="size-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}