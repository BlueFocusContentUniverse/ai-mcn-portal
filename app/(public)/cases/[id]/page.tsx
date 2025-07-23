"use client";

import { ArrowLeft, BarChart3, Globe, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { ContactFormTrigger } from "@/components/ContactFormTrigger";

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

const caseStudies = {
  catl: {
    id: "catl",
    title: "宁德时代 CATL",
    category: "technology",
    description: "宁德时代港股上市，及零碳目的地发布会，4小时内极限制作及发布近百条形色各异的内容，并打出声量",
    fullDescription: `4小时内从文案到素材处理到差异化成片剪辑，到多平台多账号快速分发，成功在一天内完成上百万的总播放`,
    challenge: "客户对有时效性的短期内容爆发性事件，有需要内容制作能力，批量生产能力，快速铺陈能力",
    solution: "利用AI技术，快速生成差异化内容，并快速分发",
    results: {
      engagement: "+250%",
      reach: "+400%",
      conversion: "+180%",
      contentVolume: "+1000%",
      costReduction: "-70%",
    },
    image: "/cases/catl.png",
    icon: BarChart3,
    color: "from-blue-500 to-purple-500",
    timeline: "4 months",
    team: "3-person marketing team",
  },
  anker: {
    id: "anker",
    title: "ANKER",
    category: "technology",
    description: `作为全球知名的3C数码配件类厂商，品牌已成功进入全球多个国家市场。在拓展欧洲地区
（如美国、英国、澳大利亚等）的过程中，我们通过提供高度本地化的流媒体视频内容，助力客户精准触达目标用户群体`,
    fullDescription:
      "双方联合打造了多场景、多语言适配的短视频内容，覆盖客户旗下充电宝、耳机、吸尘器、扫地机器人等多品类产品，有效提升品牌本土化影响力",
    challenge: `拓展欧美地区的过程中，客户产品需要快速在当地市场打开声量`,
    solution:
      "我们协助客户在TikTok、YouTube、Instagram等平台，通过多场景、多语言适配的短视频内容，覆盖客户旗下充电宝、耳机、吸尘器、扫地机器人等多品类产品，有效提升品牌本土化影响力",
    results: {
      engagement: "+500%",
      reach: "+300%",
      conversion: "+200%",
      contentVolume: "+1000%",
      costReduction: "-70%",
    },
    image: "/cases/anker.png",
    icon: TrendingUp,
    color: "from-pink-500 to-red-500",
    timeline: "6 months",
    team: "5-person marketing team",
  },
  honor: {
    id: "honor",
    title: "荣耀手机",
    category: "technology",
    description:
      "某手机品牌客户拓展俄罗斯市场的需求，鉴于当地TikTok等国际短视频平台推广受限、但年轻用户对短视频内容高度活跃的现状，我司在新品首发期间，为其量身定制了​“俄罗斯本土化短视频饱和式曝光”方案",
    fullDescription: `针对某手机品牌客户拓展俄罗斯市场的需求，鉴于当地TikTok等国际短视频平台推广受限、但年轻用户对短视频内容高度活跃的现状，我司在新品首发期间，为其量身定制了​“俄罗斯本土化短视频饱和式曝光”方案`,
    challenge: "品牌在俄罗斯市场推广受限，年轻人不认可，且传统营销广告在当地TikTok等国际短视频平台推广受限",
    solution: "实拍+二创，自研批量内容产线；精准平台布局，适配本土生态；矩阵账号分发，饱和覆盖用户心智",
    results: {
      engagement: "+180%",
      reach: "+600%",
      conversion: "+150%",
      contentVolume: "+800%",
      costReduction: "-60%",
    },
    image: "/cases/honor.png",
    icon: Globe,
    color: "from-green-500 to-teal-500",
    timeline: "8 months",
    team: "12-person content team",
  },
};

interface CaseDetailPageProps {
  params: {
    id: string;
  };
}

export default function CaseDetailPage({ params }: CaseDetailPageProps) {
  const { t } = useTranslation(["home"]);
  const caseStudy = caseStudies[params.id as keyof typeof caseStudies];
  const [heroRef, heroIsVisible] = useOnScreen({ threshold: 0.1 });
  const [contentRef, contentIsVisible] = useOnScreen({ threshold: 0.1 });

  if (!caseStudy) {
    notFound();
  }

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
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroIsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center space-x-4 mb-6">
                    <span className="px-4 py-2 bg-brand-red/20 text-brand-red rounded-full text-sm font-semibold">
                      {t(`cases.categories.${caseStudy.category}`)}
                    </span>
                  </div>

                  <h1 className="text-4xl md:text-6xl font-bold mb-6 text-shadow-glow">{caseStudy.title}</h1>

                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">{caseStudy.fullDescription}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{caseStudy.results.engagement}</div>
                      <div className="text-sm text-gray-400">{t("cases.metrics.engagement")}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{caseStudy.results.reach}</div>
                      <div className="text-sm text-gray-400">{t("cases.metrics.reach")}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{caseStudy.results.conversion}</div>
                      <div className="text-sm text-gray-400">{t("cases.metrics.conversion")}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{caseStudy.results.costReduction}</div>
                      <div className="text-sm text-gray-400">{t("cases.detail.costReduction")}</div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div
                    className={`aspect-square bg-gradient-to-br ${caseStudy.color} rounded-2xl p-8 flex items-center justify-center shadow-2xl`}
                  >
                    <Image src={caseStudy.image} alt={caseStudy.title} fill className="object-cover rounded-xl" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section
        ref={contentRef}
        className={`py-24 px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ${contentIsVisible ? "opacity-100" : "opacity-0"}`}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="grid md:grid-cols-3 gap-12"
            initial={{ opacity: 0, y: 30 }}
            animate={contentIsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Challenge */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t("cases.detail.challenge")}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{caseStudy.challenge}</p>
            </div>

            {/* Solution */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t("cases.detail.solution")}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{caseStudy.solution}</p>
            </div>

            {/* Results */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t("cases.detail.results")}</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-red rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-300">
                    {t("cases.detail.contentVolume")} {caseStudy.results.contentVolume}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-red rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-300">
                    {t("cases.detail.engagementRates")} {caseStudy.results.engagement}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-red rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-300">
                    {t("cases.detail.conversionRates")} {caseStudy.results.conversion}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-red rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-300">
                    {t("cases.detail.costReduction")} {caseStudy.results.costReduction}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="text-center mt-16 p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={contentIsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t("cases.detail.cta.title")}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{t("cases.detail.cta.subtitle")}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <ContactFormTrigger className="bg-gradient-to-r from-brand-red to-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                {t("contact.title")}
              </ContactFormTrigger>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
