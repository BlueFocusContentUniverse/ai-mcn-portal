import "./globals.css";

import { dir } from "i18next";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import type React from "react";

import { CookiesProviderWrapper } from "@/components/cookies-provider";
import I18NProvider from "@/lib/i18n/client-provider";
import { cookieName } from "@/lib/i18n/settings";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tomato AI MCN - The Future of Content",
  description: "Tomato is an AI MCN platform.",
  generator: "Tomato",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const lng = cookieStore.get(cookieName)?.value;

  return (
    <html lang={lng ?? "en"} dir={dir(lng ?? "en")} className="dark">
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <I18NProvider locale={lng ?? "en"}>
          <CookiesProviderWrapper>{children}</CookiesProviderWrapper>
        </I18NProvider>
      </body>
    </html>
  );
}
