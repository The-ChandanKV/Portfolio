import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { AnimatedSection } from "./AnimatedSection";
import { TiltCard } from "./TiltCard";
import { Code2, Server, Database, Brain, Wrench, Palette } from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    icon: Code2,
    color: "from-cyan-500 to-blue-500",
    skills: [
      { name: "Python", level: 95 },
      { name: "C/C++", level: 90 },
      { name: "Java", level: 85 },
      { name: "JavaScript/TypeScript", level: 88 },
    ],
  },
  {
    title: "Frontend",
    icon: Palette,
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "React.js", level: 92 },
      { name: "HTML/CSS", level: 95 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Next.js", level: 75 },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    color: "from-emerald-500 to-teal-500",
    skills: [
      { name: "Flask", level: 88 },
      { name: "Django", level: 80 },
      { name: "Node.js", level: 70 },
      { name: "REST APIs", level: 85 },
    ],
  },
  {
    title: "AI/ML",
    icon: Brain,
    color: "from-orange-500 to-amber-500",
    skills: [
      { name: "Scikit-learn", level: 85 },
      { name: "Pandas/NumPy", level: 90 },
      { name: "Matplotlib/Seaborn", level: 85 },
      { name: "NLP", level: 75 },
    ],
  },
  {
    title: "Database",
    icon: Database,
    color: "from-rose-500 to-pink-500",
    skills: [
      { name: "MySQL", level: 88 },
      { name: "MongoDB", level: 80 },
      { name: "SQL", level: 90 },
      { name: "Firebase", level: 82 },
    ],
  },
  {
    title: "Tools & Theory",
    icon: Wrench,
    color: "from-indigo-500 to-purple-500",
    skills: [
      { name: "Git/GitHub", level: 90 },
      { name: "DSA", level: 85 },
      { name: "OOPS", level: 92 },
      { name: "DBMS", level: 88 },
    ],
  },
];

const SkillBar = ({ name, level, delay, color }: { name: string; level: number; delay: number; color: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="space-y-2 group cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ x: 5 }}
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium group-hover:text-primary transition-colors">{name}</span>
        <motion.span
          className="text-xs text-primary font-mono bg-primary/10 px-2 py-0.5 rounded-full"
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-2 rounded-full bg-muted/50 overflow-hidden relative">
        {/* Background glow */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${color} opacity-20 blur-sm`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.25, 0.4, 0.25, 1] }}
        />

        {/* Main bar */}
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${color} relative overflow-hidden`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{
            duration: 1.2,
            delay,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: "-100%" }}
            animate={isInView ? { x: "100%" } : { x: "-100%" }}
            transition={{ duration: 1, delay: delay + 0.5 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const SkillCard = ({ category, categoryIndex }: { category: typeof skillCategories[0]; categoryIndex: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <AnimatedSection delay={categoryIndex * 0.1} direction="none">
      <TiltCard tiltMax={6}>
        <motion.div
          ref={cardRef}
          className="glass-hover rounded-2xl p-6 h-full relative overflow-hidden group"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ boxShadow: "0 0 50px hsl(var(--primary) / 0.15)" }}
        >
          {/* Spotlight effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(300px circle at ${mouseX}px ${mouseY}px, hsl(var(--primary) / 0.1), transparent 40%)`,
            }}
          />

          {/* Header */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 + 0.2 }}
          >
            <motion.div
              className={`p-2.5 rounded-xl bg-gradient-to-br ${category.color} shadow-lg`}
              whileHover={{ rotate: 10, scale: 1.1 }}
              animate={isHovered ? { rotate: 5 } : { rotate: 0 }}
            >
              <category.icon className="w-5 h-5 text-white" />
            </motion.div>
            <h3 className="font-display font-bold text-xl group-hover:text-primary transition-colors">
              {category.title}
            </h3>
          </motion.div>

          {/* Skills */}
          <div className="space-y-5">
            {category.skills.map((skill, skillIndex) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                delay={categoryIndex * 0.1 + skillIndex * 0.1}
                color={category.color}
              />
            ))}
          </div>

          {/* Decorative corner */}
          <motion.div
            className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${category.color} rounded-full opacity-10 blur-2xl`}
            animate={isHovered ? { scale: 1.5, opacity: 0.2 } : { scale: 1, opacity: 0.1 }}
          />
        </motion.div>
      </TiltCard>
    </AnimatedSection>
  );
};

export const Skills = () => {
  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 dot-pattern opacity-20" />

      {/* Animated central glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[200px]"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating shapes */}
      <motion.div
        className="absolute top-20 left-20 w-20 h-20 border border-primary/20 rounded-lg"
        animate={{ rotate: 360, y: [0, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-16 h-16 border border-accent/20 rounded-full"
        animate={{ rotate: -360, x: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-4 md:px-6 relative">
        <AnimatedSection className="text-center mb-16">
          <motion.span
            className="text-primary text-sm font-bold uppercase tracking-[0.3em] inline-block"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Expertise
          </motion.span>
          <h2 className="section-title mt-4">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
          <p className="section-subtitle mx-auto mt-6">
            A comprehensive toolkit for building modern, intelligent applications
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <SkillCard
              key={category.title}
              category={category}
              categoryIndex={categoryIndex}
            />
          ))}
        </div>

        {/* Soft Skills */}
        <AnimatedSection delay={0.6} className="mt-12">
          <TiltCard tiltMax={3}>
            <div className="glass rounded-2xl p-8 text-center relative overflow-hidden">
              {/* Background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 10, repeat: Infinity }}
                style={{ backgroundSize: "200% 200%" }}
              />

              <h3 className="font-display font-bold text-2xl mb-6 relative">
                Soft <span className="text-gradient">Skills</span>
              </h3>

              <div className="flex flex-wrap justify-center gap-3 relative">
                {["Teamwork", "Leadership", "Analytical Thinking", "Problem Solving", "Negotiation", "Communication"].map(
                  (skill, index) => (
                    <motion.span
                      key={skill}
                      className="px-5 py-2.5 rounded-full border border-primary/30 text-sm font-medium hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all cursor-default relative overflow-hidden group"
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: index * 0.1, type: "spring" }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.08, y: -5 }}
                    >
                      {/* Shine effect */}
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"
                      />
                      <span className="relative">{skill}</span>
                    </motion.span>
                  )
                )}
              </div>
            </div>
          </TiltCard>
        </AnimatedSection>
      </div>
    </section>
  );
};
