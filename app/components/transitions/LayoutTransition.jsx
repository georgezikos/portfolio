"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSelectedLayoutSegment } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useContext, useEffect, useRef } from "react";

// Hook to retain previous value
function usePreviousValue(value) {
    const prevValue = useRef();

    useEffect(() => {
        prevValue.current = value;
        return () => {
            prevValue.current = undefined;
        };
    });

    return prevValue.current;
}

// FrozenRouter prevents premature unmounting during animations
function FrozenRouter({ children }) {
    const context = useContext(LayoutRouterContext);
    const prevContext = usePreviousValue(context) || null;

    const segment = useSelectedLayoutSegment();
    const prevSegment = usePreviousValue(segment);

    const changed =
        segment !== prevSegment &&
        segment !== undefined &&
        prevSegment !== undefined;

    return (
        <LayoutRouterContext.Provider value={changed ? prevContext : context}>
            {children}
        </LayoutRouterContext.Provider>
    );
}

// Main transition component
export function LayoutTransition({
    children,
    className,
    style,
    initial,
    animate,
    exit,
    transition,
    onExitComplete,
}) {
    const segment = useSelectedLayoutSegment();

    return (
        <AnimatePresence 
            mode="wait" 
            initial={false}
            onExitComplete={onExitComplete}
        >
            <motion.div
                className={className}
                style={style}
                key={segment}
                initial={initial}
                animate={animate}
                exit={exit}
                transition={transition}
            >
                <FrozenRouter>{children}</FrozenRouter>
            </motion.div>
        </AnimatePresence>
    );
}
