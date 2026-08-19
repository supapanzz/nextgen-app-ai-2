import { Suspense } from "react";
import type { Metadata } from "next";
import { Open_Sans, Prompt, Lora, Source_Code_Pro } from "next/font/google";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";
import { isLocale, LOCALE_COOKIE, LocaleProvider, defaultLocale } from "@/lib/i18n";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import "../globals.css";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-heading",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const prompt = Prompt({
  weight: ["400", "500", "600", "700"],
  subsets: ["thai"],
  variable: "--font-thai",
  display: "swap",
});

const mono = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "MarketNest",
  description: "ตลาดสินค้าแฮนด์เมด / Handmade artisan marketplace",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(localeCookie) ? localeCookie : defaultLocale;

  return (
    <html
      lang={locale}
      className={cn(
        "font-sans",
        openSans.variable,
        prompt.variable,
        lora.variable,
        mono.variable
      )}
    >
      <body>
        <LocaleProvider locale={locale}>
          <Suspense fallback={<div className="h-16 border-b bg-background" />}>
            <Navbar />
          </Suspense>
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
