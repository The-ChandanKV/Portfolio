import { motion } from "framer-motion";
import { ExpandableNavbar } from "@/components/ExpandableNavbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { TechMarquee } from "@/components/TechMarquee";
import { Footer } from "@/components/Footer";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <motion.div
      className="relative min-h-screen noise"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background layers */}
      <ParticleBackground />
      <ParallaxBackground />

      {/* Navigation */}
      <ExpandableNavbar />

      {/* Main content */}
      <main>
        <Hero />
        <TechMarquee />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast notifications */}
      <Toaster />
    </motion.div>
  );
};

export default Index;
