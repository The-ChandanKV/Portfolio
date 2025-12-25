import { motion } from "framer-motion";
import { ExpandableNavbar } from "@/components/ExpandableNavbar";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { ParticleBackground } from "@/components/ParticleBackground";

const pageVariants = {
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
};

const AboutPage = () => {
  return (
    <motion.div
      className="relative min-h-screen noise"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <ParticleBackground />
      <ParallaxBackground />
      <ExpandableNavbar />
      <main className="pt-24">
        <About />
      </main>
      <Footer />
    </motion.div>
  );
};

export default AboutPage;
