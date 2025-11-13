"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
    // State is only for accessibility (aria-checked), visual position is CSS-driven
    const [isChecked, setIsChecked] = useState(false);

    // Function to get OS preference
    const getSystemPreference = () => {
        if (typeof window === "undefined") return false;
        try {
            return window.matchMedia("(prefers-color-scheme: dark)").matches;
        } catch (error) {
            return false;
        }
    };

    // Function to save theme preference (simple string, no expiration)
    const saveThemePreference = (theme) => {
        try {
            localStorage.setItem("theme", theme);
        } catch (error) {
            console.warn("Error saving theme preference:", error);
        }
    };

    // Function to get theme preference (simple string)
    const getThemePreference = () => {
        try {
            return localStorage.getItem("theme");
        } catch (error) {
            console.warn("Error reading theme preference:", error);
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

    // Sync state with theme on mount - theme is already applied by inline script
    // State is only for accessibility, visual position is CSS-driven
    useEffect(() => {
        try {
            const osPrefersDark = getSystemPreference();
            const savedTheme = getThemePreference();

            // Smart Sync: Check if user has overridden OS preference
            if (
                savedTheme &&
                savedTheme !== (osPrefersDark ? "dark" : "light")
            ) {
                // User has manually overridden OS
                setIsChecked(savedTheme === "dark");
            } else {
                // Follow OS preference
                setIsChecked(osPrefersDark);
            }
        } catch (error) {
            console.warn("Error syncing theme state:", error);
            setIsChecked(false);
        }
    }, []);

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
            suppressHydrationWarning
            role="switch"
            aria-checked={isChecked}
            aria-label="toggle dark mode"
            onClick={handleToggle}
            className="bg-surface-secondary rounded-pill h-toggle-height w-toggle-width p-toggle-padding flex shrink-0 cursor-pointer justify-start"
            data-block="theme-toggle"
        >
            <span
                className="bg-surface-tertiary aspect-square h-full rounded-full transition-all duration-200 ease-out"
                data-element="theme-toggle__switch"
            ></span>
        </button>
    );
}
