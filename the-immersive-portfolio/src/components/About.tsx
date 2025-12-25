import { motion, useInView } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import { Code2, Brain, Users, Rocket, Award, Zap, Target, TrendingUp } from "lucide-react";
import { TiltCard } from "./TiltCard";
import { useRef } from "react";
import { TextReveal } from "./TextReveal";

const highlights = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    description: "Building robust applications with React, Flask, Django, and Node.js",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Brain,
    title: "AI/ML Innovation",
    description: "Creating intelligent solutions with scikit-learn, pandas, and deep learning",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Head of Operations",
    description: "Organising Committee (OC) - Leading operational strategies",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Award,
    title: "Head of Operations",
    description: "Robofiesta'25 - Leading operational excellence for the TechFest ",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: Target,
    title: "Head of Events",
    description: "Protatva'25 - Orchestrating memorable technical experiences",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: Rocket,
    title: "Entrepreneurship",
    description: "Runner-up at VTU Fest Yukthi'25 Entrepreneur Competition",
    color: "from-indigo-500 to-purple-500",
  },
];

const CountUp = ({ value, suffix = "" }: { value: number | string; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  if (typeof value === "string") {
    return <span ref={ref}>{value}{suffix}</span>;
  }

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {value}{suffix}
      </motion.span>
    </motion.span>
  );
};

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden" ref={containerRef}>
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      {/* Animated background orbs */}
      <motion.div
        className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[150px]"
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-[150px]"
        animate={{ scale: [1.2, 1, 1.2], x: [0, -50, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `
          linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
          linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px'
      }} />

      <div className="container mx-auto px-4 md:px-6 relative">
        <AnimatedSection className="text-center mb-16">
          <motion.span
            className="text-primary text-sm font-bold uppercase tracking-[0.3em] inline-block"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            About Me
          </motion.span>
          <h2 className="section-title mt-4">
            <TextReveal text="Crafting Digital" className="inline" />
            {" "}
            <span className="text-gradient">Experiences</span>
          </h2>
          <p className="section-subtitle mx-auto mt-6">
            A passionate developer turning complex problems into elegant solutions
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Bio */}
          <AnimatedSection direction="left" delay={0.2}>
            <TiltCard tiltMax={5}>
              <div className="glass rounded-2xl p-8 md:p-10 relative overflow-hidden group">
                {/* Decorative gradients */}
                <motion.div
                  className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-40 h-40 bg-accent/20 rounded-full blur-3xl"
                  animate={{ scale: [1.3, 1, 1.3], opacity: [0.5, 0.3, 0.5] }}
                  transition={{ duration: 6, repeat: Infinity }}
                />

                {/* Border glow on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(45deg, hsl(var(--primary) / 0.1), hsl(var(--accent) / 0.1))",
                  }}
                />

                <div className="relative space-y-6">
                  <motion.h3
                    className="text-2xl font-display font-bold flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 }}
                  >
                    <Zap className="w-6 h-6 text-primary" />
                    Information Science Undergraduate
                  </motion.h3>

                  <motion.p
                    className="text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.4 }}
                  >
                    Currently pursuing B.E. in Information Science and Engineering at
                    <span className="text-foreground font-medium"> RV Institute of Technology and Management</span> with a
                    <span className="text-primary font-semibold"> 9.06 CGPA</span>.
                  </motion.p>

                  <motion.p
                    className="text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 }}
                  >
                    I specialize in building full-stack and AI-integrated applications,
                    delivering innovative solutions through hackathons and projects.
                    My expertise spans from frontend development with React to machine
                    learning with Python's powerful libraries.
                  </motion.p>

                  <motion.p
                    className="text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 }}
                  >
                    Beyond coding, I lead as the <span className="text-primary font-medium">President of Coder's Club</span> and
                    <span className="text-accent font-medium"> Head of Operations at E-Cell</span>, nurturing the next generation of tech innovators.
                  </motion.p>

                  {/* Stats with animated counters */}
                  <motion.div
                    className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7 }}
                  >
                    {[
                      { value: "9.06", label: "CGPA", icon: TrendingUp },
                      { value: "5+", label: "Projects", icon: Code2 },
                      { value: "6+", label: "Certifications", icon: Award },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        className="text-center group/stat cursor-default"
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          className="text-3xl font-display font-bold text-gradient"
                          initial={{ scale: 0 }}
                          animate={isInView ? { scale: 1 } : {}}
                          transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                        >
                          <CountUp value={stat.value} />
                        </motion.div>
                        <div className="text-sm text-muted-foreground flex items-center justify-center gap-1 mt-1">
                          <stat.icon className="w-3 h-3 group-hover/stat:text-primary transition-colors" />
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </TiltCard>
          </AnimatedSection>

          {/* Right side - Highlights */}
          <div className="space-y-4">
            {highlights.map((item, index) => (
              <AnimatedSection key={item.title} direction="right" delay={0.2 + index * 0.1}>
                <motion.div
                  className="glass-hover rounded-xl p-5 flex gap-5 group cursor-pointer relative overflow-hidden"
                  whileHover={{ x: 10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Gradient background on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />

                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  />

                  <div className="flex-shrink-0 relative">
                    <motion.div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <item.icon className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>

                  <div className="relative">
                    <h4 className="font-display font-semibold text-lg group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground text-sm mt-1">
                      {item.description}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <motion.div
                    className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    <Rocket className="w-5 h-5 text-primary rotate-45" />
                  </motion.div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
