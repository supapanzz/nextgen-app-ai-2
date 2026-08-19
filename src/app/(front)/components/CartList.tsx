"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCartStore } from "@/lib/cart-store";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDict } from "@/lib/i18n";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(value);

export default function CartList() {
  const router = useRouter();
  const t = useDict();

  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartStore((state) => state.totalPrice());

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center px-6 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-secondary/20">
          <Trash className="size-7 text-tertiary" />
        </div>
        <h1 className="mt-6 text-3xl font-semibold">{t.cart.title}</h1>
        <p className="mt-3 text-muted-foreground">{t.cart.empty}</p>
        <p className="text-muted-foreground">{t.cart.emptyHint}</p>
        <Button
          asChild
          className="mt-8"
          onClick={() => router.replace("/product")}
        >
          <span>{t.cart.continueShopping}</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold">{t.cart.title}</h1>

      <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.cart.productId}</TableHead>
              <TableHead>{t.cart.productName}</TableHead>
              <TableHead>{t.cart.price}</TableHead>
              <TableHead>{t.cart.qty}</TableHead>
              <TableHead>{t.cart.subtotal}</TableHead>
              <TableHead>{t.cart.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((i) => (
              <TableRow key={i.productId}>
                <TableCell className="font-mono text-sm">{i.productId}</TableCell>
                <TableCell className="font-medium">{i.name}</TableCell>
                <TableCell>{formatPrice(i.price)}</TableCell>
                <TableCell>{i.qty}</TableCell>
                <TableCell>{formatPrice(i.price * i.qty)}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(i.productId)}
                    aria-label={t.cart.remove}
                  >
                    <Trash className="size-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-8 flex flex-col items-end gap-4">
        <div className="text-right">
          <span className="text-sm text-muted-foreground">{t.cart.total}: </span>
          <span className="font-heading text-3xl font-semibold text-primary">
            {formatPrice(totalPrice)}
          </span>
        </div>
        <div className="flex flex-wrap justify-end gap-3">
          <Button variant="outline" onClick={clearCart}>
            {t.cart.clearAll}
          </Button>
          <Button
            onClick={() => {
              clearCart();
              router.replace("/product");
            }}
          >
            {t.cart.checkout}
          </Button>
        </div>
      </div>
    </div>
  );
}