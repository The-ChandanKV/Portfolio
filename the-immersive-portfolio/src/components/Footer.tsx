import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, Heart, ArrowUp, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { MagneticButton } from "./MagneticButton";

const socialLinks = [
  { icon: Github, href: "https://github.com/The-ChandanKV", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:thechandankv@gmail.com", label: "Email" },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Skills", href: "/skills" },
  { name: "Projects", href: "/projects" },
  { name: "Education", href: "/education" },
  { name: "Contact", href: "/contact" },
];

export const Footer = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Animated orb */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[150px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Link to="/" className="inline-block">
              <motion.h3
                className="text-3xl font-display font-black text-gradient"
                whileHover={{ scale: 1.05 }}
              >
                CKV
              </motion.h3>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Full-Stack Developer & AI/ML Enthusiast crafting digital experiences
              that make a difference.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <MagneticButton key={social.label} strength={0.3}>
                  <motion.a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl glass hover:border-primary/50 group relative overflow-hidden"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <social.icon className="w-5 h-5 relative group-hover:text-primary transition-colors" />
                  </motion.a>
                </MagneticButton>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="font-display font-bold text-lg flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Quick Links
            </h4>
            <ul className="grid grid-cols-2 gap-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm inline-flex items-center gap-1 group"
                  >
                    <motion.span
                      className="w-0 h-px bg-primary group-hover:w-2 transition-all"
                    />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Get in Touch */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="font-display font-bold text-lg">Get in Touch</h4>
            <p className="text-muted-foreground text-sm">
              Feel free to reach out for collaborations or just a friendly chat!
            </p>
            <MagneticButton strength={0.2}>
              <motion.a
                href="mailto:thechandankv@gmail.com"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors group"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-4 h-4" />
                thechandankv@gmail.com
                <motion.span
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.a>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-sm text-muted-foreground flex items-center gap-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            © {new Date().getFullYear()} Chandan K V. Crafted with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500 inline" />
            </motion.span>
          </motion.p>

          {/* Back to top button */}
          <MagneticButton strength={0.3}>
            <motion.button
              onClick={scrollToTop}
              className="p-3 rounded-xl glass group relative overflow-hidden"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              style={{ opacity }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <ArrowUp className="w-5 h-5 relative group-hover:text-primary transition-colors" />
            </motion.button>
          </MagneticButton>
        </motion.div>
      </div>
    </footer>
  );
};
