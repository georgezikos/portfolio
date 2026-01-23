"use client";

import { useEffect, useState } from "react";

export default function PageLoad() {
    const [isVisible, setIsVisible] = useState(true);
    const [shouldRender, setShouldRender] = useState(true);

    // Handle initial page load fade-in
    useEffect(() => {
        // Wait for content to be mounted, then trigger fade-out
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 50); // Small delay to ensure content is ready

        return () => clearTimeout(timer);
    }, []);

    const handleTransitionEnd = () => {
        // After opacity transition completes, hide the overlay
        if (!isVisible) {
            setShouldRender(false);
        }
    };

    if (!shouldRender) {
        return null;
    }

    return (
        <div
            data-element="page-load"
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
