"use client";

import * as React from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";
import {
    Home,
    User,
    Code,
    FolderGit2,
    GraduationCap,
    Mail,
    Download,
    Menu,
    X,
    LucideIcon
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "./MagneticButton";

interface NavTab {
    title: string;
    icon: LucideIcon;
    href: string;
    type?: never;
}

interface Separator {
    type: "separator";
    title?: never;
    icon?: never;
    href?: never;
}

type NavItem = NavTab | Separator;

const navItems: NavItem[] = [
    { title: "Home", icon: Home, href: "/" },
    { title: "About", icon: User, href: "/about" },
    { type: "separator" },
    { title: "Skills", icon: Code, href: "/skills" },
    { title: "Projects", icon: FolderGit2, href: "/projects" },
    { type: "separator" },
    { title: "Education", icon: GraduationCap, href: "/education" },
    { title: "Contact", icon: Mail, href: "/contact" },
];

const buttonVariants = {
    initial: {
        gap: 0,
        paddingLeft: ".5rem",
        paddingRight: ".5rem",
    },
    animate: (isSelected: boolean) => ({
        gap: isSelected ? ".5rem" : 0,
        paddingLeft: isSelected ? "1rem" : ".5rem",
        paddingRight: isSelected ? "1rem" : ".5rem",
    }),
};

const spanVariants = {
    initial: { width: 0, opacity: 0 },
    animate: { width: "auto", opacity: 1 },
    exit: { width: 0, opacity: 0 },
};

const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.6 };

export const ExpandableNavbar = () => {
    const [selected, setSelected] = React.useState<number | null>(null);
    const [isMobileOpen, setIsMobileOpen] = React.useState(false);
    const outsideClickRef = React.useRef<HTMLDivElement>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { scrollY } = useScroll();

    // Scroll-based animations for the navbar
    const navBackground = useTransform(
        scrollY,
        [0, 100],
        ["rgba(13, 17, 28, 0.4)", "rgba(13, 17, 28, 0.95)"]
    );
    const navBlur = useTransform(scrollY, [0, 100], ["blur(12px)", "blur(24px)"]);
    const navScale = useTransform(scrollY, [0, 100], [1, 0.98]);
    const navY = useTransform(scrollY, [0, 100], [0, 4]);

    // Find active tab index based on current route
    const getActiveTabIndex = React.useCallback(() => {
        let navIndex = 0;
        for (let i = 0; i < navItems.length; i++) {
            const item = navItems[i];
            if (item.type !== "separator" && item.href === location.pathname) {
                return navIndex;
            }
            if (item.type !== "separator") {
                navIndex++;
            }
        }
        return null;
    }, [location.pathname]);

    // Reset selected on outside click
    useOnClickOutside(outsideClickRef as React.RefObject<HTMLElement>, () => {
        setSelected(null);
    });

    // Close mobile menu on route change
    React.useEffect(() => {
        setIsMobileOpen(false);
    }, [location.pathname]);

    const handleTabClick = (item: NavTab, index: number) => {
        setSelected(index);
        navigate(item.href);
    };

    const handleDownloadResume = () => {
        const link = document.createElement('a');
        link.href = '/Chandan-K-V.pdf';
        link.download = 'Chandan-K-V.pdf';
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    const TabSeparator = () => (
        <div className="mx-1 h-[28px] w-[1.5px] bg-gradient-to-b from-transparent via-primary/40 to-transparent" aria-hidden="true" />
    );

    // Get filtered tabs (without separators) for index calculation
    const getTabIndex = (itemIndex: number): number => {
        let tabIndex = 0;
        for (let i = 0; i < itemIndex; i++) {
            if (navItems[i].type !== "separator") {
                tabIndex++;
            }
        }
        return tabIndex;
    };

    const activeIndex = getActiveTabIndex();

    return (
        <>
            {/* Desktop Navigation */}
            <motion.nav
                ref={outsideClickRef}
                style={{
                    backgroundColor: navBackground,
                    backdropFilter: navBlur,
                    scale: navScale,
                    y: navY,
                }}
                className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-2 rounded-2xl border border-white/10 px-3 py-2 shadow-2xl shadow-primary/5"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            >
                {/* Logo */}
                <MagneticButton strength={0.2}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                            to="/"
                            className="font-display text-2xl font-black tracking-tight text-primary relative group px-2 mr-2"
                            data-cursor-hover
                        >
                            <span className="relative z-10">CKV</span>
                            <motion.div
                                className="absolute -inset-2 rounded-lg bg-primary/10"
                                initial={{ scale: 0, opacity: 0 }}
                                whileHover={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.2 }}
                            />
                        </Link>
                    </motion.div>
                </MagneticButton>

                {/* Expandable Navigation Tabs */}
                <div className="flex items-center gap-1">
                    {navItems.map((item, index) => {
                        if (item.type === "separator") {
                            return <TabSeparator key={`separator-${index}`} />;
                        }

                        const Icon = item.icon;
                        const tabIndex = getTabIndex(index);
                        const isActive = activeIndex === tabIndex;
                        const isSelected = selected === tabIndex;

                        return (
                            <motion.button
                                key={item.title}
                                variants={buttonVariants}
                                initial={false}
                                animate="animate"
                                custom={isSelected || isActive}
                                onClick={() => handleTabClick(item, tabIndex)}
                                transition={transition}
                                className={cn(
                                    "relative flex items-center rounded-xl px-3 py-2.5 text-sm font-semibold uppercase tracking-wide transition-all duration-300",
                                    isActive
                                        ? "bg-primary/20 text-primary shadow-lg shadow-primary/20"
                                        : isSelected
                                            ? "bg-muted text-primary"
                                            : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                )}
                                data-cursor-hover
                            >
                                <motion.div
                                    whileHover={{ rotate: [0, -10, 10, 0] }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <Icon size={18} />
                                </motion.div>
                                <AnimatePresence initial={false}>
                                    {(isSelected || isActive) && (
                                        <motion.span
                                            variants={spanVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            transition={transition}
                                            className="overflow-hidden whitespace-nowrap"
                                        >
                                            {item.title}
                                        </motion.span>
                                    )}
                                </AnimatePresence>

                                {/* Active glow effect */}
                                {isActive && (
                                    <motion.div
                                        className="absolute inset-0 rounded-xl bg-primary/10 blur-md -z-10"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Separator before resume button */}
                <TabSeparator />

                {/* Resume Download Button */}
                <MagneticButton strength={0.15}>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button
                            variant="neon"
                            size="sm"
                            onClick={handleDownloadResume}
                            className="font-bold uppercase tracking-wide group overflow-hidden relative rounded-xl"
                            data-cursor-hover
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <Download className="w-4 h-4 group-hover:animate-bounce" />
                                <span className="hidden lg:inline">Resume</span>
                            </span>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            />
                        </Button>
                    </motion.div>
                </MagneticButton>
            </motion.nav>

            {/* Mobile Navigation */}
            <motion.nav
                style={{
                    backgroundColor: navBackground,
                    backdropFilter: navBlur,
                }}
                className="fixed top-4 left-4 right-4 z-50 md:hidden flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 shadow-2xl shadow-primary/5"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            >
                {/* Mobile Logo */}
                <Link
                    to="/"
                    className="font-display text-2xl font-black tracking-tight text-gradient"
                >
                    CKV
                </Link>

                {/* Mobile Menu Button */}
                <motion.button
                    className="p-2 text-foreground relative z-50"
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <AnimatePresence mode="wait">
                        {isMobileOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X size={24} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Menu size={24} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 bg-background/80 backdrop-blur-xl z-40 md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileOpen(false)}
                        />

                        {/* Menu Content */}
                        <motion.div
                            className="fixed inset-x-4 top-24 z-40 md:hidden glass rounded-2xl p-6 shadow-2xl border border-white/10"
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                        >
                            <div className="grid grid-cols-2 gap-3">
                                {navItems.filter((item): item is NavTab => item.type !== "separator").map((item, index) => {
                                    const Icon = item.icon;
                                    const isActive = location.pathname === item.href;

                                    return (
                                        <motion.div
                                            key={item.title}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Link
                                                to={item.href}
                                                onClick={() => setIsMobileOpen(false)}
                                                className={cn(
                                                    "flex flex-col items-center gap-2 w-full text-center p-4 rounded-xl transition-all font-semibold uppercase tracking-wide group",
                                                    isActive
                                                        ? "bg-primary/20 text-primary shadow-lg shadow-primary/20"
                                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                                )}
                                            >
                                                <motion.div
                                                    className={cn(
                                                        "p-3 rounded-xl transition-colors",
                                                        isActive ? "bg-primary/30" : "bg-muted group-hover:bg-primary/20"
                                                    )}
                                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                                >
                                                    <Icon className="w-6 h-6" />
                                                </motion.div>
                                                <span className="text-xs">{item.title}</span>
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35 }}
                                className="mt-6"
                            >
                                <Button
                                    variant="neon"
                                    className="w-full font-bold uppercase tracking-wide"
                                    onClick={() => {
                                        handleDownloadResume();
                                        setIsMobileOpen(false);
                                    }}
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Download Resume
                                </Button>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};
