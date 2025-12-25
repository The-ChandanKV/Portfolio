import { ReactNode, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

interface SmoothScrollProps {
    children: ReactNode;
}

export const SmoothScroll = ({ children }: SmoothScrollProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll();

    const smoothProgress = useSpring(scrollYProgress, {
        damping: 50,
        stiffness: 400,
    });

    useEffect(() => {
        // Add smooth scroll behavior to document
        document.documentElement.style.scrollBehavior = 'smooth';
        return () => {
            document.documentElement.style.scrollBehavior = '';
        };
    }, []);

    return (
        <div ref={containerRef}>
            {children}
        </div>
    );
};

// Parallax wrapper for sections
interface ParallaxSectionProps {
    children: ReactNode;
    speed?: number;
    className?: string;
}

export const ParallaxSection = ({
    children,
    speed = 0.5,
    className = ""
}: ParallaxSectionProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            <motion.div style={{ y }}>
                {children}
            </motion.div>
        </div>
    );
};

// Scale on scroll component
interface ScaleOnScrollProps {
    children: ReactNode;
    className?: string;
}

export const ScaleOnScroll = ({ children, className = "" }: ScaleOnScrollProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    return (
        <motion.div
            ref={ref}
            style={{ scale, opacity }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Rotate on scroll component
interface RotateOnScrollProps {
    children: ReactNode;
    className?: string;
    degrees?: number;
}

export const RotateOnScroll = ({
    children,
    className = "",
    degrees = 360
}: RotateOnScrollProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const rotate = useTransform(scrollYProgress, [0, 1], [0, degrees]);

    return (
        <motion.div
            ref={ref}
            style={{ rotate }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
