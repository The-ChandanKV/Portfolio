import { motion, useMotionValue, useSpring } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import { Mail, Phone, MapPin, Send, Github, Linkedin, ArrowUpRight, Sparkles, MessageSquare, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { toast } from "@/hooks/use-toast";
import { TiltCard } from "./TiltCard";
import { MagneticButton } from "./MagneticButton";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "thechandankv@gmail.com",
    href: "mailto:thechandankv@gmail.com",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9686316376",
    href: "tel:+919686316376",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Bangalore, India",
    href: "#",
    color: "from-orange-500 to-amber-500",
  },
];

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/The-ChandanKV",
    color: "from-gray-500 to-gray-700",
    hoverColor: "group-hover:text-white",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com",
    color: "from-blue-500 to-blue-700",
    hoverColor: "group-hover:text-[#0077b5]",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:thechandankv@gmail.com",
    color: "from-primary to-accent",
    hoverColor: "group-hover:text-primary",
  },
];

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!formRef.current) return;
    const rect = formRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create mailto link with form data
    const subject = `Portfolio Contact from ${formData.name}`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    window.location.href = `mailto:thechandankv@gmail.com?subject=${subject}&body=${body}`;

    setIsSubmitting(false);

    toast({
      title: "Opening email client...",
      description: "Your message details have been pre-filled.",
    });
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/5 to-transparent" />

      {/* Animated orbs */}
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-accent/10 blur-[150px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-20 left-20 w-80 h-80 rounded-full bg-primary/10 blur-[150px]"
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.3, 0.2, 0.3],
          y: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating shapes */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-16 h-16 border border-primary/20 rounded-lg"
        animate={{ rotate: 360, y: [0, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-12 h-12 border border-accent/20 rounded-full"
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
            Contact
          </motion.span>
          <h2 className="section-title mt-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="section-subtitle mx-auto mt-6">
            Have a project in mind or want to collaborate? Let's talk!
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <AnimatedSection direction="left" delay={0.2}>
            <div className="space-y-6">
              {/* Info cards */}
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <MagneticButton key={item.label} strength={0.1}>
                    <motion.a
                      href={item.href}
                      className="glass-hover rounded-xl p-5 flex items-center gap-4 group relative overflow-hidden block"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 10, scale: 1.02 }}
                    >
                      {/* Gradient background */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-5 transition-opacity`}
                      />

                      {/* Shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                      />

                      <motion.div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        <item.icon className="w-5 h-5 text-white" />
                      </motion.div>
                      <div className="relative">
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="font-medium group-hover:text-primary transition-colors">
                          {item.value}
                        </p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </motion.a>
                  </MagneticButton>
                ))}
              </div>

              {/* Social links */}
              <TiltCard tiltMax={5}>
                <div className="glass rounded-xl p-6 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"
                  />
                  <h4 className="font-display font-semibold mb-4 relative flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Follow Me
                  </h4>
                  <div className="flex gap-3 relative">
                    {socialLinks.map((social, index) => (
                      <MagneticButton key={social.label} strength={0.3}>
                        <motion.a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 rounded-xl glass group relative overflow-hidden"
                          whileHover={{ scale: 1.1, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-20 transition-opacity`}
                          />
                          <social.icon className={`w-5 h-5 relative ${social.hoverColor} transition-colors`} />
                        </motion.a>
                      </MagneticButton>
                    ))}
                  </div>
                </div>
              </TiltCard>

              {/* Quick facts */}
              <TiltCard tiltMax={5}>
                <div className="glass rounded-xl p-6 relative overflow-hidden">
                  <h4 className="font-display font-semibold mb-4 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-accent" />
                    Quick Facts
                  </h4>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {[
                      { text: "Open to internships and freelance opportunities", color: "bg-primary" },
                      { text: "Available for hackathons and collaborations", color: "bg-accent" },
                      { text: "Interested in AI/ML and Full-Stack projects", color: "bg-emerald-500" },
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center gap-3 group cursor-default"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ x: 5 }}
                      >
                        <motion.span
                          className={`w-2 h-2 rounded-full ${item.color}`}
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        />
                        <span className="group-hover:text-foreground transition-colors">{item.text}</span>
                        <CheckCircle className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection direction="right" delay={0.3}>
            <TiltCard tiltMax={3}>
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                onMouseMove={handleMouseMove}
                className="glass rounded-2xl p-8 relative overflow-hidden"
              >
                {/* Spotlight effect */}
                <motion.div
                  className="absolute inset-0 opacity-50 pointer-events-none"
                  style={{
                    background: `radial-gradient(400px circle at ${mouseX}px ${mouseY}px, hsl(var(--primary) / 0.1), transparent 40%)`,
                  }}
                />

                <h3 className="font-display font-bold text-2xl mb-6 relative flex items-center gap-2">
                  <Send className="w-6 h-6 text-primary" />
                  Send a Message
                </h3>

                <div className="space-y-5 relative">
                  {/* Name field */}
                  <div className="relative">
                    <motion.label
                      className={`block text-sm font-medium mb-2 transition-colors ${focusedField === 'name' ? 'text-primary' : ''
                        }`}
                      animate={focusedField === 'name' ? { x: 5 } : { x: 0 }}
                    >
                      Name
                    </motion.label>
                    <motion.div
                      className="relative"
                      whileFocus={{ scale: 1.01 }}
                    >
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/50"
                        placeholder="Your name"
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: focusedField === 'name' ? '100%' : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </div>

                  {/* Email field */}
                  <div className="relative">
                    <motion.label
                      className={`block text-sm font-medium mb-2 transition-colors ${focusedField === 'email' ? 'text-primary' : ''
                        }`}
                      animate={focusedField === 'email' ? { x: 5 } : { x: 0 }}
                    >
                      Email
                    </motion.label>
                    <motion.div className="relative">
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/50"
                        placeholder="your@email.com"
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: focusedField === 'email' ? '100%' : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </div>

                  {/* Message field */}
                  <div className="relative">
                    <motion.label
                      className={`block text-sm font-medium mb-2 transition-colors ${focusedField === 'message' ? 'text-primary' : ''
                        }`}
                      animate={focusedField === 'message' ? { x: 5 } : { x: 0 }}
                    >
                      Message
                    </motion.label>
                    <motion.div className="relative">
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none placeholder:text-muted-foreground/50"
                        placeholder="Tell me about your project..."
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: focusedField === 'message' ? '100%' : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </div>

                  <MagneticButton strength={0.1} className="w-full">
                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full group relative overflow-hidden"
                      disabled={isSubmitting}
                    >
                      <motion.span
                        className="relative z-10 flex items-center justify-center"
                        animate={isSubmitting ? { opacity: 0 } : { opacity: 1 }}
                      >
                        <Send className="w-5 h-5 mr-2 group-hover:rotate-12 group-hover:translate-x-1 transition-transform" />
                        Send Message
                      </motion.span>

                      {isSubmitting && (
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <motion.div
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                        </motion.div>
                      )}

                      {/* Animated background on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </Button>
                  </MagneticButton>
                </div>
              </form>
            </TiltCard>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
