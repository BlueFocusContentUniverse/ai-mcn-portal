"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import LanguageSwitcher from "@/components/LanguageSwitcher";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  const { t } = useTranslation(["navigation"]);

  // Scroll state for nav bar
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for nav bar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-brand-black text-brand-white">
      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-brand-black/30 backdrop-blur-lg border-b border-white/10"
        initial={{ y: 0 }}
        animate={{ y: isScrolled ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <Image src="/logo.png" alt="AI MCN Logo" width={40} height={40} className="animate-pulse" />
              <span className="text-2xl font-bold bg-gradient-to-r from-brand-red to-red-400 bg-clip-text text-transparent">
                Tomato Planet
              </span>
              <div className="flex items-center space-x-8 ml-8">
                <Link href="/" className="nav-link">
                  {t("nav.home", { ns: "navigation" })}
                </Link>
                <Link href="/cases" className="nav-link">
                  {t("nav.cases", { ns: "navigation" })}
                </Link>
                <Link href="/about" className="nav-link">
                  {t("nav.about", { ns: "navigation" })}
                </Link>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </motion.nav>

      <main>{children}</main>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-3">
            <Image src="/logo.png" alt="AI MCN Logo" width={32} height={32} />
            <span className="text-xl font-bold text-white">Tomato Planet</span>
          </div>
          <div className="flex space-x-8">
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
