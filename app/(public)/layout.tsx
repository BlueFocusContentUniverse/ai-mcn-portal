"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { ContactForm } from "@/components/contact-form";
import { ContactFormTrigger } from "@/components/ContactFormTrigger";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/theme-toggle";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  const { t } = useTranslation(["navigation", "home"]);

  return (
    <div className="min-h-screen bg-background text-brand-white">
      {/* Navigation */}
      <motion.nav
        className="sticky top-0 z-50 bg-white/80 dark:bg-background/30 backdrop-blur-lg border-b border-gray-200 dark:border-white/10"
        initial={{ y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              {/* Logo with dark mode reversal */}
              <div className="logo-container">
                {/* Light mode logo */}
                <Image src="/logo.png" alt="AI MCN Logo" width={64} height={64} className="logo-light animate-pulse" />
                {/* Dark mode logo */}
                <Image
                  src="/logo-white.png"
                  alt="AI MCN Logo"
                  width={64}
                  height={64}
                  className="logo-dark animate-pulse"
                />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">Tomato Planet</span>
            </div>
            <div className="flex items-center space-x-16 ml-8">
              <Link href="/" className="nav-link text-lg font-bold">
                {t("nav.home", { ns: "navigation" })}
              </Link>
              <Link href="/cases" className="nav-link text-lg font-bold">
                {t("nav.cases", { ns: "navigation" })}
              </Link>
              <Link href="/about" className="nav-link text-lg font-bold">
                {t("nav.about", { ns: "navigation" })}
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <ThemeToggle />
              <LanguageSwitcher />
              <ContactFormTrigger size="lg" className="cta-button text-lg px-8 py-6">
                {t("contact.title", { ns: "home" })}
              </ContactFormTrigger>
            </div>
          </div>
        </div>
      </motion.nav>

      <main>{children}</main>

      {/* Global Contact Form */}
      <ContactForm />

      {/* Footer */}
      <footer className="py-6 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-3">
            {/* Footer logo with dark mode reversal */}
            <div className="logo-container">
              {/* Light mode logo */}
              <Image src="/logo.png" alt="AI MCN Logo" width={48} height={48} className="logo-light" />
              {/* Dark mode logo */}
              <Image src="/logo-white.png" alt="AI MCN Logo" width={48} height={48} className="logo-dark" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">Tomato Planet</span>
          </div>
          <div className="flex space-x-8">
            <Link href="https://beian.miit.gov.cn/" className="nav-link">
              京ICP备2025108131号-1
            </Link>
            <Link href="/about" className="nav-link">
              {t("nav.about", { ns: "navigation" })}
            </Link>
            <Link href="#contact" className="nav-link">
              {t("nav.contact", { ns: "navigation" })}
            </Link>
          </div>
          <p className="text-gray-500">&copy; {new Date().getFullYear()} Tomato Planet. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
