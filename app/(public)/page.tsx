"use client";

import { Briefcase, Mouse } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { ClientLogoCarousel } from "@/components/ClientLogoCarousel";
import { ClientReviewsSection } from "@/components/ClientReviewsSection";
import { ContactFormTrigger } from "@/components/ContactFormTrigger";
import { IntroSection } from "@/components/IntroSection";
import { Typewriter } from "@/components/Typewriter";

// A custom hook to detect if an element is in the viewport
const useOnScreen = (options: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isVisible] as const;
};

export default function HomePage() {
  const { t } = useTranslation(["home"]);
  const [heroRef, heroIsVisible] = useOnScreen({ threshold: 0.1 });
  const [joinRef, joinIsVisible] = useOnScreen({ threshold: 0.1 });

  return (
    <div className="min-h-screen bg-background text-brand-white overflow-x-hidden">
      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="h-[calc(100vh-5rem)] flex items-center relative overflow-hidden">
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{ filter: "brightness(0.5) contrast(1.2)" }}
          >
            <source src="/video/hero-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40 z-0"></div>
          <div className="z-10 px-8 w-4/5">
            <h1 className="text-5xl md:text-8xl font-bold mb-6">
              <div>
                <Typewriter
                  texts={[t("hero.title"), t("hero.title-a"), t("hero.title-b"), t("hero.title-c")]}
                  speed={150}
                  delay={1000}
                  cycleDelay={4000}
                  pauseOnHover={true}
                />
              </div>
            </h1>
            <motion.p
              className="text-xl text-gray-300 mb-12 mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              {t("hero.subtitle")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <ContactFormTrigger size="lg" className="cta-button text-lg px-8 py-6">
                {t("contact.title")}
              </ContactFormTrigger>
            </motion.div>
          </div>
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <span className="text-sm text-gray-500 dark:text-gray-400">{t("hero.scroll")}</span>
            <Mouse className="w-6 h-6 text-gray-500 dark:text-gray-400 animate-bounce" />
          </motion.div>
        </section>

        {/* Client Logo Carousel */}
        <ClientLogoCarousel />

        {/* Intro Section */}
        <IntroSection />

        {/* Capabilities Section */}
        {/* <CapabilitiesSection /> */}

        {/* Case Studies */}
        <CaseStudiesSection />

        {/* Client Reviews */}
        <ClientReviewsSection />

        {/* Join/CTA Section */}
        <section
          ref={joinRef}
          className={`py-24 px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ${joinIsVisible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="cta-card">
              <div className="p-12 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">{t("join.title")}</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">{t("join.subtitle")}</p>
                <div className="flex flex-col md:flex-row justify-center gap-6">
                  <ContactFormTrigger size="lg" className="cta-button">
                    <Briefcase className="mr-3" /> {t("contact.title")}
                  </ContactFormTrigger>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
