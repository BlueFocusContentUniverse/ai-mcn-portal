"use client";

import { Briefcase, Mouse, UserPlus } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { AnimatedNumber } from "@/components/AnimatedNumber";
import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { ClientLogoCarousel } from "@/components/ClientLogoCarousel";
import { useContactForm } from "@/components/ContactFormProvider";
import { IntroSection } from "@/components/IntroSection";
import { Typewriter } from "@/components/Typewriter";
import { ContactFormTrigger } from "@/components/ContactFormTrigger";
import { Button } from "@/components/ui/button";

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
  const { t } = useTranslation(["home", "navigation"]);
  const [heroRef, heroIsVisible] = useOnScreen({ threshold: 0.1 });
  const [casesRef, casesIsVisible] = useOnScreen({ threshold: 0.1 });
  const [reviewsRef, reviewsIsVisible] = useOnScreen({ threshold: 0.1 });
  const [joinRef, joinIsVisible] = useOnScreen({ threshold: 0.1 });

  // Global form hook
  const { openForm } = useContactForm();

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
            <h1 className="text-5xl md:text-8xl font-bold mb-6 text-shadow-glow">
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
        <CapabilitiesSection />

        {/* Case Studies */}
        <section
          ref={casesRef}
          className={`py-24 px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ${casesIsVisible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="section-title">
              <span className="section-gradient-text">Proven Results</span>
            </h2>
            <p className="section-subtitle">Real-world impact delivered to our partners.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Fashion Brand X",
                metric: 500,
                suffix: "%",
                desc: "Content Volume Increase",
                delay: "200ms",
              },
              {
                title: "Tech Startup Y",
                metric: 250,
                suffix: "%",
                desc: "Engagement Rate Uplift",
                delay: "400ms",
              },
              {
                title: "Media Company Z",
                metric: 70,
                prefix: "-",
                suffix: "%",
                desc: "Content Production Costs",
                delay: "600ms",
              },
            ].map((caseStudy, index) => (
              <div
                key={index}
                className={`case-study-card animate-fade-in-up ${casesIsVisible ? "is-visible" : ""}`}
                style={{ animationDelay: caseStudy.delay }}
              >
                <div className="p-8">
                  <p className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-4">{caseStudy.title}</p>
                  <p className="text-6xl font-bold text-gray-900 dark:text-white mb-2 case-study-metric">
                    <AnimatedNumber
                      value={caseStudy.metric}
                      prefix={caseStudy.prefix || ""}
                      suffix={caseStudy.suffix || ""}
                      duration={2}
                      delay={index * 0.2}
                      triggerOnVisible={true}
                      className="text-6xl font-bold text-gray-900 dark:text-white"
                    />
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">{caseStudy.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Client Reviews */}
        <section
          ref={reviewsRef}
          className={`py-24 transition-opacity duration-1000 ${reviewsIsVisible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="section-title">
              <span className="section-gradient-text">From Our Partners</span>
            </h2>
          </div>
          <div className="scrolling-reviews">
            <div className="scrolling-reviews-track">
              {[
                {
                  quote:
                    "Tomato Planet transformed our content strategy completely. We're now producing 5x more content with better quality and engagement.",
                  author: "John Doe, CMO",
                },
                {
                  quote:
                    "The ROI tracking and analytics are incredible. We can see exactly how our content performs across all channels.",
                  author: "Sarah Miller, Director",
                },
                {
                  quote:
                    "The custom content generation is amazing. Every piece feels unique and perfectly aligned with our brand.",
                  author: "Mike Johnson, VP Marketing",
                },
              ].map((review, index) => (
                <div key={index} className="review-card">
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">&ldquo;{review.quote}&rdquo;</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{review.author}</p>
                </div>
              ))}
              {/* Duplicate for seamless scroll */}
              {[
                {
                  quote:
                    "Tomato Planet transformed our content strategy completely. We're now producing 5x more content with better quality and engagement.",
                  author: "John Doe, CMO",
                },
                {
                  quote:
                    "The ROI tracking and analytics are incredible. We can see exactly how our content performs across all channels.",
                  author: "Sarah Miller, Director",
                },
                {
                  quote:
                    "The custom content generation is amazing. Every piece feels unique and perfectly aligned with our brand.",
                  author: "Mike Johnson, VP Marketing",
                },
              ].map((review, index) => (
                <div key={`dup-${index}`} className="review-card">
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">&ldquo;{review.quote}&rdquo;</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{review.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join/CTA Section */}
        <section
          ref={joinRef}
          className={`py-24 px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ${joinIsVisible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="cta-card">
              <div className="p-12 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  Join the Content Revolution
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
                  Whether you&apos;re a creator looking to monetize or a brand ready to scale, your journey starts here.
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-6">
                  <Button size="lg" className="cta-button-secondary" onClick={() => openForm("creator")}>
                    <UserPlus className="mr-3" /> Apply as a Creator
                  </Button>
                  <Button size="lg" className="cta-button" onClick={() => openForm("brand")}>
                    <Briefcase className="mr-3" /> Partner as a Brand
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
