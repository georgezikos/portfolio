"use client";

import { useState, useEffect } from "react";

export default function CopyEmailLink({
    email,
    children,
    className = "",
    spanClassName = "",
    copiedSpanClassName = "",
    invisibleSpanClassName = "",
    ariaLabel = null,
    dataElement = null,
}) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyEmail = async (e) => {
        e.preventDefault();

        // Check if clipboard API is available and in secure context
        if (!navigator.clipboard || !window.isSecureContext) {
            console.warn(
                "Clipboard API not available or not in secure context",
            );
            // Fallback: just open mailto link
            window.location.href = `mailto:${email}`;
            return;
        }

        try {
            await navigator.clipboard.writeText(email);
            setIsCopied(true);
        } catch (err) {
            console.error("Failed to copy email:", err);
            // Fallback: open mailto link
            window.location.href = `mailto:${email}`;
        }
    };

    useEffect(() => {
        if (isCopied) {
            const timer = setTimeout(() => setIsCopied(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isCopied]);

    return (
        <a
            className={className}
            data-element={dataElement}
            href={`mailto:${email}`}
            onClick={handleCopyEmail}
            aria-label={ariaLabel || `Copy email ${email} to clipboard`}
        >
            <span
                className={`${spanClassName} ease absolute inset-[0] transition-opacity duration-200 ${isCopied ? "opacity-0" : "opacity-100"}`}
            >
                {children}
            </span>
            <span
                aria-hidden="true"
                className={`${copiedSpanClassName} ease absolute inset-[0] transition-opacity duration-200 ${isCopied ? "opacity-100" : "opacity-0"}`}
            >
                Copied
            </span>
            <span className={invisibleSpanClassName}>
                {children}
            </span>
        </a>
    );
}
