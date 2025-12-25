import { motion, useScroll, useTransform } from "framer-motion";

export const ParallaxBackground = () => {
  const { scrollY } = useScroll();
  
  // Different parallax speeds for depth
  const y1 = useTransform(scrollY, [0, 3000], [0, -600]);
  const y2 = useTransform(scrollY, [0, 3000], [0, -400]);
  const y3 = useTransform(scrollY, [0, 3000], [0, -200]);
  const y4 = useTransform(scrollY, [0, 3000], [0, -800]);
  
  const rotate1 = useTransform(scrollY, [0, 3000], [0, 180]);
  const rotate2 = useTransform(scrollY, [0, 3000], [0, -120]);
  const scale1 = useTransform(scrollY, [0, 1500], [1, 1.5]);
  const scale2 = useTransform(scrollY, [0, 2000], [1, 0.7]);
  const opacity1 = useTransform(scrollY, [0, 1000], [0.4, 0.2]);
  const opacity2 = useTransform(scrollY, [0, 1500], [0.3, 0.5]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dot pattern layer */}
      <div className="absolute inset-0 dot-pattern opacity-20" />
      
      {/* Primary orb - large, slow moving */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]"
        style={{ y: y1, scale: scale1, opacity: opacity1 }}
      />
      
      {/* Accent orb - medium, faster */}
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/15 blur-[100px]"
        style={{ y: y2, scale: scale2, opacity: opacity2 }}
      />
      
      {/* Secondary orb - small, mid-layer */}
      <motion.div
        className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-secondary/20 blur-[80px]"
        style={{ y: y3 }}
      />
      
      {/* Floating geometric shapes with parallax */}
      <motion.div
        className="absolute top-[15%] right-[15%] w-24 h-24 border-2 border-primary/20 rounded-lg"
        style={{ y: y4, rotate: rotate1 }}
      />
      
      <motion.div
        className="absolute top-[60%] left-[10%] w-20 h-20 border-2 border-accent/20 rounded-full"
        style={{ y: y2, rotate: rotate2 }}
      />
      
      <motion.div
        className="absolute top-[40%] right-[8%] w-16 h-16 border border-primary/15"
        style={{ 
          y: y3, 
          rotate: rotate1,
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)"
        }}
      />
      
      <motion.div
        className="absolute bottom-[20%] left-[20%] w-32 h-32 border border-accent/10 rounded-lg"
        style={{ y: y1, rotate: rotate2 }}
      />
      
      <motion.div
        className="absolute top-[75%] right-[25%] w-12 h-12 bg-primary/5 rounded-full"
        style={{ y: y4 }}
      />
      
      {/* Grid lines for depth */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{ y: y3 }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }} />
      </motion.div>
    </div>
  );
};
