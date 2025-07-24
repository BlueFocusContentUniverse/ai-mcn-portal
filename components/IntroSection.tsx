"use client";

import { Database, Globe, Settings, Video } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { useTranslation } from "react-i18next";

interface IntroSectionProps {
  className?: string;
}

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

export function IntroSection({ className = "" }: IntroSectionProps) {
  const { t } = useTranslation(["home"]);
  const [introRef, introIsVisible] = useOnScreen({ threshold: 0.1 });
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: 0,
      icon: Video,
      title: t("features.batchProduction.title"),
      description: t("features.batchProduction.desc"),
      image: "/placeholder.jpg", // You can replace with actual images
      videoUrl: "/video/trendjet.mp4", // Optional video URL
      features: [
        t("features.batchProduction.features.0"),
        t("features.batchProduction.features.1"),
        t("features.batchProduction.features.2"),
        t("features.batchProduction.features.3"),
      ],
    },
    {
      id: 1,
      icon: Settings,
      title: t("features.pipeline.title"),
      description: t("features.pipeline.desc"),
      image: "/placeholder.jpg",
      videoUrl: "/video/pipeline.mp4", // Optional video URL
      features: [
        t("features.pipeline.features.0"),
        t("features.pipeline.features.1"),
        t("features.pipeline.features.2"),
        t("features.pipeline.features.3"),
      ],
    },
    {
      id: 2,
      icon: Globe,
      title: t("features.distribution.title"),
      description: t("features.distribution.desc"),
      image: "/placeholder.jpg",
      videoUrl: "/video/distribution.mp4", // Optional video URL
      features: [
        t("features.distribution.features.0"),
        t("features.distribution.features.1"),
        t("features.distribution.features.2"),
      ],
    },
    {
      id: 3,
      icon: Database,
      title: t("features.management.title"),
      description: t("features.management.desc"),
      image: "/assets-management.png",
      features: [
        t("features.management.features.0"),
        t("features.management.features.1"),
        t("features.management.features.2"),
      ],
    },
  ];

  return (
    <section
      ref={introRef}
      className={`py-24 px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ${introIsVisible ? "opacity-100" : "opacity-0"} ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={introIsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t("intro.ourCore")} <span className="section-text-brand-red">{t("intro.capabilities")}</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{t("intro.subtitle")}</p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-3 px-6 py-4 rounded-xl border transition-all duration-300 ${
                activeTab === tab.id
                  ? "border-brand-red bg-brand-red/10 text-brand-red"
                  : "border-gray-600 text-gray-500 dark:text-gray-400 hover:border-gray-500 hover:text-gray-300"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={introIsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-semibold">{tab.title}</span>
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Content */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{tabs[activeTab].title}</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{tabs[activeTab].description}</p>
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t("features.featuresSubTitle")}
              </h4>
              <div className="grid gap-3">
                {tabs[activeTab].features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-brand-red rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Image/Video */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-8">
              {tabs[activeTab].videoUrl ? (
                <div className="aspect-video rounded-xl overflow-hidden">
                  <video
                    src={tabs[activeTab].videoUrl}
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-brand-red/20 to-red-600/20 rounded-xl flex items-center justify-center">
                  {/* {React.createElement(tabs[activeTab].icon, { className: "w-24 h-24 text-brand-red opacity-60" })} */}
                  {/* You can replace the icon with actual images */}
                  <Image
                    src={tabs[activeTab].image}
                    alt={tabs[activeTab].title}
                    width={550}
                    height={320}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
