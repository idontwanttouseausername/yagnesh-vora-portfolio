import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-dark"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0">
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-primary rounded-full opacity-20"
        />
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-secondary rounded-full opacity-30"
        />
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-coral opacity-20 rounded-full"
        />
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-8xl font-black mb-6"
            style={{ fontFamily: 'Inter, sans-serif' }}
            data-testid="hero-title"
          >
            <span className="bg-gradient-primary bg-clip-text text-transparent">Yagnesh</span>
            <br />
            <span className="text-white">Vora</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 font-light"
            data-testid="hero-subtitle"
          >
            Multimedia Designer • UX Designer • Photographer • Videographer
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("#portfolio")}
              className="bg-gradient-primary hover:shadow-2xl px-8 py-4 rounded-full font-semibold transition-all duration-300"
              data-testid="button-view-work"
            >
              View My Work
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("#contact")}
              className="glass-morphism hover:bg-white/20 px-8 py-4 rounded-full font-semibold transition-all duration-300"
              data-testid="button-get-in-touch"
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        data-testid="scroll-indicator"
      >
        <ChevronDown className="text-coral text-2xl" />
      </motion.div>
    </section>
  );
}
