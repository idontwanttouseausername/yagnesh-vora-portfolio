import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { type Project } from "@shared/schema";

interface PortfolioCardProps {
  project: Project;
}

export default function PortfolioCard({ project }: PortfolioCardProps) {
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
    <Link href={`/project/${project.id}`} data-testid={`link-project-${project.id}`}>
      <motion.div
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="project-card glass-morphism rounded-2xl overflow-hidden group cursor-pointer"
        data-testid={`project-card-${project.id}`}
      >
      <div className="relative overflow-hidden">
        <motion.img 
          src={project.imageUrl} 
          alt={project.title}
          className={`w-full h-64 transition-transform duration-300 group-hover:scale-110 ${
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
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2" data-testid={`project-title-${project.id}`}>
          {project.title}
        </h3>
        <p className="text-gray-400 mb-4" data-testid={`project-description-${project.id}`}>
          {project.description}
        </p>
        
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, index) => (
              <span 
                key={index} 
                className="text-xs bg-white/10 px-2 py-1 rounded-full text-gray-300"
                data-testid={`project-tag-${project.id}-${index}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <span 
            className="text-coral text-sm font-semibold"
            data-testid={`project-category-${project.id}`}
          >
            {getCategoryLabel(project.category)}
          </span>
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
