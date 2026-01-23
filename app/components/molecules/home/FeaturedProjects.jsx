"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { getAspectRatioClass } from "@/lib/utils";

export default function FeaturedProjects({
    projects = [],
    className = "",
    as: Component = "section", // Allow polymorphic rendering
    breakpoint = 1024,
    fallbackProjects = [
        {
            id: "fallback-1",
            title: "Slide 1 - Golden Ratio",
            asset: {
                url: "https://placehold.co/1618x1000/2d3748/f7fafc?text=Golden+Ratio",
                contentType: "image/jpeg",
                width: 1618,
                height: 1000,
            },
            type: "Image",
            aspectRatio: "Golden",
            altText: "Placeholder golden ratio image",
        },
        {
            id: "fallback-2",
            title: "Slide 2 - Cinema",
            asset: {
                url: "https://placehold.co/1850x1000/4a5568/f7fafc?text=Cinema+1.85",
                contentType: "image/jpeg",
                width: 1850,
                height: 1000,
            },
            type: "Image",
            aspectRatio: "Cinema 1.85",
            altText: "Placeholder cinema aspect ratio image",
        },
        {
            id: "fallback-3",
            title: "Slide 3 - Portrait",
            asset: {
                url: "https://placehold.co/1000x1618/718096/f7fafc?text=Golden+Portrait",
                contentType: "image/jpeg",
                width: 1000,
                height: 1618,
            },
            type: "Image",
            aspectRatio: "Golden Portrait",
            altText: "Placeholder portrait image",
        },
        {
            id: "fallback-4",
            title: "Slide 4 - Square",
            asset: {
                url: "https://placehold.co/1000x1000/2b6cb0/f7fafc?text=Square",
                contentType: "image/jpeg",
                width: 1000,
                height: 1000,
            },
            type: "Image",
            aspectRatio: "Square",
            altText: "Placeholder square image",
        },
    ],
}) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const [viewportDetected, setViewportDetected] = useState(false);
    const [isMobileViewport, setIsMobileViewport] = useState(false);
    const [mediaLoadedStates, setMediaLoadedStates] = useState({});
    const carouselRef = useRef(null);
    const announceRef = useRef(null);
    const videoRefs = useRef({});
    const cleanupTimerRef = useRef(null);
    const navigationThrottleRef = useRef(false);

    const slides = projects.length > 0 ? projects : fallbackProjects;

    // Helper to select the appropriate asset based on viewport and availability
    const getAssetForSlide = useCallback(
        (slide) => {
            // Use mobile asset if viewport is mobile AND mobile asset exists
            const useMobileAsset = isMobileViewport && slide.mobileAsset;

            return {
                asset: useMobileAsset ? slide.mobileAsset : slide.asset,
                type: useMobileAsset ? slide.mobileType : slide.type,
                aspectRatio: useMobileAsset
                    ? slide.mobileAspectRatio || slide.aspectRatio
                    : slide.aspectRatio,
                imageBlurDataUrl: useMobileAsset
                    ? slide.mobileImageBlurDataUrl
                    : slide.imageBlurDataUrl,
                posterBlurDataUrl: useMobileAsset
                    ? slide.mobilePosterBlurDataUrl
                    : slide.posterBlurDataUrl,
                optimizedUrl: useMobileAsset
                    ? slide.mobileOptimizedUrl
                    : slide.optimizedUrl,
            };
        },
        [isMobileViewport],
    );

    // Helper to check if a slide should be rendered (current + 2 before + 2 after)
    const shouldRenderSlide = useCallback(
        (index) => {
            // Calculate indices with wrapping (current + 1 before + 1 after = 3 slides)
            const prev1 = (currentSlide - 1 + slides.length) % slides.length;
            const next1 = (currentSlide + 1) % slides.length;

            return index === currentSlide || index === prev1 || index === next1;
        },
        [currentSlide, slides.length],
    );

    const goToPrevious = useCallback(() => {
        // Throttle navigation to prevent rapid clicking crashes
        if (navigationThrottleRef.current) return;
        navigationThrottleRef.current = true;
        setTimeout(() => {
            navigationThrottleRef.current = false;
        }, 100); // 100ms throttle

        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }, [slides.length]);

    const goToNext = useCallback(() => {
        // Throttle navigation to prevent rapid clicking crashes
        if (navigationThrottleRef.current) return;
        navigationThrottleRef.current = true;
        setTimeout(() => {
            navigationThrottleRef.current = false;
        }, 100); // 100ms throttle

        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, [slides.length]);

    const handleVideoCanPlay = useCallback((slideId) => {
        setMediaLoadedStates((prev) => ({ ...prev, [slideId]: true }));
    }, []);

    const handleImageLoad = useCallback((slideId) => {
        setMediaLoadedStates((prev) => ({ ...prev, [slideId]: true }));
    }, []);

    // Reset loaded states for slides that are no longer rendered
    // Debounced to prevent excessive setState calls during rapid navigation
    useEffect(() => {
        // Clear any existing timer
        if (cleanupTimerRef.current) {
            clearTimeout(cleanupTimerRef.current);
        }

        // Debounce cleanup by 300ms - only run after navigation settles
        cleanupTimerRef.current = setTimeout(() => {
            setMediaLoadedStates((prevStates) => {
                const newStates = { ...prevStates };

                // Clear loaded state for any slide not currently in render range
                Object.keys(newStates).forEach((slideId) => {
                    const slideIndex = slides.findIndex(
                        (s) => s.id === slideId,
                    );
                    if (slideIndex !== -1 && !shouldRenderSlide(slideIndex)) {
                        delete newStates[slideId];
                    }
                });

                return newStates;
            });
        }, 300);

        // Cleanup timer on unmount
        return () => {
            if (cleanupTimerRef.current) {
                clearTimeout(cleanupTimerRef.current);
            }
        };
    }, [currentSlide, slides, shouldRenderSlide]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key) {
                case "ArrowLeft":
                    e.preventDefault();
                    goToPrevious();
                    break;
                case "ArrowRight":
                    e.preventDefault();
                    goToNext();
                    break;
                case "Home":
                    e.preventDefault();
                    setCurrentSlide(0);
                    break;
                case "End":
                    e.preventDefault();
                    setCurrentSlide(slides.length - 1);
                    break;
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [goToPrevious, goToNext, slides.length]);

    // Announce slide changes
    useEffect(() => {
        if (announceRef.current) {
            announceRef.current.textContent = `Slide ${currentSlide + 1} of ${slides.length}`;
        }
    }, [currentSlide, slides.length]);

    // Set mounted state after hydration and detect viewport
    useEffect(() => {
        setIsMounted(true);

        // Detect viewport size on mount (mount-only, no resize handling)
        if (typeof window !== "undefined") {
            const mediaQuery = window.matchMedia(
                `(max-width: ${breakpoint - 1}px)`,
            );
            setIsMobileViewport(mediaQuery.matches);
            setViewportDetected(true);
        }
    }, [breakpoint]);

    // Manage video playback - only play current slide
    useEffect(() => {
        Object.keys(videoRefs.current).forEach((slideId) => {
            const video = videoRefs.current[slideId];
            const slideIndex = slides.findIndex((s) => s.id === slideId);
            if (video) {
                if (slideIndex === currentSlide) {
                    video.currentTime = 0; // Reset to beginning
                    video.play().catch(() => {}); // Ignore autoplay failures
                } else {
                    video.pause();
                }
            }
        });
    }, [currentSlide, slides, viewportDetected]);

    // Clean up video refs for slides no longer rendered (prevents memory leaks)
    useEffect(() => {
        Object.keys(videoRefs.current).forEach((slideId) => {
            const slideIndex = slides.findIndex((s) => s.id === slideId);
            if (slideIndex === -1 || !shouldRenderSlide(slideIndex)) {
                const video = videoRefs.current[slideId];
                if (video) {
                    video.pause();
                    video.src = ""; // Release video memory
                    video.load(); // Force browser to release resources
                    delete videoRefs.current[slideId];
                }
            }
        });
    }, [currentSlide, slides, shouldRenderSlide]);

    return (
        <Component
            ref={carouselRef}
            role={Component === "main" ? undefined : "region"}
            aria-roledescription={Component === "main" ? undefined : "carousel"}
            aria-label="Featured work slideshow"
            className={`relative h-full w-full overflow-hidden ${className}`}
            data-block={
                Component === "main" ? "home-content" : "featured-projects"
            }
        >
            {/* Screen reader announcement */}
            <div
                ref={announceRef}
                className="sr-only"
                aria-live="polite"
                aria-atomic="true"
            />

            {/* Slide content */}
            {slides.map((slide, index) => {
                // Wait for viewport detection before rendering to prevent flash
                if (!viewportDetected) {
                    return null;
                }

                // Only conditionally remove slides after hydration to avoid mismatch
                if (isMounted && !shouldRenderSlide(index)) {
                    return null;
                }

                // Get the appropriate asset based on viewport
                const {
                    asset,
                    type,
                    aspectRatio,
                    imageBlurDataUrl,
                    posterBlurDataUrl,
                    optimizedUrl,
                } = getAssetForSlide(slide);

                return (
                    <div
                        key={slide.id}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`Slide ${index + 1} of ${slides.length}`}
                        aria-hidden={index !== currentSlide}
                        className={`absolute inset-[0] z-0 flex h-full w-full items-center justify-center ${
                            index === currentSlide ? "" : "hidden"
                        }`}
                    >
                        <div
                            className={`${getAspectRatioClass(aspectRatio)} relative max-h-full w-full overflow-hidden`}
                        >
                            {type === "Image" ? (
                                <div className="absolute inset-[0] flex items-center justify-center">
                                    {/* SVG blur placeholder - renders immediately with same dimensions as final image */}
                                    {imageBlurDataUrl && (
                                        <img
                                            src={imageBlurDataUrl}
                                            alt=""
                                            width={asset.width}
                                            height={asset.height}
                                            decoding="async"
                                            className={`rounded-base absolute mx-auto h-full w-auto object-contain transition-opacity duration-500 ${
                                                mediaLoadedStates[slide.id]
                                                    ? "opacity-0"
                                                    : "opacity-100"
                                            }`}
                                            aria-hidden="true"
                                        />
                                    )}

                                    {/* Actual image - reveals progressively over blur */}
                                    <Image
                                        src={(() => {
                                            const url =
                                                optimizedUrl || asset.url;
                                            return url.startsWith("http")
                                                ? url
                                                : `https:${url}`;
                                        })()}
                                        alt={slide.altText}
                                        width={asset.width}
                                        height={asset.height}
                                        quality={100}
                                        className="rounded-base relative mx-auto h-full w-auto object-contain"
                                        priority={index === currentSlide}
                                        onLoad={() => handleImageLoad(slide.id)}
                                        sizes="(max-width: 640px) 95vw, (max-width: 1024px) 85vw, (max-width: 1440px) 75vw, 70vw"
                                    />
                                </div>
                            ) : type === "Video" ? (
                                <div className="absolute inset-[0] flex items-center justify-center">
                                    {/* SVG blur placeholder - renders immediately with same dimensions as video */}
                                    {posterBlurDataUrl && (
                                        <img
                                            src={posterBlurDataUrl}
                                            alt=""
                                            width={asset.width}
                                            height={asset.height}
                                            decoding="async"
                                            className={`rounded-base absolute mx-auto h-full w-auto object-contain transition-opacity duration-500 ${
                                                mediaLoadedStates[slide.id]
                                                    ? "opacity-0"
                                                    : "opacity-100"
                                            }`}
                                            aria-hidden="true"
                                        />
                                    )}

                                    {/* Actual video - reveals progressively over blur */}
                                    <video
                                        ref={(el) => {
                                            if (el) {
                                                videoRefs.current[slide.id] =
                                                    el;
                                                // Safari may have video cached and ready - check readyState
                                                // Only set loaded state if not already set (prevent infinite loop)
                                                if (
                                                    el.readyState >= 3 &&
                                                    !mediaLoadedStates[slide.id]
                                                ) {
                                                    handleVideoCanPlay(
                                                        slide.id,
                                                    );
                                                }
                                            }
                                        }}
                                        src={
                                            index === currentSlide
                                                ? asset.url.startsWith("http")
                                                    ? asset.url
                                                    : `https:${asset.url}`
                                                : undefined
                                        }
                                        onCanPlay={() =>
                                            handleVideoCanPlay(slide.id)
                                        }
                                        className="rounded-base relative mx-auto h-full w-auto object-contain"
                                        muted
                                        loop
                                        playsInline
                                        disablePictureInPicture
                                        disableRemotePlayback
                                        preload="auto"
                                    />
                                </div>
                            ) : null}
                        </div>
                    </div>
                );
            })}

            {/* Navigation overlay */}
            <div className="absolute inset-[0] z-10 flex">
                <button
                    onClick={goToPrevious}
                    className="h-full w-1/2 cursor-w-resize focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    aria-label="Previous slide"
                />
                <button
                    onClick={goToNext}
                    className="h-full w-1/2 cursor-e-resize focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    aria-label="Next slide"
                />
            </div>
        </Component>
    );
}
