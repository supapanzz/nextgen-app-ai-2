/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import CartButton from "@/app/(front)/components/CartButton";
import { useDict } from "@/lib/i18n";
import { Badge } from "@/components/ui/badge";

type Props = {
  products: any[];
};

const formatPrice = (value: number) =>
  new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(value);

const FeaturesProduct = ({ products }: Props) => {
  const t = useDict();

  return (
    <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-4xl font-semibold tracking-[-0.01em] sm:text-[2.75rem]">
          {t.products.title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-lg text-muted-foreground">
          {t.products.subtitle}
        </p>
      </div>

      {products.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">
          {t.products.empty}
        </p>
      ) : (
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-[#A8A29E]"
            >
              <div className="relative aspect-4/5 w-full overflow-hidden">
                <Image
                  alt={product.name}
                  className="size-full bg-muted object-cover transition-transform duration-300 group-hover:scale-105"
                  width={0}
                  height={0}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  src={`/product-image/${product.picture}`}
                  loading="eager"
                />
                <Badge
                  variant="secondary"
                  className="absolute left-3 top-3 rounded-full border-transparent bg-primary text-primary-foreground"
                >
                  {t.products.handmade}
                </Badge>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-heading text-lg font-semibold leading-snug">
                    {product.name}
                  </h3>
                  <span className="font-mono text-xs text-muted-foreground">
                    #{product.id}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="font-heading text-xl font-semibold text-tertiary">
                    {formatPrice(Number(product.price))}
                  </p>
                  <CartButton product={product} />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturesProduct;