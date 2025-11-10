"use client";

import { useState } from "react";

import Header from "@/app/components/organisms/global/Header";
import Footer from "@/app/components/molecules/global/Footer";

export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Replace this with your actual slide content
    const slides = [
        { id: 1, content: "Slide 1" },
        { id: 2, content: "Slide 2" },
        { id: 3, content: "Slide 3" },
        { id: 4, content: "Slide 4" },
    ];

    const goToPrevious = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    return (
        <main
            data-block="home-content"
            className="px-grid-margin pt-global-top-margin pb-global-btm-margin flex h-screen min-h-[1000px] grow flex-col justify-between"
        >
            <Header role="banner" showNav={false} />
            <section className="relative max-h-[80%] grow overflow-hidden border border-[red]">
                {/* Slide content */}
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 flex h-full w-full items-center justify-center ${
                            index === currentSlide ? "" : "hidden"
                        }`}
                    >
                        {/* Replace this with your actual slide content */}
                        <div className="text-4xl">{slide.content}</div>
                    </div>
                ))}

                {/* Navigation overlay - invisible clickable areas */}
                <div className="absolute inset-[0] z-10 flex">
                    {/* Left half - Previous */}
                    <button
                        onClick={goToPrevious}
                        className="h-full w-1/2 cursor-w-resize focus:outline-none"
                        aria-label="Previous slide"
                    />
                    {/* Right half - Next */}
                    <button
                        onClick={goToNext}
                        className="h-full w-1/2 cursor-e-resize focus:outline-none"
                        aria-label="Next slide"
                    />
                </div>
            </section>
            <Footer role="contentinfo" />
        </main>
    );
}
