"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  delay?: number;
  className?: string;
  format?: (value: number) => string;
  prefix?: string;
  suffix?: string;
  onComplete?: () => void;
  triggerOnVisible?: boolean;
}

export function AnimatedNumber({
  value,
  duration = 2,
  delay = 0,
  className = "",
  format = (val) => val.toString(),
  prefix = "",
  suffix = "",
  onComplete,
  triggerOnVisible = false,
}: AnimatedNumberProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const startAnimation = () => {
    if (hasTriggered) return;

    setHasTriggered(true);
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (value - startValue) * easeOutQuart;

      count.set(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        count.set(value);
        if (onComplete) {
          onComplete();
        }
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (triggerOnVisible) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasTriggered) {
            const timer = setTimeout(() => {
              startAnimation();
            }, delay);
            return () => clearTimeout(timer);
          }
        },
        { threshold: 0.1 },
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    } else {
      const timer = setTimeout(() => {
        startAnimation();
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [value, duration, delay, count, onComplete, triggerOnVisible, hasTriggered]);

  const formattedValue = useTransform(rounded, (latest) => {
    const formatted = format(latest);
    return `${prefix}${formatted}${suffix}`;
  });

  return (
    <motion.span ref={ref} className={className}>
      {formattedValue}
    </motion.span>
  );
}
