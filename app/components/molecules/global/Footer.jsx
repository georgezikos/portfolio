"use client";

import { useState, useEffect } from "react";

export default function Footer({
    contact = "info@george-zikos.com",
    className = "",
    ...rest // Capture all other props
}) {
    const startingYear = "2020";
    const currentYear = new Date().getFullYear();
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyEmail = async (e) => {
        e.preventDefault();

        // Check if clipboard API is available and in secure context
        if (!navigator.clipboard || !window.isSecureContext) {
            console.warn(
                "Clipboard API not available or not in secure context",
            );
            // Fallback: just open mailto link
            window.location.href = `mailto:${contact}`;
            return;
        }

        try {
            await navigator.clipboard.writeText(contact);
            setIsCopied(true);
        } catch (err) {
            console.error("Failed to copy email:", err);
            // Fallback: open mailto link
            window.location.href = `mailto:${contact}`;
        }
    };

    useEffect(() => {
        if (isCopied) {
            const timer = setTimeout(() => setIsCopied(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isCopied]);

    return (
        <footer
            data-block="footer"
            className={`text-text-secondary flex w-full justify-between ${className}`}
            {...rest} // Spread additional props to the footer element
        >
            <p
                className="text-caption-sm-footer tabular-nums"
                data-element="footer__text"
            >
                © {startingYear}–{currentYear}
            </p>
            <a
                className="text-caption-sm-footer hover:text-link-secondary-hover active:text-link-secondary-hover focus-visible:text-link-secondary-hover relative inline-block cursor-pointer text-right no-underline transition-colors duration-200 ease-in-out"
                data-element="footer__text"
                href={`mailto:${contact}`}
                onClick={handleCopyEmail}
                aria-label={`Copy email ${contact} to clipboard`}
            >
                <span
                    className={`text-caption-sm-footer ease absolute inset-[0] text-right transition-opacity duration-200 ${isCopied ? "opacity-0" : "opacity-100"}`}
                >
                    {contact}
                </span>
                <span
                    aria-hidden="true"
                    className={`text-caption-sm-footer !text-link-secondary-hover ease absolute inset-[0] text-right transition-opacity duration-200 ${isCopied ? "opacity-100" : "opacity-0"}`}
                >
                    Copied
                </span>
                <span className="text-caption-sm-footer invisible">
                    {contact}
                </span>
            </a>
        </footer>
    );
}
