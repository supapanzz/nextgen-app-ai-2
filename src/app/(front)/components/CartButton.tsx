/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart-store";
import { Plus } from "lucide-react";
import { useDict } from "@/lib/i18n";

export default function CartButton({ product }: any) {
  const addItem = useCartStore((state) => state.addItem);
  const t = useDict();

  const handleAddItem = () => {
    addItem({
      productId: String(product.id),
      name: product.name,
      price: product.price,
      qty: 1,
    });
  };

  return (
    <Button size="sm" onClick={handleAddItem}>
      <Plus className="size-4" /> {t.products.addToCart}
    </Button>
  );
}