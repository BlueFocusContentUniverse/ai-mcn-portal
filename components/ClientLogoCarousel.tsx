"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { AnimatedNumber } from "@/components/AnimatedNumber";

const clientLogos = [
  "/client_logo/第9页-1.PNG",
  "/client_logo/第9页-2.PNG",
  "/client_logo/第9页-3.PNG",
  "/client_logo/第9页-4.PNG",
  "/client_logo/第9页-5.PNG",
  "/client_logo/第9页-6.PNG",
  "/client_logo/第9页-7.PNG",
  "/client_logo/第9页-8.PNG",
  "/client_logo/第9页-9.PNG",
  "/client_logo/第9页-10.PNG",
  "/client_logo/第9页-11.PNG",
  "/client_logo/第9页-12.PNG",
  "/client_logo/第9页-13.PNG",
  "/client_logo/第9页-14.PNG",
  "/client_logo/第9页-15.PNG",
  "/client_logo/第9页-16.PNG",
  "/client_logo/第9页-17.PNG",
  "/client_logo/第9页-18.PNG",
  "/client_logo/第9页-19.PNG",
  "/client_logo/第9页-20.PNG",
  "/client_logo/第9页-21.PNG",
  "/client_logo/第9页-22.PNG",
  "/client_logo/第9页-23.PNG",
  "/client_logo/第9页-24.PNG",
  "/client_logo/第9页-25.PNG",
  "/client_logo/第9页-26.PNG",
  "/client_logo/第9页-27.PNG",
  "/client_logo/第9页-28.PNG",
  "/client_logo/第9页-29.PNG",
  "/client_logo/第9页-30.PNG",
  "/client_logo/第9页-31.PNG",
  "/client_logo/第9页-32.PNG",
  "/client_logo/第9页-33.PNG",
  "/client_logo/第9页-34.PNG",
  "/client_logo/第9页-35.PNG",
  "/client_logo/第9页-36.PNG",
  "/client_logo/第9页-37.PNG",
  "/client_logo/第9页-38.PNG",
  "/client_logo/第9页-39.PNG",
  "/client_logo/第9页-40.PNG",
  "/client_logo/第9页-41.PNG",
  "/client_logo/第9页-42.PNG",
  "/client_logo/第9页-43.PNG",
  "/client_logo/第13页-8.PNG",
  "/client_logo/第13页-9.PNG",
  "/client_logo/第13页-10.PNG",
  "/client_logo/第13页-11.PNG",
  "/client_logo/第13页-12.PNG",
  "/client_logo/第13页-13.PNG",
  "/client_logo/第13页-14.PNG",
  "/client_logo/第13页-15.PNG",
  "/client_logo/第13页-16.PNG",
  "/client_logo/第18页-5.PNG",
  "/client_logo/第18页-6.PNG",
  "/client_logo/第18页-7.PNG",
  "/client_logo/第18页-8.PNG",
  "/client_logo/第18页-9.PNG",
  "/client_logo/第18页-10.PNG",
  "/client_logo/第18页-11.PNG",
  "/client_logo/第18页-12.PNG",
  "/client_logo/第18页-13.PNG",
  "/client_logo/第18页-14.PNG",
  "/client_logo/第18页-16.PNG",
  "/client_logo/第18页-17.PNG",
  "/client_logo/第18页-18.PNG",
  "/client_logo/第18页-19.PNG",
  "/client_logo/第18页-20.PNG",
  "/client_logo/第18页-21.PNG",
  "/client_logo/第18页-22.PNG",
  "/client_logo/第18页-23.PNG",
  "/client_logo/第18页-24.PNG",
];

interface ClientLogoCarouselProps {
  className?: string;
}

export function ClientLogoCarousel({ className = "" }: ClientLogoCarouselProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    const element = document.getElementById("client-logo-carousel");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section id="client-logo-carousel" className={`py-16  ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            <span className="section-gradient-text">{t("client.title", { ns: "home" })}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            {t("client.desc", { ns: "home" })}
          </p>
        </motion.div>

        {/* Logo Carousel */}
        <div className="relative">
          {/* Scrolling Logos */}
          <motion.div
            className="flex space-x-8 items-center"
            animate={{
              x: [0, -50 * clientLogos.length],
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* First set of logos */}
            {clientLogos.map((logo, index) => (
              <motion.div
                key={`first-${index}`}
                className="flex-shrink-0"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-32 h-16 bg-white/5 rounded-lg p-3 flex items-center justify-center border border-gray-200 dark:border-white/10 backdrop-blur-sm">
                  <Image
                    src={logo}
                    alt={`Client logo ${index + 1}`}
                    width={120}
                    height={60}
                    className="max-w-full max-h-full object-contain filter transition-all duration-300"
                  />
                </div>
              </motion.div>
            ))}

            {/* Duplicate set for seamless loop */}
            {clientLogos.map((logo, index) => (
              <motion.div
                key={`second-${index}`}
                className="flex-shrink-0"
                whileHover={{ scale: 1.1, filter: "brightness(1.2)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-32 h-16 bg-white/5 rounded-lg p-3 flex items-center justify-center border border-gray-200 dark:border-white/10 backdrop-blur-sm">
                  <Image
                    src={logo}
                    alt={`Client logo ${index + 1}`}
                    width={120}
                    height={60}
                    className="max-w-full max-h-full object-contain filter transition-all duration-300"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              <AnimatedNumber value={500} duration={2} />+
            </div>
            <div className="text-gray-500 dark:text-gray-400">{t("client.activeClients", { ns: "home" })}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              <AnimatedNumber value={1300000} duration={2} />+
            </div>
            <div className="text-gray-500 dark:text-gray-400">{t("client.contentPiecesCreated", { ns: "home" })}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              <AnimatedNumber value={98} duration={2} />%
            </div>
            <div className="text-gray-500 dark:text-gray-400">{t("client.clientSatisfaction", { ns: "home" })}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
