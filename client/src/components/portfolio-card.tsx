import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { type Project } from "@shared/schema";

interface PortfolioCardProps {
  project: Project;
  isFeatured?: boolean;
}

export default function PortfolioCard({ project, isFeatured = false }: PortfolioCardProps) {
  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      ux: "UX Design",
      photography: "Photography",
      videography: "Videography",
      design: "Graphic Design",
    };
    return labels[category] || category;
  };

  return (
    <Link href={`/project/${project.id}`} className="h-full block" data-testid={`link-project-${project.id}`}>
      <motion.div
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="project-card glass-morphism rounded-2xl overflow-hidden group cursor-pointer h-full flex flex-col"
        data-testid={`project-card-${project.id}`}
      >
      <div className="relative overflow-hidden flex-shrink-0">
        <motion.img 
          src={project.imageUrl} 
          alt={project.title}
          className={`w-full transition-transform duration-300 group-hover:scale-110 ${
            isFeatured 
              ? 'h-64 sm:h-72 md:h-80 lg:h-96' 
              : 'h-40 sm:h-48 md:h-64'
          } ${
            project.title === 'Skillry' 
              ? 'object-cover bg-gray-900' 
              : project.title === 'Meet and Eat'
              ? 'object-cover object-center'
              : 'object-cover'
          }`}
          whileHover={{ scale: 1.1 }}
          data-testid={`project-image-${project.id}`}
          onError={(e) => {
            console.error('Image failed to load:', project.imageUrl);
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className={`flex-1 flex flex-col ${isFeatured ? 'p-6 md:p-8 min-h-[200px]' : 'p-3 sm:p-4 md:p-6'}`}>
        <h3 className={`font-semibold mb-1 sm:mb-2 ${
          isFeatured 
            ? 'text-xl sm:text-2xl md:text-3xl mb-3 md:mb-4' 
            : 'text-sm sm:text-lg md:text-xl'
        }`} data-testid={`project-title-${project.id}`}>
          {project.title}
        </h3>
        <p className={`text-gray-400 mb-2 sm:mb-4 flex-1 ${
          isFeatured 
            ? 'text-base md:text-lg line-clamp-3 leading-relaxed' 
            : 'text-xs sm:text-sm md:text-base line-clamp-2'
        }`} data-testid={`project-description-${project.id}`}>
          {project.description}
        </p>
        
        {project.tags && project.tags.length > 0 && !isFeatured && (
          <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-4">
            {project.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index} 
                className="bg-white/10 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-gray-300 text-xs"
                data-testid={`project-tag-${project.id}-${index}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex justify-end items-center mt-auto">
          <motion.div
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight className="text-coral group-hover:translate-x-2 transition-transform duration-300" size={20} />
          </motion.div>
        </div>
      </div>
    </motion.div>
    </Link>
  );
}
