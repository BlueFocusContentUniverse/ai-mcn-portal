"use client";

import { motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface VideoThumbnail {
  id: string;
  videoUrl: string;
  textColor: string;
  posterUrl?: string;
}

interface VideoGalleryProps {
  className?: string;
}

export function VideoGallery({ className = "" }: VideoGalleryProps) {
  const { i18n } = useTranslation();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [playingVideos, setPlayingVideos] = useState<Set<string>>(new Set());
  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const videoThumbnails: VideoThumbnail[] = useMemo(() => {
    const isEnglish = i18n.language?.toLowerCase().startsWith("en");
    if (isEnglish) {
      return [
        { id: "video-1", videoUrl: "/video/gallery/6.mp4", textColor: "text-white", posterUrl: "/placeholder.jpg" },
        { id: "lang-1", videoUrl: "/video/gallery/lang-1.mp4", textColor: "text-white", posterUrl: "/placeholder.jpg" },
        { id: "lang-2", videoUrl: "/video/gallery/lang-2.mp4", textColor: "text-white", posterUrl: "/placeholder.jpg" },
        { id: "lang-3", videoUrl: "/video/gallery/lang-3.mp4", textColor: "text-white", posterUrl: "/placeholder.jpg" },
        { id: "lang-4", videoUrl: "/video/gallery/lang-4.mp4", textColor: "text-white", posterUrl: "/placeholder.jpg" },
        {
          id: "video-7",
          videoUrl: "/video/gallery/7.mp4",
          textColor: "text-purple-500",
          posterUrl: "/placeholder.jpg",
        },
      ];
    }
    return [
      { id: "video-1", videoUrl: "/video/gallery/1.mp4", textColor: "text-white", posterUrl: "/placeholder.jpg" },
      { id: "video-2", videoUrl: "/video/gallery/2.mp4", textColor: "text-white", posterUrl: "/placeholder.jpg" },
      { id: "video-3", videoUrl: "/video/gallery/3.mp4", textColor: "text-orange-500", posterUrl: "/placeholder.jpg" },
      { id: "video-4", videoUrl: "/video/gallery/4.mp4", textColor: "text-green-500", posterUrl: "/placeholder.jpg" },
      { id: "video-5", videoUrl: "/video/gallery/5.mp4", textColor: "text-orange-500", posterUrl: "/placeholder.jpg" },
      { id: "video-6", videoUrl: "/video/gallery/6.mp4", textColor: "text-purple-500", posterUrl: "/placeholder.jpg" },
      { id: "video-7", videoUrl: "/video/gallery/7.mp4", textColor: "text-purple-500", posterUrl: "/placeholder.jpg" },
    ];
  }, [i18n.language]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const videoId = entry.target.getAttribute("data-video-id");
            if (videoId) {
              setLoadedVideos((prev) => {
                if (prev.has(videoId)) return prev;
                const next = new Set(prev);
                next.add(videoId);
                return next;
              });
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
      },
    );

    observerRef.current = observer;

    // Observe any existing items already rendered before this effect runs
    const nodes = containerRef.current?.querySelectorAll<HTMLElement>("[data-video-id]") ?? [];
    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  // Simulate backend loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleVideoClick = (videoId: string) => {
    setSelectedVideo(videoId);
  };

  const handleVideoPlay = (videoId: string) => {
    setPlayingVideos((prev) => new Set(prev).add(videoId));
  };

  const handleVideoPause = (videoId: string) => {
    setPlayingVideos((prev) => {
      const newSet = new Set(prev);
      newSet.delete(videoId);
      return newSet;
    });
  };

  const handleVideoLoad = (videoId: string) => {
    setLoadedVideos((prev) => new Set(prev).add(videoId));
  };

  if (isLoading) {
    return (
      <section className={`pb-16 px-4 sm:px-6 lg:px-8 ${className}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-4 overflow-x-auto pb-4">
            {[...Array(7)].map((_, index) => (
              <div key={index} className="flex-shrink-0 w-64 h-96 relative">
                <div className="w-full h-full rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`pb-16 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          {/* Gradient overlays for left and right edges */}
          <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Video container */}
          <div ref={containerRef} className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {videoThumbnails.map((video, index) => (
              <motion.div
                key={video.id}
                ref={(el) => {
                  if (el && observerRef.current) {
                    observerRef.current.observe(el);
                  }
                }}
                data-video-id={video.id}
                className="flex-shrink-0 w-64 h-96 relative group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleVideoClick(video.id)}
              >
                {/* Video with lazy loading */}
                <div className="w-full h-full rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800 relative">
                  {loadedVideos.has(video.id) ? (
                    <video
                      src={video.videoUrl}
                      poster={video.posterUrl}
                      className="w-full h-full object-cover"
                      disableRemotePlayback
                      playsInline
                      autoPlay
                      muted
                      loop
                      preload="metadata"
                      onPlay={() => handleVideoPlay(video.id)}
                      onPause={() => handleVideoPause(video.id)}
                      onLoadedData={() => handleVideoLoad(video.id)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white" />
                    </div>
                  )}

                  {/* Play button overlay - only show when video is not playing */}
                  {!playingVideos.has(video.id) && loadedVideos.has(video.id) && (
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Video modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300"
            >
              ×
            </button>
            <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
              <div className="aspect-video bg-gray-200 dark:bg-gray-800">
                <video
                  src={videoThumbnails.find((v) => v.id === selectedVideo)?.videoUrl}
                  className="w-full h-full"
                  controls
                  disableRemotePlayback
                  playsInline
                  autoPlay
                  preload="auto"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
