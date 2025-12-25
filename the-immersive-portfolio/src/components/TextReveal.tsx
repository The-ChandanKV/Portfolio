import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    once?: boolean;
}

export const TextReveal = ({
    text,
    className = "",
    delay = 0,
    once = true
}: TextRevealProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, margin: "-50px" });

    const words = text.split(" ");

    return (
        <div ref={ref} className={className}>
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block overflow-hidden mr-[0.25em]">
                    <motion.span
                        className="inline-block"
                        initial={{ y: "100%" }}
                        animate={isInView ? { y: 0 } : { y: "100%" }}
                        transition={{
                            duration: 0.5,
                            delay: delay + wordIndex * 0.05,
                            ease: [0.25, 0.4, 0.25, 1],
                        }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </div>
    );
};

interface CharacterRevealProps {
    text: string;
    className?: string;
    delay?: number;
    stagger?: number;
    once?: boolean;
}

export const CharacterReveal = ({
    text,
    className = "",
    delay = 0,
    stagger = 0.02,
    once = true
}: CharacterRevealProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, margin: "-50px" });

    const characters = text.split("");

    return (
        <div ref={ref} className={className}>
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    className="inline-block"
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -90 }}
                    transition={{
                        duration: 0.4,
                        delay: delay + index * stagger,
                        ease: [0.25, 0.4, 0.25, 1],
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </div>
    );
};

interface SplitTextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    once?: boolean;
}

export const SplitTextReveal = ({
    text,
    className = "",
    delay = 0,
    once = true
}: SplitTextRevealProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, margin: "-50px" });

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.div
                initial={{ y: "100%", skewY: 5 }}
                animate={isInView ? { y: 0, skewY: 0 } : { y: "100%", skewY: 5 }}
                transition={{
                    duration: 0.8,
                    delay,
                    ease: [0.25, 0.4, 0.25, 1],
                }}
            >
                {text}
            </motion.div>
        </div>
    );
};
