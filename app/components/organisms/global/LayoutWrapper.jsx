"use client";

import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./Header";
import Footer from "../../molecules/global/Footer";
import { LayoutTransition } from "../../transitions/LayoutTransition";

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();
    const isHomePage = pathname === "/";
    const segment = useSelectedLayoutSegment();

    // Track the layout state separately - updates AFTER animation completes
    const [layoutIsHomePage, setLayoutIsHomePage] = useState(isHomePage);

    // Track reduced motion preference
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    // Ref for ARIA announcements
    const announceRef = useRef(null);

    // Track if this is the initial mount
    const isInitialMount = useRef(true);

    // Update layout state on initial mount
    useEffect(() => {
        setLayoutIsHomePage(isHomePage);
    }, []);

    // Check for reduced motion preference
    useEffect(() => {
        const mediaQuery = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        );
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (e) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener("change", handleChange);

        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    // Derive page name from pathname for screen reader announcements
    const getPageName = (path) => {
        if (path === "/") return "Home";
        if (path === "/information") return "Information";
        if (path.startsWith("/work/")) {
            // Extract project name from URL if present
            const segments = path.split("/").filter(Boolean);
            if (segments.length >= 2) {
                // Format: /work/[client]/[project]
                const projectName = segments[segments.length - 1]
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");
                return `Project: ${projectName}`;
            }
            return "Work";
        }
        if (path === "/work") return "Work";
        return "Page";
    };

    // Handle route changes for accessibility
    useEffect(() => {
        // Skip on initial mount
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        // Announce page change to screen readers
        if (announceRef.current) {
            const pageName = getPageName(pathname);
            announceRef.current.textContent = `Navigated to ${pageName}`;
        }

        // Move focus to main content for keyboard navigation
        // TEMPORARILY DISABLED to debug Safari outline flash
        // const timer = setTimeout(() => {
        //     const mainContent = document.querySelector("main");
        //     if (mainContent) {
        //         mainContent.setAttribute("tabindex", "-1");
        //         mainContent.focus({ preventScroll: true });
        //         // Remove tabindex after focus to maintain natural tab order
        //         mainContent.addEventListener(
        //             "blur",
        //             () => mainContent.removeAttribute("tabindex"),
        //             { once: true },
        //         );
        //     }
        // }, 50);

        // return () => clearTimeout(timer);
    }, [pathname]);

    // Conditional classes based on LAYOUT state (not current pathname)
    const containerClasses = `
        px-grid-margin 
        pt-global-top-margin 
        pb-global-btm-margin 
        flex 
        flex-col
        ${layoutIsHomePage ? "h-screen min-h-[640px] justify-between" : "min-h-screen gap-y-global-xl-full"}
    `
        .trim()
        .replace(/\s+/g, " ");

    // Transition variants - respect reduced motion preference
    const variants = prefersReducedMotion
        ? {
              initial: { opacity: 1 },
              animate: { opacity: 1 },
              exit: { opacity: 1 },
          }
        : {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
          };

    // Transition timing - instant for reduced motion, smooth otherwise
    const transition = prefersReducedMotion
        ? { duration: 0.01 }
        : { duration: 0.3, ease: [0.4, 0, 0.2, 1] };

    // Handler called when exit animation completes
    const handleExitComplete = () => {
        setLayoutIsHomePage(isHomePage); // NOW update the layout
    };

    return (
        <div className={containerClasses}>
            {/* Screen reader announcement for route changes */}
            <div
                ref={announceRef}
                className="sr-only"
                aria-live="polite"
                aria-atomic="true"
            />

            <Header currentPath={pathname} />

            {/* Content animation */}
            <LayoutTransition
                initial={variants.initial}
                animate={variants.animate}
                exit={variants.exit}
                transition={transition}
                onExitComplete={handleExitComplete}
                className={
                    layoutIsHomePage
                        ? "h-full max-h-[83%] sm:max-h-[82%] md:max-h-[84%] lg:max-h-[83%] xl:max-h-[82%]"
                        : "w-full"
                }
            >
                {children}
            </LayoutTransition>

            {/* Footer animation - separate but coordinated */}
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={segment}
                    initial={variants.initial}
                    animate={variants.animate}
                    exit={variants.exit}
                    transition={transition}
                >
                    <Footer />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
