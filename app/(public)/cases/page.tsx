"use client";

import { ArrowRight, BarChart3, Globe, TrendingUp, Users } from "lucide-react";
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

const caseStudies = [
  {
    id: "jd-electronics",
    title: "京东电器 X 肖战",
    category: "Fashion & Retail",
    description: `结合AIGC焦点和电器品类互动，以"未来"、"趋势"等关键词为核心，为3C家电品牌定制AI场景包装，为用户呈现了未来想象力和科技感触的未来生活`,
    metrics: {
      engagement: "+500%",
      reach: "+300%",
      conversion: "+200%",
    },
    image: "/cases/京东X肖战生成式广告.png",
    icon: TrendingUp,
    color: "from-pink-500 to-red-500",
  },
  {
    id: "catl",
    title: "宁德时代 CATL",
    category: "Technology",
    description: "AI大片邀您主演「充电10分钟 神行800里」，通过AI创意内容营销，提升宁德时代在行业中的创新形象",
    metrics: {
      engagement: "+250%",
      reach: "+400%",
      conversion: "+180%",
    },
    image: "/cases/宁德时代AI换脸TVC.png",
    icon: BarChart3,
    color: "from-blue-500 to-purple-500",
  },
  {
    id: "jd-programmer-day",
    title: "京东电脑 X 程序员节",
    category: "Media & Entertainment",
    description: "当程序员节遇见重阳节，京东电脑联合制作「爸妈的第一个AI作品」，用科技温情满满地连接两代人",
    metrics: {
      engagement: "+180%",
      reach: "+600%",
      conversion: "+150%",
    },
    image: "/cases/京东1024程序员节.png",
    icon: Globe,
    color: "from-green-500 to-teal-500",
  },
];

export default function CasesPage() {
  const { t } = useTranslation(["home"]);
  const [heroRef, heroIsVisible] = useOnScreen({ threshold: 0.1 });
  const [casesRef, casesIsVisible] = useOnScreen({ threshold: 0.1 });

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroIsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Case <span className="text-brand-red">Studies</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              探索我们如何利用AI为各行各业带来创新营销解决方案，助力品牌实现增长目标
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="px-4 py-2 bg-brand-red/20 text-brand-red rounded-full">All Industries</span>
              <span className="px-4 py-2 bg-white/10 text-gray-300 rounded-full">500+ Success Stories</span>
              <span className="px-4 py-2 bg-white/10 text-gray-300 rounded-full">98% Client Satisfaction</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section ref={casesRef} className="py-24 px-4 sm:px-6 lg:px-8">
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
                className="group relative bg-gray-800/50 rounded-2xl border border-white/10 overflow-hidden hover:border-brand-red/50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={casesIsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Link href={`/cases/${caseStudy.id}`} className="block">
                  {/* Image */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${caseStudy.color} opacity-20`} />
                    {/* You can replace with actual images */}
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
                      <span className="text-sm text-brand-red font-semibold">{caseStudy.category}</span>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-brand-red transition-colors" />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-red transition-colors">
                      {caseStudy.title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">{caseStudy.description}</p>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">{caseStudy.metrics.engagement}</div>
                        <div className="text-xs text-gray-400">Engagement</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">{caseStudy.metrics.reach}</div>
                        <div className="text-xs text-gray-400">Reach</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">{caseStudy.metrics.conversion}</div>
                        <div className="text-xs text-gray-400">Conversion</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Load More Button */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={casesIsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <button className="bg-gradient-to-r from-brand-red to-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Load More Cases
            </button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 via-purple-900/10 to-blue-900/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Join Our Success Stories?</h2>
            <p className="text-xl text-gray-300 mb-10">
              Let&apos;s create your own success story with our AI-powered content platform
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-brand-red to-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Start Your Journey
              </Link>
              <Link
                href="/about"
                className="border border-white/20 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
