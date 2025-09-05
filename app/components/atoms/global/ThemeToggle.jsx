"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
    // Always start with false for consistent server/client initial render
    const [isChecked, setIsChecked] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // Function to get system theme preference
    const getSystemThemePreference = () => {
        if (typeof window === "undefined") return false;

        try {
            return window.matchMedia("(prefers-color-scheme: dark)").matches;
        } catch (error) {
            console.warn("Error detecting system theme preference:", error);
            return false;
        }
    };

    // Function to save theme preference with expiration
    const saveThemePreference = (theme) => {
        try {
            const expirationTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now
            const themeData = {
                value: theme,
                expires: expirationTime,
            };
            localStorage.setItem("theme", JSON.stringify(themeData));
        } catch (error) {
            console.warn("Error saving theme preference:", error);
        }
    };

    // Function to get theme preference (checks expiration)
    const getThemePreference = () => {
        try {
            const savedData = localStorage.getItem("theme");
            if (!savedData) return null;

            const themeData = JSON.parse(savedData);

            // Check if preference has expired
            if (Date.now() > themeData.expires) {
                console.log(
                    "Theme preference expired, removing and falling back to system",
                );
                localStorage.removeItem("theme");
                return null;
            }

            return themeData.value;
        } catch (error) {
            console.warn("Error reading theme preference:", error);
            // If there's an error parsing, clean up the corrupted data
            localStorage.removeItem("theme");
            return null;
        }
    };

    // Function to apply theme
    const applyTheme = (isDark) => {
        if (typeof document === "undefined") return;

        if (isDark) {
            document.documentElement.setAttribute("data-theme", "dark");
        } else {
            // Explicitly set light theme to override system preference
            document.documentElement.setAttribute("data-theme", "light");
        }
    };

    // Initialize theme on mount
    useEffect(() => {
        const initializeTheme = () => {
            try {
                const savedTheme = getThemePreference();

                if (savedTheme === "dark") {
                    // User has explicitly set dark mode (and it hasn't expired)
                    console.log("Using saved dark preference");
                    setIsChecked(true);
                    applyTheme(true);
                } else if (savedTheme === "light") {
                    // User has explicitly set light mode (and it hasn't expired)
                    console.log("Using saved light preference");
                    setIsChecked(false);
                    applyTheme(false);
                } else {
                    // No saved preference or expired, use system preference
                    const systemPrefersDark = getSystemThemePreference();
                    console.log(
                        "Using system preference:",
                        systemPrefersDark ? "dark" : "light",
                    );
                    setIsChecked(systemPrefersDark);
                    applyTheme(systemPrefersDark);
                }

                setIsInitialized(true);
            } catch (error) {
                console.warn("Error initializing theme:", error);
                // Fallback to light mode
                setIsChecked(false);
                applyTheme(false);
                setIsInitialized(true);
            }
        };

        // Small delay to ensure proper hydration
        const timeoutId = setTimeout(initializeTheme, 100);

        return () => clearTimeout(timeoutId);
    }, []);

    // Listen for system theme changes
    useEffect(() => {
        if (!isInitialized) return;

        let mediaQuery;

        try {
            mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

            const handleSystemThemeChange = (e) => {
                try {
                    // Only apply system theme if user hasn't set an explicit preference (or it's expired)
                    const savedTheme = getThemePreference();
                    if (!savedTheme) {
                        console.log(
                            "System theme changed to:",
                            e.matches ? "dark" : "light",
                        );
                        setIsChecked(e.matches);
                        applyTheme(e.matches);
                    }
                } catch (error) {
                    console.warn("Error handling system theme change:", error);
                }
            };

            // Use both addEventListener and addListener for better browser support
            if (mediaQuery.addEventListener) {
                mediaQuery.addEventListener("change", handleSystemThemeChange);
            } else if (mediaQuery.addListener) {
                // Fallback for older browsers
                mediaQuery.addListener(handleSystemThemeChange);
            }

            return () => {
                try {
                    if (mediaQuery.removeEventListener) {
                        mediaQuery.removeEventListener(
                            "change",
                            handleSystemThemeChange,
                        );
                    } else if (mediaQuery.removeListener) {
                        mediaQuery.removeListener(handleSystemThemeChange);
                    }
                } catch (error) {
                    console.warn(
                        "Error removing theme change listener:",
                        error,
                    );
                }
            };
        } catch (error) {
            console.warn("Error setting up system theme listener:", error);
        }
    }, [isInitialized]);

    const handleToggle = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);

        try {
            if (newCheckedState) {
                saveThemePreference("dark");
                applyTheme(true);
            } else {
                saveThemePreference("light");
                applyTheme(false);
            }
        } catch (error) {
            console.warn("Error saving theme preference:", error);
        }
    };

    return (
        <button
            role="switch"
            aria-checked={isChecked}
            aria-label="toggle dark mode"
            onClick={handleToggle}
            className={`bg-surface-secondary rounded-pill h-toggle-height w-toggle-width shrink-0 p-toggle-padding flex cursor-pointer ${
                isChecked ? "justify-end" : "justify-start"
            }`}
            data-block="theme-toggle"
        >
            <span
                className="bg-surface-tertiary inline-block aspect-square h-full rounded-full"
                data-element="theme-toggle__switch"
            ></span>
        </button>
    );
}
