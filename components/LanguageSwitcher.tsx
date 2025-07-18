"use client";

import { Globe } from "lucide-react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { cookieName } from "@/lib/i18n/settings";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [, setCookie] = useCookies([cookieName]);

  const languages = [
    { code: "en", name: "English" },
    { code: "zh", name: "简体中文" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

  const changeLanguage = (languageCode: string) => {
    // Change the language in i1818n.changeLanguage(languageCode);
    i18n.changeLanguage(languageCode);

    // Set the cookie with the new language using react-cookie
    setCookie(cookieName, languageCode, {
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
    });

    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-white hover:text-brand-red"
      >
        <Globe className="w-4 h-4" />
        <span>{currentLanguage.name}</span>
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-brand-black border border-white/10 rounded-lg shadow-lg z-50 min-w-[120px]">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-white/10 transition-colors ${
                i18n.language === language.code ? "text-brand-red" : "text-white"
              }`}
            >
              {language.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
