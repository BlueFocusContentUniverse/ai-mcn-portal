"use client";

import { ArrowLeft, BarChart3, Globe, TrendingUp, Users } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
  "jd-electronics": {
    id: "jd-electronics",
    title: "京东电器 X 肖战",
    category: "Fashion & Retail",
    description: `结合AIGC焦点和电器品类互动，以"未来"、"趋势"等关键词为核心，为3C家电品牌定制AI场景包装，为用户呈现了未来想象力和科技感触的未来生活`,
    fullDescription:
      "TVC中全程场景均为深度结合AIGC，面部AI使用率高达90%。以AI的想象力为场景营造的应用场景加上未来的想象，带领用户感受AI赋能的魅力，同时大大缩短了制作周期，节约了制作成本，体现出了物美价廉的核心。",
    challenge: `全新的营销方式OPEN AD，即开放式广告，极大地考虑UGC效果，利用明星偶像话和物智能进行互动设计，用户产生"被制广告内容"，让众多友友"变演"，赋予"创作"，OPEN AD在粉丝圈层应用和引发志友关注，与品牌建设和AIGC#内信在AI字宙带行#话题不断发酵，站内直播带，吸引直播间人倍增参与。`,
    solution:
      "TVC中全程场景均为深度结合AIGC，面部AI使用率高达90%。以AI的想象力为场景营造的应用场景加上未来的想象，带领用户感受AI赋能的魅力，同时大大缩短了制作周期，节约了制作成本，体现出了物美价廉的核心",
    results: {
      engagement: "+500%",
      reach: "+300%",
      conversion: "+200%",
      contentVolume: "+1000%",
      costReduction: "-70%",
    },
    image: "/cases/京东X肖战生成式广告.png",
    icon: TrendingUp,
    color: "from-pink-500 to-red-500",
    timeline: "6 months",
    team: "5-person marketing team",
  },
  catl: {
    id: "catl",
    title: "宁德时代 CATL",
    category: "Technology",
    description: "AI-powered content generation that scaled their marketing efforts 10x while reducing costs by 70%.",
    fullDescription: `宁德时代作为全球领先的新能源电池公司，产品市场占有率年年位居世界前列，在全球新能源领域拥有极高的品牌影响力。在品牌宣传方面需要传递科技感和创新精神，突出"充电10分钟，神行800里"的产品优势，对于提升产品的持续竞争力，展现出"阿尔法蛋"的动力电池产品的各种强大性能具有重要意义`,
    challenge:
      "此次项目运用了Face Fusion AI换脸、Midjourney视觉生成、Chat GPT智能文案生成等AI技术，其中AI换脸和互动技术开发及优化，实施难度大",
    solution: "产出与输出领先AI大片H5，线上与体验与线下展会大动态，项目落地广州汽车展会10天数据",
    results: {
      engagement: "+250%",
      reach: "+400%",
      conversion: "+180%",
      contentVolume: "+1000%",
      costReduction: "-70%",
    },
    image: "/cases/宁德时代AI换脸TVC.png",
    icon: BarChart3,
    color: "from-blue-500 to-purple-500",
    timeline: "4 months",
    team: "3-person marketing team",
  },
  "jd-programmer-day": {
    id: "jd-programmer-day",
    title: "京东电脑 X 程序员节 | 爸妈的第一个AI作品",
    category: "Media & Entertainment",
    description: "当程序员节遇见重阳节，京东电脑联合制作「爸妈的第一个AI作品」，用科技温情满满地连接两代人",
    fullDescription: `为1023重阳节暨1024程序员节，京东3C电脑自策划重阳节AI作品《爸妈的第一个AI作品》联合两个节日一起，让AI赋能年轻程序员们回馈父母。

通过《爸妈的第一个AI作品》在京东电脑人群中科技感和社会性话题爆发，让年轻人购买个新本本带回家给爷爷奶奶们一起体验AI智能化的新浪潮，让程序员和父辈们一起感受科技，有见程序员节这一年都很难回家的天职，有消费京东电脑社会责任感`,
    challenge: "",
    solution:
      "H2端AI结合宣传的广大用户群体跨代沟通，在为指导长辈们了解新兴数字科技被输出支持，比心生活上的温情陪伴，多平台三端传播矩阵亮点",
    results: {
      engagement: "+180%",
      reach: "+600%",
      conversion: "+150%",
      contentVolume: "+800%",
      costReduction: "-60%",
    },
    image: "/cases/京东1024程序员节.png",
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
  const caseStudy = caseStudies[params.id as keyof typeof caseStudies];
  const [heroRef, heroIsVisible] = useOnScreen({ threshold: 0.1 });
  const [contentRef, contentIsVisible] = useOnScreen({ threshold: 0.1 });

  if (!caseStudy) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroIsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/cases"
              className="inline-flex items-center space-x-2 text-brand-red hover:text-red-400 transition-colors mb-8"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Cases</span>
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <span className="px-4 py-2 bg-brand-red/20 text-brand-red rounded-full text-sm font-semibold">
                    {caseStudy.category}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-400">{caseStudy.timeline}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-400">{caseStudy.team}</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold mb-6">{caseStudy.title}</h1>

                <p className="text-xl text-gray-300 mb-8 leading-relaxed">{caseStudy.fullDescription}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{caseStudy.results.engagement}</div>
                    <div className="text-sm text-gray-400">Engagement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{caseStudy.results.reach}</div>
                    <div className="text-sm text-gray-400">Reach</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{caseStudy.results.conversion}</div>
                    <div className="text-sm text-gray-400">Conversion</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{caseStudy.results.costReduction}</div>
                    <div className="text-sm text-gray-400">Cost Reduction</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div
                  className={`aspect-square bg-gradient-to-br ${caseStudy.color} rounded-2xl p-8 flex items-center justify-center`}
                >
                  <Image
                    src={caseStudy.image}
                    alt={caseStudy.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section ref={contentRef} className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="grid md:grid-cols-3 gap-12"
            initial={{ opacity: 0, y: 30 }}
            animate={contentIsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Challenge */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">The Challenge</h3>
              <p className="text-gray-300 leading-relaxed">{caseStudy.challenge}</p>
            </div>

            {/* Solution */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Our Solution</h3>
              <p className="text-gray-300 leading-relaxed">{caseStudy.solution}</p>
            </div>

            {/* Results */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">The Results</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-red rounded-full"></div>
                  <span className="text-gray-300">Content volume increased by {caseStudy.results.contentVolume}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-red rounded-full"></div>
                  <span className="text-gray-300">Engagement rates improved by {caseStudy.results.engagement}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-red rounded-full"></div>
                  <span className="text-gray-300">Conversion rates increased by {caseStudy.results.conversion}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-red rounded-full"></div>
                  <span className="text-gray-300">Marketing costs reduced by {caseStudy.results.costReduction}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="text-center mt-16 p-8 bg-gray-800/50 rounded-2xl border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={contentIsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Achieve Similar Results?</h3>
            <p className="text-gray-300 mb-6">
              Let&apos;s discuss how we can help your business scale with AI-powered content creation
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-brand-red to-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Start Your Project
              </Link>
              <Link
                href="/cases"
                className="border border-white/20 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                View More Cases
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
