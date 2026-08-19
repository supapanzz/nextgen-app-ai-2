import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/nav-menu";
import { NavigationSheet } from "@/components/navigation-sheet";
import Link from "next/link";
import { ShoppingBasket } from "lucide-react";
import CountCartItem from "@/app/(front)/components/CountCartItem";
import { auth } from "@/lib/auth";
import { headers, cookies } from "next/headers";
import LogoutButton from "./logout-button";
import { LanguageSwitcher } from "./language-switcher";
import {
  getDictionary,
  isLocale,
  LOCALE_COOKIE,
  defaultLocale,
} from "@/lib/i18n";

const Navbar = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const cookieStore = await cookies();
  const localeCookie = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(localeCookie) ? localeCookie : defaultLocale;
  const t = getDictionary(locale);

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-(--breakpoint-xl) items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/cart"
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-transparent px-3 text-sm font-medium text-stone-600 transition-colors hover:bg-accent hover:text-foreground"
          >
            <ShoppingBasket className="size-4" />
            <span className="hidden sm:inline">
              <CountCartItem /> {t.common.items}
            </span>
          </Link>

          <LanguageSwitcher />

          {
            !session && (
              <>
                <Button asChild variant="outline" className="hidden sm:inline-flex">
                  <Link href="/login">{t.common.login}</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">{t.common.signup}</Link>
                </Button>
              </>
            )
          }

          {
            session && (
              <>
                <div className="hidden items-center sm:flex">
                  {t.common.hello}, {session.user.name}
                </div>
                <LogoutButton />
              </>
            )
          }

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;