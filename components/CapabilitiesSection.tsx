"use client";

import { BarChart3, Cpu, Eye, Layers, Network, Settings, Share2, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface CapabilitiesSectionProps {
  className?: string;
  autoPlayInterval?: number; // in milliseconds
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

export function CapabilitiesSection({ className = "", autoPlayInterval = 5000 }: CapabilitiesSectionProps) {
  const { t } = useTranslation(["home"]);
  const [capabilitiesRef, capabilitiesIsVisible] = useOnScreen({ threshold: 0.1 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const capabilities = [
    {
      id: "creative",
      title: t("capabilities.creative.title"),
      desc: t("capabilities.creative.desc"),
      items: [
        { icon: Eye, text: "Global Trend Capture", color: "text-brand-red" },
        { icon: Settings, text: "Content Personalization", color: "text-brand-red" },
        { icon: Network, text: "MCP + API Integration", color: "text-brand-red" },
      ],
      visual: { icon: Eye, bgClass: "bg-gradient-to-br from-brand-red/20 to-red-500/20", iconColor: "text-brand-red" },
    },
    {
      id: "operational",
      title: t("capabilities.operational.title"),
      desc: t("capabilities.operational.desc"),
      items: [
        { icon: Cpu, text: "Data-Driven Evolution", color: "text-white" },
        { icon: BarChart3, text: "Advanced Analytics Dashboard", color: "text-white" },
        { icon: Layers, text: "Multi-layered Optimization", color: "text-white" },
      ],
      visual: { icon: Cpu, bgClass: "bg-gradient-to-br from-white/10 to-white/5", iconColor: "text-white" },
    },
    {
      id: "publishing",
      title: t("capabilities.publishing.title"),
      desc: t("capabilities.publishing.desc"),
      items: [
        { icon: Share2, text: "One-Click Multi-Platform", color: "text-red-400" },
        { icon: Users, text: "Elastic Account Pool", color: "text-red-400" },
        { icon: Settings, text: "Custom Integration", color: "text-red-400" },
      ],
      visual: { icon: Share2, bgClass: "bg-gradient-to-br from-red-400/20 to-red-600/20", iconColor: "text-red-400" },
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % capabilities.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, capabilities.length]);

  // Pause auto-play when user interacts
  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 3 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const nextSlide = () => {
    handleSlideChange((currentSlide + 1) % capabilities.length);
  };

  const prevSlide = () => {
    handleSlideChange((currentSlide - 1 + capabilities.length) % capabilities.length);
  };

  return (
    <section
      ref={capabilitiesRef}
      className={`py-24 transition-opacity duration-1000 ${capabilitiesIsVisible ? "opacity-100" : "opacity-0"} ${className}`}
    >
      <div className="max-w-7xl mx-auto text-center mb-16 px-4">
        <h2 className="section-title">
          <span className="section-gradient-text">{t("capabilities.title")}</span>
        </h2>
        <p className="section-subtitle">{t("capabilities.subtitle")}</p>
      </div>

      {/* Carousel Container */}
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Carousel Slides */}
        <div className="relative overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {capabilities.map((capability, index) => (
              <div key={capability.id} className="w-full flex-shrink-0">
                <div className="grid md:grid-cols-2 gap-8 items-center min-h-[400px]">
                  <div className="p-8">
                    <h3 className="capability-title">{capability.title}</h3>
                    <p className="capability-desc">{capability.desc}</p>
                    <ul className="mt-8 space-y-4">
                      {capability.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="capability-item">
                          <item.icon className={`w-6 h-6 mr-4 ${item.color}`} />
                          {item.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`capability-visual ${capability.visual.bgClass}`}>
                    <capability.visual.icon className={`w-32 h-32 ${capability.visual.iconColor} opacity-50`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/10 dark:bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200 rounded-full p-3 text-gray-900 dark:text-white"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/10 dark:bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200 rounded-full p-3 text-gray-900 dark:text-white"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {capabilities.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-brand-red scale-125" : "bg-black/30 dark:bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
