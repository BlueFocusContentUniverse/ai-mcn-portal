"use client";

import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Cpu,
  Database,
  Eye,
  Globe,
  Layers,
  Mouse,
  Network,
  Play,
  Settings,
  Share2,
  Shield,
  UserPlus,
  Users,
  Video,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import LanguageSwitcher from "@/components/LanguageSwitcher";
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
  const [introRef, introIsVisible] = useOnScreen({ threshold: 0.1 });
  const [capabilitiesRef, capabilitiesIsVisible] = useOnScreen({ threshold: 0.1 });
  const [casesRef, casesIsVisible] = useOnScreen({ threshold: 0.1 });
  const [reviewsRef, reviewsIsVisible] = useOnScreen({ threshold: 0.1 });
  const [securityRef, securityIsVisible] = useOnScreen({ threshold: 0.1 });
  const [joinRef, joinIsVisible] = useOnScreen({ threshold: 0.1 });

  return (
    <div className="min-h-screen bg-brand-black text-brand-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-black/30 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <Image src="/logo.png" alt="AI MCN Logo" width={40} height={40} className="animate-pulse" />
              <span className="text-2xl font-bold bg-gradient-to-r from-brand-red to-red-400 bg-clip-text text-transparent">
                Tomato Planet
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#capabilities" className="nav-link">
                {t("nav.capabilities", { ns: "navigation" })}
              </Link>
              <Link href="#cases" className="nav-link">
                {t("nav.cases", { ns: "navigation" })}
              </Link>
              <Link href="#about" className="nav-link">
                {t("nav.about", { ns: "navigation" })}
              </Link>
              <LanguageSwitcher />
              <Button className="cta-button">
                {t("nav.getStarted", { ns: "navigation" })} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="h-[calc(100vh-5rem)] flex items-center justify-center relative overflow-hidden"
        >
          <div className="aurora-background"></div>
          <div className="text-center z-10 px-4">
            <h1 className="text-5xl md:text-8xl font-bold mb-6 text-shadow-glow">
              <div className="animate-text-reveal [animation-delay:0.2s]">
                <span className="hero-gradient-text">{t("hero.title")}</span>
              </div>
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto animate-fade-in-up [animation-delay:1s]">
              {t("hero.subtitle")}
            </p>
            <div className="animate-fade-in-up [animation-delay:1.2s]">
              <Button size="lg" className="cta-button text-lg px-8 py-6">
                {t("hero.cta")}
                <Play className="ml-3 w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 animate-fade-in [animation-delay:1.5s]">
            <span className="text-sm text-gray-400">{t("hero.scroll")}</span>
            <Mouse className="w-6 h-6 text-gray-400 animate-bounce" />
          </div>
        </section>

        {/* Intro Section */}
        <section
          ref={introRef}
          className={`py-24 px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ${introIsVisible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Video,
                title: t("features.batchProduction.title"),
                desc: t("features.batchProduction.desc"),
                delay: "200ms",
              },
              {
                icon: Settings,
                title: t("features.pipeline.title"),
                desc: t("features.pipeline.desc"),
                delay: "400ms",
              },
              {
                icon: Globe,
                title: t("features.distribution.title"),
                desc: t("features.distribution.desc"),
                delay: "600ms",
              },
              {
                icon: Database,
                title: t("features.management.title"),
                desc: t("features.management.desc"),
                delay: "800ms",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`glass-card animate-fade-in-up ${introIsVisible ? "is-visible" : ""}`}
                style={{ animationDelay: feature.delay }}
              >
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-brand-red to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 icon-glow">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Capabilities Section - Horizontal Scroll */}
        <section
          ref={capabilitiesRef}
          className={`py-24 transition-opacity duration-1000 ${capabilitiesIsVisible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="max-w-7xl mx-auto text-center mb-16 px-4">
            <h2 className="section-title">
              <span className="section-gradient-text">{t("capabilities.title")}</span>
            </h2>
            <p className="section-subtitle">{t("capabilities.subtitle")}</p>
          </div>
          <div className="horizontal-scroll-container">
            <div className="flex">
              {/* Creative */}
              <div className="horizontal-scroll-section">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="p-8">
                    <h3 className="capability-title">{t("capabilities.creative.title")}</h3>
                    <p className="capability-desc">{t("capabilities.creative.desc")}</p>
                    <ul className="mt-8 space-y-4">
                      <li className="capability-item">
                        <Eye className="w-6 h-6 mr-4 text-brand-red" /> Global Trend Capture
                      </li>
                      <li className="capability-item">
                        <Settings className="w-6 h-6 mr-4 text-brand-red" /> Content Personalization
                      </li>
                      <li className="capability-item">
                        <Network className="w-6 h-6 mr-4 text-brand-red" /> MCP + API Integration
                      </li>
                    </ul>
                  </div>
                  <div className="capability-visual bg-gradient-to-br from-brand-red/20 to-red-500/20">
                    <Eye className="w-32 h-32 text-brand-red opacity-50" />
                  </div>
                </div>
              </div>
              {/* Operational */}
              <div className="horizontal-scroll-section">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="p-8">
                    <h3 className="capability-title">{t("capabilities.operational.title")}</h3>
                    <p className="capability-desc">{t("capabilities.operational.desc")}</p>
                    <ul className="mt-8 space-y-4">
                      <li className="capability-item">
                        <Cpu className="w-6 h-6 mr-4 text-white" /> Data-Driven Evolution
                      </li>
                      <li className="capability-item">
                        <BarChart3 className="w-6 h-6 mr-4 text-white" /> Advanced Analytics Dashboard
                      </li>
                      <li className="capability-item">
                        <Layers className="w-6 h-6 mr-4 text-white" /> Multi-layered Optimization
                      </li>
                    </ul>
                  </div>
                  <div className="capability-visual bg-gradient-to-br from-white/10 to-white/5">
                    <Cpu className="w-32 h-32 text-white opacity-50" />
                  </div>
                </div>
              </div>
              {/* Publishing */}
              <div className="horizontal-scroll-section">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="p-8">
                    <h3 className="capability-title">{t("capabilities.publishing.title")}</h3>
                    <p className="capability-desc">{t("capabilities.publishing.desc")}</p>
                    <ul className="mt-8 space-y-4">
                      <li className="capability-item">
                        <Share2 className="w-6 h-6 mr-4 text-red-400" /> One-Click Multi-Platform
                      </li>
                      <li className="capability-item">
                        <Users className="w-6 h-6 mr-4 text-red-400" /> Elastic Account Pool
                      </li>
                      <li className="capability-item">
                        <Settings className="w-6 h-6 mr-4 text-red-400" /> Custom Integration
                      </li>
                    </ul>
                  </div>
                  <div className="capability-visual bg-gradient-to-br from-red-400/20 to-red-600/20">
                    <Share2 className="w-32 h-32 text-red-400 opacity-50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
                metric: "+500%",
                desc: "Content Volume Increase",
                delay: "200ms",
              },
              {
                title: "Tech Startup Y",
                metric: "+250%",
                desc: "Engagement Rate Uplift",
                delay: "400ms",
              },
              {
                title: "Media Company Z",
                metric: "-70%",
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
                  <p className="text-lg font-semibold text-gray-300 mb-4">{caseStudy.title}</p>
                  <p className="text-6xl font-bold text-white mb-2 case-study-metric">{caseStudy.metric}</p>
                  <p className="text-gray-400">{caseStudy.desc}</p>
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
                  <p className="text-lg text-gray-300 mb-6">"{review.quote}"</p>
                  <p className="font-semibold text-white">{review.author}</p>
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
                  <p className="text-lg text-gray-300 mb-6">"{review.quote}"</p>
                  <p className="font-semibold text-white">{review.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section
          ref={securityRef}
          className={`py-24 px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ${securityIsVisible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="w-16 h-16 text-white mx-auto mb-8" />
            <h2 className="section-title mb-6">
              <span className="section-gradient-text">Enterprise-Grade Security</span>
            </h2>
            <p className="section-subtitle mb-8">
              Your data and brand assets are protected by comprehensive, industry-leading security protocols.
            </p>
            <div className="flex justify-center space-x-8 text-gray-400">
              <span className="font-semibold">SOC 2 Type II</span>
              <span className="font-semibold">GDPR</span>
              <span className="font-semibold">ISO 27001</span>
              <span className="font-semibold">CCPA</span>
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
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Join the Content Revolution</h2>
                <p className="text-xl text-gray-300 mb-10">
                  Whether you're a creator looking to monetize or a brand ready to scale, your journey starts here.
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-6">
                  <Button size="lg" className="cta-button-secondary">
                    <UserPlus className="mr-3" /> Apply as a Creator
                  </Button>
                  <Button size="lg" className="cta-button">
                    <Briefcase className="mr-3" /> Partner as a Brand
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center space-x-3">
              <Image src="/logo.png" alt="AI MCN Logo" width={32} height={32} />
              <span className="text-xl font-bold text-white">Tomato Planet</span>
            </div>
            <div className="flex space-x-8">
              <Link href="#about" className="nav-link">
                {t("nav.about", { ns: "navigation" })}
              </Link>
              <Link href="#security" className="nav-link">
                {t("nav.security", { ns: "navigation" })}
              </Link>
              <Link href="#contact" className="nav-link">
                {t("nav.contact", { ns: "navigation" })}
              </Link>
            </div>
            <p className="text-gray-500">&copy; 2024 Tomato Planet. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
