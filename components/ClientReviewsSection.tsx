"use client";

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

interface Review {
  quote: string;
  author: string;
}

interface ClientReviewsSectionProps {
  className?: string;
}

export function ClientReviewsSection({ className = "" }: ClientReviewsSectionProps) {
  const [reviewsRef, reviewsIsVisible] = useOnScreen({ threshold: 0.1 });

  const reviews: Review[] = [
    {
      quote:
        "Tomato Planet transformed our content strategy completely. We're now producing 5x more content with better quality and engagement.",
      author: "John Sun, CATL",
    },
    {
      quote:
        "The ROI tracking and analytics are incredible. We can see exactly how our content performs across all channels.",
      author: "Sarah Zhang, TECNO",
    },
    {
      quote: "The custom content generation is amazing. Every piece feels unique and perfectly aligned with our brand.",
      author: "Mike Li, HONOR",
    },
  ];

  return (
    <section
      ref={reviewsRef}
      className={`py-24 transition-opacity duration-1000 ${reviewsIsVisible ? "opacity-100" : "opacity-0"} ${className}`}
    >
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="section-title">
          <span className="section-gradient-text">From Our Partners</span>
        </h2>
      </div>
      <div className="scrolling-reviews">
        <div className="scrolling-reviews-track">
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">&ldquo;{review.quote}&rdquo;</p>
              <p className="font-semibold text-gray-900 dark:text-white">{review.author}</p>
            </div>
          ))}
          {/* Duplicate for seamless scroll */}
          {reviews.map((review, index) => (
            <div key={`dup-${index}`} className="review-card">
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">&ldquo;{review.quote}&rdquo;</p>
              <p className="font-semibold text-gray-900 dark:text-white">{review.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
