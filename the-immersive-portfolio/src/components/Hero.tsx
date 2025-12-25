import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MagneticButton } from "./MagneticButton";
import { CharacterReveal, TextReveal } from "./TextReveal";
import profileImage from "@/assets/profile.jpg";
import { useRef } from "react";

export const Hero = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.85]);
  const y = useTransform(scrollY, [0, 400], [0, 100]);

  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [0, 400], [5, -5]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [0, 400], [-5, 5]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Chandan-K-V-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 bg-primary/30 rounded-full blur-[150px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent/30 rounded-full blur-[150px]"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[200px]"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 container mx-auto px-4 md:px-6"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block"
            >
              <motion.span
                className="px-4 py-2 rounded-full glass text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2"
                animate={{ boxShadow: ["0 0 20px hsl(185 100% 50% / 0.2)", "0 0 40px hsl(185 100% 50% / 0.4)", "0 0 20px hsl(185 100% 50% / 0.2)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4" />
                Full-Stack Developer & AI/ML Enthusiast
                <Sparkles className="w-4 h-4" />
              </motion.span>
            </motion.div>

            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                style={{ perspective: 1000 }}
              >
                <motion.h1
                  className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold leading-none tracking-tight"
                  style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                >
                  <TextReveal text="HI, I'M" className="block mb-2" delay={0.5} />
                  <motion.span
                    className="text-gradient inline-block"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                    style={{ backgroundSize: "200% auto" }}
                  >
                    <CharacterReveal text="CHANDAN K V" delay={0.8} stagger={0.05} />
                  </motion.span>
                </motion.h1>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed"
            >
              Information Science undergraduate building <span className="text-primary">intelligent</span>, full-stack applications.
              <span className="text-accent"> President of Coder's Club</span> & passionate about AI/ML innovations.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <MagneticButton strength={0.2}>
                <Link to="/projects">
                  <Button
                    variant="hero"
                    size="xl"
                    className="font-bold uppercase tracking-wider relative overflow-hidden group"
                    data-cursor-hover
                    data-cursor-text="View"
                  >
                    <span className="relative z-10">View My Work</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary to-accent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </Link>
              </MagneticButton>

              <MagneticButton strength={0.2}>
                <Button
                  variant="neon"
                  size="xl"
                  onClick={handleDownloadResume}
                  className="font-bold uppercase tracking-wider group"
                  data-cursor-hover
                >
                  <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  Download Resume
                </Button>
              </MagneticButton>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="flex gap-4 justify-center lg:justify-start"
            >
              {[
                { icon: Github, href: "https://github.com/The-ChandanKV", label: "GitHub", color: "group-hover:text-white" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", color: "group-hover:text-[#0077b5]" },
                { icon: Mail, href: "mailto:thechandankv@gmail.com", label: "Email", color: "group-hover:text-primary" },
              ].map((social, index) => (
                <MagneticButton key={social.label} strength={0.3}>
                  <motion.a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-full glass hover:border-primary/50 transition-all duration-300 group relative overflow-hidden"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6 + index * 0.1 }}
                    data-cursor-hover
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"
                      initial={{ scale: 0, borderRadius: "100%" }}
                      whileHover={{ scale: 1.5, borderRadius: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                    <social.icon className={`w-5 h-5 text-muted-foreground ${social.color} transition-colors relative z-10`} />
                  </motion.a>
                </MagneticButton>
              ))}
            </motion.div>
          </div>

          {/* Profile Image with 3D effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative flex justify-center lg:justify-end"
            style={{ perspective: 1000 }}
          >
            <motion.div
              className="relative"
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            >
              {/* Multiple glow layers */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent blur-3xl opacity-40 scale-110"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1.1, 1.2, 1.1],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Rotating border rings */}
              <motion.div
                className="absolute inset-[-10px] rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, hsl(185 100% 50% / 0.8), transparent 30%, transparent 70%, hsl(280 85% 55% / 0.8))",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />

              <motion.div
                className="absolute inset-[-20px] rounded-full"
                style={{
                  background: "conic-gradient(from 180deg, hsl(280 85% 55% / 0.5), transparent 30%, transparent 70%, hsl(185 100% 50% / 0.5))",
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />

              {/* Profile image */}
              <motion.div
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden glass p-2"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                style={{ transform: "translateZ(50px)" }}
              >
                <img
                  src={profileImage}
                  alt="Chandan K V"
                  className="w-full h-full rounded-full object-cover"
                />

                {/* Shine effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-full"
                  initial={{ x: "-100%", y: "-100%" }}
                  whileHover={{ x: "100%", y: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>

              {/* Floating badges with 3D depth */}
              <motion.div
                className="absolute -top-4 -right-4 px-4 py-2 rounded-full glass text-sm font-bold shadow-lg"
                animate={{
                  y: [0, -15, 0],
                  rotateZ: [0, 5, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ transform: "translateZ(80px)" }}
              >
                <span className="text-gradient">9.06 CGPA</span>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 px-4 py-2 rounded-full glass text-sm font-bold shadow-lg"
                animate={{
                  y: [0, 15, 0],
                  rotateZ: [0, -5, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                style={{ transform: "translateZ(80px)" }}
              >
                <span className="text-accent">President - Coder's Club</span>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-16 px-3 py-1 rounded-full glass text-xs font-bold"
                animate={{
                  x: [0, 10, 0],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                style={{ transform: "translateZ(60px)" }}
              >
                <span className="text-primary">AI/ML</span>
              </motion.div>

              {/* Orbiting particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-primary/60"
                  style={{
                    top: "50%",
                    left: "50%",
                  }}
                  animate={{
                    x: [0, Math.cos((i * 60 * Math.PI) / 180) * 200],
                    y: [0, Math.sin((i * 60 * Math.PI) / 180) * 200],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeOut",
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <MagneticButton strength={0.4}>
          <motion.button
            onClick={() => scrollToSection('about')}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
            whileHover={{ scale: 1.1 }}
            data-cursor-hover
          >
            <motion.span
              className="text-xs uppercase tracking-[0.3em] font-bold"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Scroll to Explore
            </motion.span>
            <motion.div
              className="w-6 h-10 rounded-full border-2 border-current flex justify-center pt-2"
              animate={{ borderColor: ["hsl(var(--muted-foreground))", "hsl(var(--primary))", "hsl(var(--muted-foreground))"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-2 rounded-full bg-current"
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </motion.button>
        </MagneticButton>
      </motion.div>
    </section>
  );
};
