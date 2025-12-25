import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import { Github, Brain, CreditCard, FileText, Receipt, Sparkles, ExternalLink, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TiltCard } from "./TiltCard";
import { MagneticButton } from "./MagneticButton";
import { useRef, useState } from "react";

const projects = [
  {
    title: "AI Resume Analyzer",
    description:
      "A web-based AI Resume Analyzer that evaluates resumes using AI and provides structured feedback based on job descriptions and ATS-style criteria.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite", "Puter.js", "PDF.js"],
    icon: Sparkles,
    gradient: "from-cyan-500 via-blue-500 to-purple-500",
    github: "https://github.com/The-ChandanKV",
    color: "cyan",
  },
  {
    title: "Rock vs Mine Sonar Prediction",
    description:
      "A machine learning application that classifies sonar signal data to distinguish between underwater rocks and mines using a trained binary classifier.",
    tech: ["Python", "Flask", "scikit-learn", "NumPy", "pandas", "Next.js", "TypeScript"],
    icon: Brain,
    gradient: "from-purple-500 via-pink-500 to-red-500",
    github: "https://github.com/The-ChandanKV",
    color: "purple",
  },
  {
    title: "InvoSync",
    description:
      "A full-stack invoicing web application that enables users to upload, manage, and sync business invoices with automated processing and payment tracking.",
    tech: ["TypeScript", "Node.js", "Firebase", "Razorpay API", "React", "Tailwind CSS"],
    icon: Receipt,
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    github: "https://github.com/The-ChandanKV",
    color: "emerald",
  },
  {
    title: "Credit Card Fraud Detection",
    description:
      "A model to identify fraudulent credit card transactions using supervised learning and advanced data preprocessing techniques.",
    tech: ["Python", "Pandas", "scikit-learn", "Matplotlib"],
    icon: CreditCard,
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    github: "https://github.com/The-ChandanKV",
    color: "orange",
  },
  {
    title: "PDF Chatbot",
    description:
      "A web app that lets users chat with uploaded PDF documents through offline local semantic analysis using NLP.",
    tech: ["React.js", "Python", "NLP", "JavaScript"],
    icon: FileText,
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
    github: "https://github.com/The-ChandanKV",
    color: "rose",
  },
];

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
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
    <AnimatedSection delay={index * 0.1}>
      <TiltCard tiltMax={8} glareEnabled>
        <motion.div
          ref={cardRef}
          className="group glass-hover rounded-2xl overflow-hidden h-full flex flex-col relative"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {/* Gradient spotlight effect */}
          <motion.div
            className={`absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-br ${project.gradient}`}
            style={{
              background: `radial-gradient(400px circle at ${mouseX}px ${mouseY}px, hsl(var(--primary) / 0.15), transparent 40%)`,
            }}
          />

          {/* Header with animated gradient */}
          <div className={`relative p-6 overflow-hidden`}>
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-20`}
              animate={isHovered ? {
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              } : {}}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            />
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />

            <div className="relative flex items-center gap-4">
              <motion.div
                className={`p-3 rounded-xl bg-gradient-to-br ${project.gradient} shadow-lg`}
                animate={isHovered ? {
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1],
                } : {}}
                transition={{ duration: 0.5 }}
              >
                <project.icon className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3 className="font-display font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <motion.div
                  className="h-0.5 bg-gradient-to-r from-primary to-accent rounded-full mt-1"
                  initial={{ width: 0 }}
                  animate={isHovered ? { width: "100%" } : { width: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col relative">
            <p className="text-muted-foreground text-sm leading-relaxed flex-1">
              {project.description}
            </p>

            {/* Tech stack with staggered animation */}
            <div className="flex flex-wrap gap-2 mt-6">
              {project.tech.map((tech, techIndex) => (
                <motion.span
                  key={tech}
                  className="text-xs px-3 py-1 rounded-full bg-muted/50 text-muted-foreground border border-white/5 hover:border-primary/30 hover:text-primary transition-all cursor-default"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + techIndex * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* Actions */}
            <motion.div
              className="flex gap-3 mt-6 pt-6 border-t border-white/5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <MagneticButton strength={0.15} className="flex-1">
                <Button
                  variant="neon"
                  size="sm"
                  className="w-full font-bold uppercase tracking-wide group/btn overflow-hidden relative"
                  asChild
                >
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <span className="relative z-10 flex items-center justify-center">
                      <Github className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                      View Code
                    </span>
                  </a>
                </Button>
              </MagneticButton>

              <MagneticButton strength={0.15}>
                <Button
                  variant="glass"
                  size="sm"
                  className="font-bold uppercase tracking-wide"
                  asChild
                >
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Eye className="w-4 h-4" />
                  </a>
                </Button>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Hover overlay with arrow */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm opacity-0 pointer-events-none"
            animate={isHovered ? { opacity: 0 } : { opacity: 0 }}
          >
            <ArrowRight className="w-12 h-12 text-primary" />
          </motion.div>
        </motion.div>
      </TiltCard>
    </AnimatedSection>
  );
};

export const Projects = () => {
  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

      {/* Animated grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `
          linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
          linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px'
      }} />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px]"
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[150px]"
        animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 md:px-6 relative">
        <AnimatedSection className="text-center mb-16">
          <motion.span
            className="text-primary text-sm font-bold uppercase tracking-[0.3em] inline-block"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Portfolio
          </motion.span>
          <h2 className="section-title mt-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="section-subtitle mx-auto mt-6">
            Innovative solutions built with cutting-edge technologies
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <AnimatedSection delay={0.6} className="text-center mt-16">
          <MagneticButton strength={0.2}>
            <Button
              variant="glass"
              size="lg"
              className="group font-bold uppercase tracking-wide"
              asChild
            >
              <a href="https://github.com/The-ChandanKV" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                View All Projects on GitHub
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </Button>
          </MagneticButton>
        </AnimatedSection>
      </div>
    </section>
  );
};
