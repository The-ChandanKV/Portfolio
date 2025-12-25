import { motion, useInView } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import { GraduationCap, Award, Calendar, Trophy, Star, Sparkles } from "lucide-react";
import { TiltCard } from "./TiltCard";
import { useRef } from "react";

const education = [
  {
    institution: "R V Institute of Technology and Management",
    degree: "B.E. in Information Science and Engineering",
    period: "2023 - Present",
    score: "CGPA: 9.06",
    highlight: true,
    color: "from-cyan-500 to-blue-500",
  },
  {
    institution: "Deeksha Center for Learning PU College",
    degree: "12th Boards",
    period: "2021 - 2023",
    score: "93.8%",
    color: "from-purple-500 to-pink-500",
  },
  {
    institution: "Rashtrotthana Vidya Kendra",
    degree: "10th Boards",
    period: "2015 - 2021",
    score: "94.6%",
    color: "from-emerald-500 to-teal-500",
  },
];

const certifications = [
  { name: "Introduction to AI", issuer: "IBM, Coursera", icon: "🤖" },
  { name: "Introduction to Software Engineering", issuer: "IBM, Coursera", icon: "💻" },
  { name: "Generative AI: Introduction and Applications", issuer: "IBM, Coursera", icon: "🧠" },
  { name: "Building Scalable Tech for B2B and B2C", issuer: "Workshop of RVCE", icon: "🏗️" },
  { name: "Runner-Up at VTU Fest Yukthi'25", issuer: "Entrepreneur Competition", icon: "🏆" },
  { name: "Baazigar", issuer: "Christ University's Entrepreneur Event", icon: "🎯" },
];

export const Education = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isTimelineInView = useInView(timelineRef, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-20" />

      {/* Animated orbs */}
      <motion.div
        className="absolute top-1/3 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[150px]"
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-[150px]"
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
            Background
          </motion.span>
          <h2 className="section-title mt-4">
            Education & <span className="text-gradient">Certifications</span>
          </h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education Timeline */}
          <div>
            <AnimatedSection delay={0.1}>
              <h3 className="font-display font-bold text-2xl mb-8 flex items-center gap-3">
                <motion.div
                  className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <GraduationCap className="w-6 h-6 text-white" />
                </motion.div>
                Education
              </h3>
            </AnimatedSection>

            <div className="relative" ref={timelineRef}>
              {/* Animated Timeline line */}
              <motion.div
                className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-transparent"
                initial={{ scaleY: 0 }}
                animate={isTimelineInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{ originY: 0 }}
              />

              <div className="space-y-6">
                {education.map((item, index) => (
                  <AnimatedSection key={item.institution} delay={0.2 + index * 0.15} direction="right">
                    <motion.div
                      className={`relative pl-12 ${item.highlight ? "" : ""
                        } rounded-xl p-6 ml-4 group`}
                      whileHover={{ x: 10 }}
                    >
                      <TiltCard tiltMax={5} glareEnabled={item.highlight}>
                        <div className={`glass-hover rounded-xl p-6 relative overflow-hidden ${item.highlight ? "border border-primary/30" : ""
                          }`}>
                          {/* Background gradient */}
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity`}
                          />

                          {/* Timeline dot */}
                          <motion.div
                            className={`absolute -left-[52px] top-8 w-4 h-4 rounded-full ${item.highlight
                                ? "bg-gradient-to-r from-primary to-accent"
                                : "bg-muted-foreground"
                              } ring-4 ring-background`}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.15, type: "spring", stiffness: 300 }}
                            viewport={{ once: true }}
                          >
                            {item.highlight && (
                              <motion.div
                                className="absolute inset-0 rounded-full bg-primary"
                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            )}
                          </motion.div>

                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h4 className="font-display font-semibold text-lg group-hover:text-primary transition-colors">
                              {item.institution}
                            </h4>
                            <motion.span
                              className={`text-sm font-mono px-3 py-1 rounded-full whitespace-nowrap ${item.highlight
                                  ? "bg-gradient-to-r from-primary/20 to-accent/20 text-primary border border-primary/30"
                                  : "bg-muted text-muted-foreground"
                                }`}
                              whileHover={{ scale: 1.05 }}
                            >
                              {item.score}
                            </motion.span>
                          </div>

                          <p className="text-muted-foreground">{item.degree}</p>

                          <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4 text-primary" />
                            {item.period}
                          </div>

                          {item.highlight && (
                            <motion.div
                              className="absolute top-2 right-2"
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                            </motion.div>
                          )}
                        </div>
                      </TiltCard>
                    </motion.div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <AnimatedSection delay={0.1}>
              <h3 className="font-display font-bold text-2xl mb-8 flex items-center gap-3">
                <motion.div
                  className="p-2 rounded-xl bg-gradient-to-br from-accent to-pink-500"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <Award className="w-6 h-6 text-white" />
                </motion.div>
                Certifications & Achievements
              </h3>
            </AnimatedSection>

            <div className="grid gap-3">
              {certifications.map((cert, index) => (
                <AnimatedSection key={cert.name} delay={0.2 + index * 0.08} direction="left">
                  <motion.div
                    className="glass-hover rounded-xl p-4 group cursor-default relative overflow-hidden"
                    whileHover={{ x: -10, scale: 1.02 }}
                  >
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                    />

                    <div className="flex items-start gap-4 relative">
                      <motion.div
                        className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-2xl group-hover:bg-accent/20 transition-colors"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        {cert.icon}
                      </motion.div>
                      <div>
                        <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {cert.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">{cert.issuer}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>

        {/* Positions of Authority */}
        <AnimatedSection delay={0.7} className="mt-16">
          <TiltCard tiltMax={3}>
            <div className="glass rounded-2xl p-8 md:p-10 relative overflow-hidden">
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
                animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                transition={{ duration: 10, repeat: Infinity }}
                style={{ backgroundSize: "200% 200%" }}
              />

              <h3 className="font-display font-bold text-2xl mb-8 text-center relative">
                Positions of <span className="text-gradient">Authority</span>
                <motion.div
                  className="absolute -top-1 -right-8 inline-block"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-6 h-6 text-yellow-500" />
                </motion.div>
              </h3>

              <div className="grid md:grid-cols-2 gap-6 relative">
                {[
                  {
                    title: "President",
                    organization: "Coder's Club",
                    description: "Leading tech initiatives and mentoring students in software development",
                    icon: "👨‍💻",
                    color: "from-cyan-500 to-blue-500",
                  },
                  {
                    title: "Head of Operations",
                    organization: "E-Cell Club",
                    description: "Managing entrepreneurship events and startup ecosystem building",
                    icon: "🚀",
                    color: "from-purple-500 to-pink-500",
                  },
                ].map((position, index) => (
                  <motion.div
                    key={position.title}
                    className={`relative p-6 rounded-xl bg-gradient-to-br ${position.color} bg-opacity-10 border border-white/10 group overflow-hidden`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.03, y: -5 }}
                  >
                    {/* Background gradient visible on hover */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${position.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                    />

                    <div className="relative">
                      <div className="flex items-center gap-3 mb-2">
                        <motion.span
                          className="text-3xl"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                        >
                          {position.icon}
                        </motion.span>
                        <div>
                          <span className="text-primary font-mono text-sm">{position.title}</span>
                          <h4 className="font-display font-bold text-xl">{position.organization}</h4>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm mt-2">{position.description}</p>
                    </div>

                    {/* Trophy icon */}
                    <motion.div
                      className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Trophy className="w-8 h-8 text-yellow-500" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </TiltCard>
        </AnimatedSection>
      </div>
    </section>
  );
};
