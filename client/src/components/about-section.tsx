import { motion } from "framer-motion";
import { Palette, Camera, Video, PaintbrushVertical, Linkedin, Github, Instagram } from "lucide-react";
import SkillCard from "./skill-card";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();

  const skills = [
    { icon: PaintbrushVertical, name: "UX Design", level: 90, color: "text-coral" },
    { icon: Camera, name: "Photography", level: 85, color: "text-coral" },
    { icon: Video, name: "Videography", level: 80, color: "text-coral" },
    { icon: Palette, name: "Graphic Design", level: 88, color: "text-coral" },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "Behance" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <section id="about" className="py-20 bg-medium-gray bg-opacity-50" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-center mb-16"
            style={{ fontFamily: 'Inter, sans-serif' }}
            data-testid="about-title"
          >
            About <span className="bg-gradient-primary bg-clip-text text-transparent">Me</span>
          </motion.h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-lg text-gray-300 leading-relaxed" data-testid="about-description-1">
                I'm a passionate multimedia designer with expertise in UX design, photography, and videography. 
                I create compelling digital experiences that blend aesthetics with functionality, always focusing 
                on user-centered design principles.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed" data-testid="about-description-2">
                My diverse skill set allows me to approach projects from multiple angles, ensuring cohesive 
                and impactful visual storytelling across all mediums.
              </p>
              
              {/* Skills Grid */}
              <div className="grid grid-cols-2 gap-6 mt-8">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    <SkillCard {...skill} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800" 
                alt="Yagnesh Vora - Professional Portrait" 
                className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
                data-testid="professional-portrait"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-6 -right-6 glass-morphism p-4 rounded-xl"
              >
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-coral hover:text-white transition-colors duration-300"
                      data-testid={`social-link-${social.label.toLowerCase()}`}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
