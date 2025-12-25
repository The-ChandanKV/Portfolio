import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticleBackground } from "@/components/ParticleBackground";
import { MagneticButton } from "@/components/MagneticButton";

const NotFound = () => {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ParticleBackground />

      {/* Animated background orbs */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[150px]"
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[150px]"
        animate={{ scale: [1.2, 1, 1.2], y: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="text-center relative z-10 px-4">
        {/* Animated 404 */}
        <motion.div
          className="relative"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <motion.h1
            className="text-[150px] md:text-[200px] font-display font-black text-gradient leading-none"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{ backgroundSize: "200% auto" }}
          >
            404
          </motion.h1>

          {/* Floating sparkles */}
          <motion.div
            className="absolute -top-4 -right-4"
            animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-8 h-8 text-primary" />
          </motion.div>
          <motion.div
            className="absolute -bottom-4 -left-4"
            animate={{ rotate: [360, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sparkles className="w-6 h-6 text-accent" />
          </motion.div>
        </motion.div>

        <motion.h2
          className="text-2xl md:text-3xl font-display font-bold mt-4 mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Oops! Page Not Found
        </motion.h2>

        <motion.p
          className="text-muted-foreground max-w-md mx-auto mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track!
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <MagneticButton strength={0.2}>
            <Button
              variant="hero"
              size="lg"
              className="group"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </Button>
          </MagneticButton>

          <MagneticButton strength={0.2}>
            <Link to="/">
              <Button variant="neon" size="lg" className="group">
                <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Back to Home
              </Button>
            </Link>
          </MagneticButton>
        </motion.div>

        {/* Animated decorative elements */}
        <motion.div
          className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-[400px] h-[400px] border border-primary/10 rounded-full" />
        </motion.div>
        <motion.div
          className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-[500px] h-[500px] border border-accent/10 rounded-full" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFound;
