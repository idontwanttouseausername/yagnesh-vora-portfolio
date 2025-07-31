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
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left">
              <motion.h1 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-5xl md:text-7xl font-black mb-6"
                style={{ fontFamily: 'Inter, sans-serif' }}
                data-testid="hero-title"
              >
                <span className="bg-gradient-primary bg-clip-text text-transparent">Yagnesh</span>
                <br />
                <span className="text-white">Vora</span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mb-8"
              >
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-4" data-testid="hero-intro">
                  Hi, I am Yagnesh. A multimedia specialist with a masters degree in Interaction Design. 
                  With a recent internship as a UX Designer, I have extensive experience in CX Research, 
                  advertising, customer service and in the retail industry.
                </p>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed" data-testid="hero-description">
                  I bring warmth and embrace diversity in a team, respecting all opinions and connecting with everyone 
                  openly. I consistently refine my communication skills to match my creativity and enjoy exploring new ideas 
                  with peers. Adaptable and flexible, I adjust to any opportunities in a changing world.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection("#portfolio")}
                  className="w-full sm:w-auto bg-gradient-primary hover:shadow-2xl px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base"
                  data-testid="button-view-work"
                >
                  View My Work
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection("#contact")}
                  className="w-full sm:w-auto glass-morphism hover:bg-white/20 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base"
                  data-testid="button-get-in-touch"
                >
                  Get In Touch
                </motion.button>
              </motion.div>
            </div>
            
            {/* Right Content - Photo */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex justify-center lg:justify-end"
            >
              <img 
                src="/IMG_7905.JPG" 
                alt="Yagnesh Vora - Professional Portrait" 
                className="w-64 h-64 lg:w-72 lg:h-72 object-cover rounded-2xl shadow-2xl"
                data-testid="hero-portrait"
              />
            </motion.div>
          </div>
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
