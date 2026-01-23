"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "../../molecules/global/Footer";

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    // Conditional classes based on route
    const containerClasses = `
        px-grid-margin 
        pt-global-top-margin 
        pb-global-btm-margin 
        flex 
        flex-col
        ${isHomePage ? "h-screen min-h-[640px] justify-between" : "min-h-screen gap-y-global-xl-full"}
    `.trim().replace(/\s+/g, " ");

    return (
        <div className={containerClasses}>
            <Header currentPath={pathname} />
            {children}
            <Footer />
        </div>
    );
}
