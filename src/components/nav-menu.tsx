"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useDict } from "@/lib/i18n";

export const NavMenu = (props: ComponentProps<typeof NavigationMenu>) => {
  const t = useDict();

  const links = [
    { href: "/", label: t.common.home },
    { href: "/product", label: t.common.products },
    { href: "/course", label: t.common.courses },
    { href: "/about", label: t.common.about },
    { href: "/contact", label: t.common.contact },
  ];

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="data-[orientation=vertical]:-ms-2 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start">
        {links.map((link) => (
          <NavigationMenuItem key={link.href}>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href={link.href}>{link.label}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};