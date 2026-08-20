import { MapPin, Phone, Mail, Clock, AtSign, MessageCircle, Globe } from "lucide-react";
import { cookies } from "next/headers";
import {
  getDictionary,
  isLocale,
  LOCALE_COOKIE,
  defaultLocale,
} from "@/lib/i18n";
import { ContactForm } from "./contact-form";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const socialIcons = {
  Facebook: AtSign,
  Instagram: MessageCircle,
  Twitter: Globe,
} as const;

// http://localhost:3000/contact
export default async function ContactPage() {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(localeCookie) ? localeCookie : defaultLocale;
  const t = getDictionary(locale);

  const infoItems = [
    { icon: MapPin, label: t.contact.address, value: t.contact.addressValue },
    { icon: Phone, label: t.contact.phone, value: t.contact.phoneValue },
    { icon: Mail, label: t.contact.email, value: t.contact.emailValue },
    { icon: Clock, label: t.contact.hours, value: t.contact.hoursValue },
  ];

  return (
    <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-16 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-[-0.045em] sm:text-[2.75rem]/[1.2]">
          {t.contact.title}
        </h1>
        <p className="mt-3 text-pretty text-lg text-muted-foreground tracking-[-0.01em] sm:text-xl">
          {t.contact.subtitle}
        </p>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Left: contact info */}
        <section aria-label={t.contact.title}>
          <div className="grid gap-4 sm:grid-cols-2">
            {infoItems.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border bg-card p-5 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <item.icon className="size-4 text-primary" aria-hidden />
                  <h2 className="text-sm font-semibold text-foreground">
                    {item.label}
                  </h2>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border bg-card p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-foreground">
              {t.contact.follow}
            </h2>
            <ul className="mt-3 flex flex-wrap gap-3">
                    {t.contact.socials?.map((social) => {
                      const Icon = socialIcons[social.label as keyof typeof socialIcons] ?? Globe;
                      return (
                        <li key={social.label}>
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                          >
                            <Icon className="size-4" aria-hidden />
                            {social.label}
                          </a>
                        </li>
                      );
                    }) || []}
            </ul>
          </div>

          <div className="mt-6 rounded-2xl border bg-card p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-foreground">
              FAQ
            </h2>
            <dl className="mt-3 space-y-4">
              {(t.contact.faq || []).map((item, index) => (
                <div key={index}>
                  <dt className="text-sm font-medium text-foreground">
                    {item.q}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Right: contact form */}
        <section aria-label={t.contact.sendMessage} className="lg:pt-2">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              {t.contact.sendMessage}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t.contact.sendMessageHint}
            </p>
          </div>
          <ContactForm />
        </section>
      </div>
    </div>
  );
}