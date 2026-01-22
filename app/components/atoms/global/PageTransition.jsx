"use client";

import { useEffect, useState, useRef } from "react";
import { useTransition } from "@/app/context/TransitionContext";

export default function PageTransition() {
    const { transitionStage } = useTransition();
    const [isVisible, setIsVisible] = useState(true);
    const [shouldRender, setShouldRender] = useState(true);
    const hasInitialFaded = useRef(false);

    // Handle initial page load fade-in (only once)
    useEffect(() => {
        if (!hasInitialFaded.current && transitionStage === "idle") {
            // Wait for content to be mounted, then trigger fade-out
            const timer = setTimeout(() => {
                setIsVisible(false);
                hasInitialFaded.current = true;
            }, 50); // Small delay to ensure content is ready

            return () => clearTimeout(timer);
        }
    }, [transitionStage]);

    // Handle page transition animations
    useEffect(() => {
        if (transitionStage === "exiting") {
            // Show overlay and fade in (reverse of normal)
            setShouldRender(true);
            setIsVisible(true);
        } else if (transitionStage === "entering") {
            // Fade out overlay to reveal new page
            setIsVisible(false);
        }
    }, [transitionStage]);

    const handleTransitionEnd = () => {
        // After opacity transition completes, hide the overlay
        if (!isVisible && transitionStage === "idle") {
            setShouldRender(false);
        }
    };

    if (!shouldRender) {
        return null;
    }

    return (
        <div
            data-element="page-transition"
            className={`ease fixed inset-[0] z-[9999] bg-[var(--surface-primary)] transition-opacity duration-200 ${
                isVisible ? "opacity-100" : "opacity-0"
            }`}
            onTransitionEnd={handleTransitionEnd}
            style={{
                pointerEvents: isVisible ? "auto" : "none",
            }}
        />
    );
}
