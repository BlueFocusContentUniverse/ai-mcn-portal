"use client";

import { ArrowRight, BarChart3, Globe, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

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

export default function CasesPage() {
  const { t } = useTranslation(["home"]);
  const [heroRef, heroIsVisible] = useOnScreen({ threshold: 0.1 });
  const [casesRef, casesIsVisible] = useOnScreen({ threshold: 0.1 });

  const caseStudies = [
    {
      id: "catl",
      title: t("caseStudies.title-catl"),
      category: "technology",
      description: `宁德时代港股上市，及零碳目的地发布会，4小时内极限制作及发布近百条形色各异的内容，并打出声量`,
      metrics: {
        engagement: "+250%",
        reach: "+400%",
        conversion: "+180%",
      },
      image: "/cases/catl.png",
      icon: BarChart3,
      color: "from-blue-500 to-purple-500",
    },
    {
      id: "anker",
      title: t("caseStudies.title-anker"),
      category: "fashion",
      description: `作为全球知名的3C数码配件类厂商，品牌已成功进入全球多个国家市场。在拓展欧洲地区（如美国、英国、澳大利亚等）的过程中，我们通过提供高度本地化的流媒体视频内容，助力客户精准触达目标用户群体`,
      metrics: {
        engagement: "+500%",
        reach: "+300%",
        conversion: "+200%",
      },
      image: "/cases/anker.png",
      icon: TrendingUp,
      color: "from-pink-500 to-red-500",
    },
    {
      id: "honor",
      title: t("caseStudies.title-honor"),
      category: "media",
      description:
        "针对客户拓展俄罗斯市场的需求，鉴于当地TikTok等国际短视频平台推广受限、但年轻用户对短视频内容高度活跃的现状，我司在新品首发期间，为其量身定制了“俄罗斯本土化短视频饱和式曝光”方案",
      metrics: {
        engagement: "+180%",
        reach: "+600%",
        conversion: "+150%",
      },
      image: "/cases/honor.png",
      icon: Globe,
      color: "from-green-500 to-teal-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-brand-white overflow-x-hidden">
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

        <div className="z-10 px-8 w-full">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroIsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-8xl font-bold mb-6">
                {t("cases.hero.title")} <span className="section-text-brand-red">{t("cases.hero.titleHighlight")}</span>
              </h1>
              <motion.p
                className="text-xl text-gray-300 mb-12 mx-auto max-w-4xl"
                initial={{ opacity: 0, y: 30 }}
                animate={heroIsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {t("cases.hero.subtitle")}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section
        ref={casesRef}
        className={`py-24 px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ${casesIsVisible ? "opacity-100" : "opacity-0"}`}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={casesIsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {caseStudies.map((caseStudy, index) => (
              <motion.div
                key={caseStudy.id}
                className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-brand-red/50 transition-all duration-300 shadow-lg hover:shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={casesIsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Link href={`/cases/${caseStudy.id}`} className="block">
                  {/* Image */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${caseStudy.color} opacity-20`} />
                    <Image
                      src={caseStudy.image}
                      alt={caseStudy.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-brand-red font-semibold">
                        {t(`cases.categories.${caseStudy.category}`)}
                      </span>
                      <ArrowRight className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-brand-red transition-colors" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-brand-red transition-colors">
                      {caseStudy.title}
                    </h3>

                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                      {caseStudy.description}
                    </p>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {caseStudy.metrics.engagement}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{t("cases.metrics.engagement")}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">{caseStudy.metrics.reach}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{t("cases.metrics.reach")}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {caseStudy.metrics.conversion}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{t("cases.metrics.conversion")}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
