"use client";

import { useState, useEffect, useRef } from "react";
import { getAspectRatioClass } from "@/lib/utils";

export default function FeaturedProjects({
    projects = [],
    className = "",
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
    const carouselRef = useRef(null);
    const announceRef = useRef(null);

    // Use provided projects or fallback to default placeholders
    const slides = projects.length > 0 ? projects : fallbackProjects;
    // Add after line 69
    console.log("Slides data:", slides);
    console.log("First slide:", slides[0]);
    const goToPrevious = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    // Keyboard navigation - works immediately without focus requirement
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
    }, [slides.length]);

    // Announce slide changes
    useEffect(() => {
        if (announceRef.current) {
            announceRef.current.textContent = `Slide ${currentSlide + 1} of ${slides.length}`;
        }
    }, [currentSlide, slides.length]);

    return (
        <section
            ref={carouselRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured work slideshow"
            className={`relative w-full ${className}`}
            data-block="featured-projects"
        >
            {/* Screen reader announcement */}
            <div
                ref={announceRef}
                className="sr-only"
                aria-live="polite"
                aria-atomic="true"
            />

            {/* Slide content */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`Slide ${index + 1} of ${slides.length}`}
                    aria-hidden={index !== currentSlide}
                    className={`absolute inset-[0] z-0 flex h-full w-full items-center justify-center ${
                        index === currentSlide ? "block" : "hidden"
                    }`}
                >
                    <div
                        className={`${getAspectRatioClass(slide.aspectRatio)} overflow-hidden`}
                        style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                        }}
                    >
                        {slide.type === "Image" ? (
                            <img
                                src={
                                    slide.asset.url.startsWith("http")
                                        ? slide.asset.url
                                        : `https:${slide.asset.url}`
                                }
                                alt={slide.altText}
                                className="rounded-base block h-full w-full object-contain"
                            />
                        ) : slide.type === "Video" ? (
                            <video
                                src={
                                    slide.asset.url.startsWith("http")
                                        ? slide.asset.url
                                        : `https:${slide.asset.url}`
                                }
                                className="rounded-base block h-full w-full object-contain"
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                        ) : null}
                    </div>
                </div>
            ))}

            {/* Navigation overlay - invisible clickable areas */}
            <div className="absolute inset-[0] z-10 flex">
                {/* Left half - Previous */}
                <button
                    onClick={goToPrevious}
                    className="h-full w-1/2 cursor-w-resize focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                    aria-label="Previous slide"
                    aria-controls={`slide-${currentSlide}`}
                />
                {/* Right half - Next */}
                <button
                    onClick={goToNext}
                    className="h-full w-1/2 cursor-e-resize focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                    aria-label="Next slide"
                    aria-controls={`slide-${currentSlide}`}
                />
            </div>
        </section>
    );
}
