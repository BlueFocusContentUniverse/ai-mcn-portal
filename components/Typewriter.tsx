"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface TypewriterProps {
  texts: string | string[];
  speed?: number;
  delay?: number;
  cycleDelay?: number;
  className?: string;
  onComplete?: () => void;
  pauseOnHover?: boolean;
}

export function Typewriter({
  texts,
  speed = 100,
  delay = 0,
  cycleDelay = 3000,
  className = "",
  onComplete,
  pauseOnHover = false,
}: TypewriterProps) {
  const { i18n } = useTranslation();
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const textArray = Array.isArray(texts) ? texts : [texts];
  const currentText = textArray[currentTextIndex];

  // Reset function to reset typewriter to initial state
  const resetTypewriter = useCallback(() => {
    setDisplayText("");
    setCurrentIndex(0);
    setIsTyping(false);
    setCurrentTextIndex(0);
    setIsDeleting(false);
    setIsPaused(false);
  }, []);

  // Listen for language changes and reset typewriter
  useEffect(() => {
    const handleLanguageChange = () => {
      resetTypewriter();
    };

    // Listen for language change events
    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n, resetTypewriter]);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (!currentText) return;

    const timer = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [currentText, delay]);

  useEffect(() => {
    if (!isTyping || isPaused) return;

    if (isDeleting) {
      // Deleting text
      if (currentIndex <= 0) {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
        setCurrentIndex(0);
        setDisplayText("");
        return;
      }

      const timer = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
        setCurrentIndex((prev) => prev - 1);
      }, speed / 3);

      return () => clearTimeout(timer);
    } else {
      // Typing text
      if (currentIndex >= currentText.length) {
        // Finished typing current text
        if (textArray.length > 1) {
          // If we have multiple texts, start deleting after a delay
          const timer = setTimeout(() => {
            setIsDeleting(true);
          }, cycleDelay);

          return () => clearTimeout(timer);
        } else {
          // Single text, call onComplete
          if (onComplete) {
            onComplete();
          }
          return;
        }
      }

      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + currentText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, currentText, speed, isTyping, isDeleting, textArray.length, cycleDelay, onComplete, isPaused]);

  return (
    <motion.div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={`${currentTextIndex}-${i18n.language}`}
          className={className}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {displayText}
          <motion.span
            className="animate-blink"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
          >
            |
          </motion.span>
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}
