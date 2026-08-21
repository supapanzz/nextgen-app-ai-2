import Link from "next/link";
import { Store } from "lucide-react";
import { cookies } from "next/headers";
import {
  getDictionary,
  isLocale,
  LOCALE_COOKIE,
  defaultLocale,
} from "@/lib/i18n";

const Footer = async () => {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(localeCookie) ? localeCookie : defaultLocale;
  const t = getDictionary(locale);

  const shopLinks = [
    { href: "/product", label: t.common.products },
    { href: "/course", label: t.common.courses },
    { href: "/cart", label: t.common.cart },
  ];
  const companyLinks = [
    { href: "/about", label: t.common.about },
    { href: "/contact", label: t.common.contact },
  ];

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-(--breakpoint-xl) gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="max-w-sm">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Store className="size-5" />
            </span>
            <span className="font-heading text-lg font-semibold text-foreground">
              Market<span className="text-primary">Nest</span>
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {t.footer.tagline}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              {t.footer.shop}
            </h4>
            <ul className="mt-4 space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              {t.footer.company}
            </h4>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          <h4 className="font-semibold text-foreground">{t.contact.follow}</h4>
          <p className="mt-4">
            {t.contact.email}: contact@marketnest.co
          </p>
          <p className="mt-1">{t.contact.phone}: 02-123-4567</p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-(--breakpoint-xl) flex-col items-center justify-between gap-2 px-4 py-6 text-center text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} Buby. {t.footer.rights}.
          </p>
          <p className="font-mono">marketnest.co</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;