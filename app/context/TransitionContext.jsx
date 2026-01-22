"use client";

import {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
    useRef,
} from "react";
import { useRouter, usePathname } from "next/navigation";

const TransitionContext = createContext({
    isTransitioning: false,
    transitionStage: "idle", // 'idle' | 'exiting' | 'entering'
    startTransition: () => {},
});

export function TransitionProvider({ children }) {
    const [transitionStage, setTransitionStage] = useState("idle");
    const router = useRouter();
    const pathname = usePathname();
    const nextPathRef = useRef(null);
    const isTransitioningRef = useRef(false);

    // Watch for pathname changes to trigger entering stage
    useEffect(() => {
        if (
            isTransitioningRef.current &&
            transitionStage === "exiting" &&
            nextPathRef.current === pathname
        ) {
            // Navigation completed, start entering animation
            setTransitionStage("entering");

            // After enter animation completes, return to idle
            setTimeout(() => {
                setTransitionStage("idle");
                isTransitioningRef.current = false;
                nextPathRef.current = null;
            }, 200); // Match duration-200
        }
    }, [pathname, transitionStage]);

    const startTransition = useCallback(
        (href) => {
            // Don't transition if we're already on this page
            if (href === pathname || isTransitioningRef.current) {
                return;
            }

            // Mark that we're transitioning
            isTransitioningRef.current = true;
            nextPathRef.current = href;

            // Start exit animation
            setTransitionStage("exiting");

            // Wait for exit animation to complete (200ms to match duration-200)
            setTimeout(() => {
                // Navigate to new page
                router.push(href);
                // The useEffect above will handle setting "entering" when pathname changes
            }, 200); // Match duration-200
        },
        [router, pathname]
    );

    const value = {
        isTransitioning: transitionStage !== "idle",
        transitionStage,
        startTransition,
    };

    return (
        <TransitionContext.Provider value={value}>
            {children}
        </TransitionContext.Provider>
    );
}

export function useTransition() {
    const context = useContext(TransitionContext);
    if (!context) {
        throw new Error("useTransition must be used within TransitionProvider");
    }
    return context;
}
