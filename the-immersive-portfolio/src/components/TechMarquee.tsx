import { motion } from "framer-motion";
import { Code2, Database, Server, Brain, Palette, Wrench, Sparkles } from "lucide-react";

const technologies = [
  { name: "React", icon: Code2, color: "text-cyan-400" },
  { name: "TypeScript", icon: Code2, color: "text-blue-400" },
  { name: "Python", icon: Code2, color: "text-yellow-400" },
  { name: "Flask", icon: Server, color: "text-white" },
  { name: "Django", icon: Server, color: "text-emerald-400" },
  { name: "Node.js", icon: Server, color: "text-green-400" },
  { name: "MongoDB", icon: Database, color: "text-green-500" },
  { name: "MySQL", icon: Database, color: "text-blue-500" },
  { name: "Firebase", icon: Database, color: "text-orange-400" },
  { name: "Scikit-learn", icon: Brain, color: "text-orange-500" },
  { name: "Pandas", icon: Brain, color: "text-purple-400" },
  { name: "TensorFlow", icon: Brain, color: "text-orange-400" },
  { name: "Tailwind CSS", icon: Palette, color: "text-cyan-400" },
  { name: "Next.js", icon: Code2, color: "text-white" },
  { name: "Git", icon: Wrench, color: "text-orange-500" },
  { name: "Docker", icon: Wrench, color: "text-blue-400" },
];

export const TechMarquee = () => {
  return (
    <section className="py-12 relative overflow-hidden border-y border-white/5">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-secondary/5 to-background" />

      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />

      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

      {/* Title */}
      <motion.div
        className="text-center mb-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-bold uppercase tracking-widest text-primary">
          <Sparkles className="w-4 h-4" />
          Technologies I Work With
          <Sparkles className="w-4 h-4" />
        </span>
      </motion.div>

      {/* First row - moving left */}
      <div className="flex overflow-hidden mb-4">
        <motion.div
          className="flex gap-8 items-center"
          animate={{ x: [0, "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          {[...technologies, ...technologies].map((tech, index) => (
            <motion.div
              key={`${tech.name}-${index}`}
              className="flex items-center gap-3 px-6 py-3 rounded-full glass whitespace-nowrap group cursor-default"
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <tech.icon className={`w-5 h-5 ${tech.color} group-hover:scale-110 transition-transform`} />
              </motion.div>
              <span className="font-medium group-hover:text-primary transition-colors">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Second row - moving right */}
      <div className="flex overflow-hidden">
        <motion.div
          className="flex gap-8 items-center"
          animate={{ x: ["-50%", 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...technologies.reverse(), ...technologies].map((tech, index) => (
            <motion.div
              key={`${tech.name}-reverse-${index}`}
              className="flex items-center gap-3 px-6 py-3 rounded-full glass whitespace-nowrap group cursor-default"
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <tech.icon className={`w-5 h-5 ${tech.color} group-hover:scale-110 transition-transform`} />
              </motion.div>
              <span className="font-medium group-hover:text-primary transition-colors">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
