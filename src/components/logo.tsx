import Link from "next/link";
import { Store } from "lucide-react";

export const Logo = () => (
  <Link href="/" className="inline-flex items-center gap-2">
    <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
      <Store className="size-5" />
    </span>
    <span className="font-heading text-lg font-semibold tracking-tight text-foreground">
      Market<span className="text-primary">Nest</span>
    </span>
  </Link>
);