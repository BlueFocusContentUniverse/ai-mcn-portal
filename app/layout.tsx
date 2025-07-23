import "./globals.css";

import { dir } from "i18next";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import type React from "react";

import { ContactFormProvider } from "@/components/ContactFormProvider";
import { CookiesProviderWrapper } from "@/components/cookies-provider";
import { ThemeProvider } from "@/components/theme-provider";
import I18NProvider from "@/lib/i18n/client-provider";
import { cookieName } from "@/lib/i18n/settings";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tomato AI MCN - The Future of Content",
  description: "Tomato is an AI MCN platform.",
  generator: "Tomato",
  icons: {
    icon: [
      {
        url: "/logo.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/logo.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/logo.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const lng = cookieStore.get(cookieName)?.value;

  return (
    <html lang={lng ?? "en"} dir={dir(lng ?? "en")} className="light">
      <body className={cn("min-h-screen bg-background antialiased")}>
        <I18NProvider locale={lng ?? "en"}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ContactFormProvider>
              <CookiesProviderWrapper>{children}</CookiesProviderWrapper>
            </ContactFormProvider>
          </ThemeProvider>
        </I18NProvider>
      </body>
    </html>
  );
}
