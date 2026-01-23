"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

// Define variants and transition outside component to prevent recreation on re-renders
const variants = {
    initial: { opacity: 0, y: 0 }, // y: 0 forces GPU rendering for consistent opacity behavior
    animate: { opacity: 1, y: 0 },
};

const transition = {
    duration: 0.4, // Match PageLoad duration
    ease: [0.4, 0, 0.2, 1], // Tailwind 'ease' cubic-bezier curve
};

export default function Template({ children }) {
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    return (
        <motion.div
            key={pathname}
            initial="initial"
            animate="animate"
            variants={variants}
            transition={transition}
            className={isHomePage ? "max-h-[80%] grow overflow-hidden h-full flex flex-col" : "w-full"}
        >
            {children}
        </motion.div>
    );
}
