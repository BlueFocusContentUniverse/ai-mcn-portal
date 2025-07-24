"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { VideoGallery } from "./VideoGallery";
import { AnimatedNumber } from "./AnimatedNumber";

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

interface CaseStudy {
  id: string;
  title: string;
  metric: number;
  suffix?: string;
  prefix?: string;
  desc: string;
  delay: string;
}

interface CaseStudiesSectionProps {
  className?: string;
}

export function CaseStudiesSection({ className = "" }: CaseStudiesSectionProps) {
  const { t } = useTranslation(["home"]);
  const [casesRef, casesIsVisible] = useOnScreen({ threshold: 0.1 });

  const caseStudies: CaseStudy[] = [
    {
      id: "catl",
      title: t("caseStudies.title-catl"),
      metric: 120,
      suffix: "+",
      desc: t("caseStudies.desc-catl"),
      delay: "200ms",
    },
    {
      id: "anker",
      title: t("caseStudies.title-anker"),
      metric: 70,
      prefix: "-",
      suffix: "%",
      desc: t("caseStudies.desc-anker"),
      delay: "400ms",
    },
    {
      id: "honor",
      title: t("caseStudies.title-honor"),
      metric: 200,
      suffix: "+",
      desc: t("caseStudies.desc-honor"),
      delay: "600ms",
    },
  ];

  return (
    <section
      ref={casesRef}
      className={`py-24 px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ${casesIsVisible ? "opacity-100" : "opacity-0"} ${className}`}
    >
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="section-title">
          <span className="section-text-brand-red">{t("caseStudies.title")}</span>
        </h2>
        <p className="section-subtitle">{t("caseStudies.subtitle")}</p>
      </div>
      <VideoGallery />
      <div className="grid md:grid-cols-3 gap-8">
        {caseStudies.map((caseStudy, index) => (
          <Link key={caseStudy.id} href={`/cases/${caseStudy.id}`} className="block group">
            <motion.div
              className={`case-study-card animate-fade-in-up ${casesIsVisible ? "is-visible" : ""} group-hover:scale-105 transition-transform duration-300`}
              style={{ animationDelay: caseStudy.delay }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="p-8">
                <p className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-4 group-hover:text-brand-red transition-colors">
                  {caseStudy.title}
                </p>
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
                <p className="text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                  {caseStudy.desc}
                </p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
