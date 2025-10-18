import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { type Project } from "@shared/schema";
import PortfolioCard from "./portfolio-card";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useFilter } from "@/hooks/use-filter";

export default function PortfolioSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { activeFilter, setActiveFilter, filteredItems } = useFilter(
    projects,
    (project) => project.category
  );

  // Separate featured UX projects (Skillry and Meet and Eat)
  const featuredUXProjects = projects.filter(project => 
    (project.title === 'Skillry' || project.title === 'Meet and Eat') && 
    (activeFilter === 'all' || project.category === activeFilter)
  );

  const filterButtons = [
    { key: "all", label: "All Projects" },
    { key: "ux", label: "UX Design" },
    { key: "photography", label: "Photography" },
    { key: "videography", label: "Videography" },
    { key: "design", label: "Graphic Design" },
  ];

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex justify-center">
            <div className="text-xl">Loading portfolio...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15, margin: "0px 0px -20% 0px" }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-center mb-16"
            style={{ fontFamily: 'Inter, sans-serif' }}
            data-testid="portfolio-title"
          >
            My <span className="bg-gradient-primary bg-clip-text text-transparent">Portfolio</span>
          </motion.h2>
          
          {/* Filter Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15, margin: "0px 0px -20% 0px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12 px-4"
          >
            {filterButtons.map((button) => (
              <motion.button
                key={button.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(button.key)}
                className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 text-xs sm:text-sm lg:text-base ${
                  activeFilter === button.key
                    ? "bg-gradient-primary"
                    : "glass-morphism hover:bg-white/20"
                }`}
                data-testid={`filter-button-${button.key}`}
              >
                {button.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Featured UX Projects Section */}
          {featuredUXProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15, margin: "0px 0px -20% 0px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-16"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white">
                Featured <span className="bg-gradient-primary bg-clip-text text-transparent">UX Projects</span>
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
                {featuredUXProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="glass-morphism rounded-2xl overflow-hidden shadow-2xl border border-white/20 hover:border-coral/30 transition-all duration-300">
                      <PortfolioCard project={project} isFeatured={true} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          
          {featuredUXProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
              data-testid="no-projects-message"
            >
              <p className="text-gray-400 text-lg">No projects found for this category.</p>
            </motion.div>
          )}

          {/* More Projects Coming Soon */}
          {featuredUXProjects.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.15, margin: "0px 0px -20% 0px" }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center mt-12 px-4"
            >
              <div
                className="glass-morphism px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base inline-block text-slate-300"
                data-testid="text-coming-soon"
              >
                More Projects are coming soon
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
