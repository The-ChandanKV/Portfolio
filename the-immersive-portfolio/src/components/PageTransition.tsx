import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface PageTransitionProps {
    children: ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial="initial"
                animate="animate"
                exit="exit"
                className="min-h-screen"
            >
                {/* Page content */}
                <motion.div
                    variants={{
                        initial: { opacity: 0, y: 20 },
                        animate: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }
                        },
                        exit: {
                            opacity: 0,
                            y: -20,
                            transition: { duration: 0.3 }
                        },
                    }}
                >
                    {children}
                </motion.div>

                {/* Slide-in overlay */}
                <motion.div
                    className="fixed inset-0 z-[100] bg-primary pointer-events-none origin-left"
                    variants={{
                        initial: { scaleX: 1 },
                        animate: {
                            scaleX: 0,
                            transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1], delay: 0.1 }
                        },
                        exit: {
                            scaleX: 1,
                            transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }
                        },
                    }}
                />

                {/* Secondary overlay */}
                <motion.div
                    className="fixed inset-0 z-[99] bg-accent pointer-events-none origin-left"
                    variants={{
                        initial: { scaleX: 1 },
                        animate: {
                            scaleX: 0,
                            transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1], delay: 0.2 }
                        },
                        exit: {
                            scaleX: 1,
                            transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1], delay: 0.1 }
                        },
                    }}
                />

                {/* Third overlay for depth */}
                <motion.div
                    className="fixed inset-0 z-[98] bg-background pointer-events-none origin-left"
                    variants={{
                        initial: { scaleX: 1 },
                        animate: {
                            scaleX: 0,
                            transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1], delay: 0.3 }
                        },
                        exit: {
                            scaleX: 1,
                            transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1], delay: 0.2 }
                        },
                    }}
                />
            </motion.div>
        </AnimatePresence>
    );
};
