import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { ArrowLeft, ExternalLink, Calendar, User, Wrench, Figma, Trello, Video, Scissors, Layout } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ImageModal from "@/components/ImageModal";
import type { Project } from "@shared/schema";

export default function ProjectPage() {
  const [, params] = useRoute("/project/:id");
  const projectId = params?.id;
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to get technology icon
  const getTechIcon = (tech: string) => {
    const techLower = tech.toLowerCase();
    if (techLower.includes('figma')) return <Figma className="w-4 h-4" />;
    if (techLower.includes('trello')) return <Trello className="w-4 h-4" />;
    if (techLower.includes('davinci') || techLower.includes('resolve')) return <Video className="w-4 h-4" />;
    if (techLower.includes('capcut')) return <Scissors className="w-4 h-4" />;
    if (techLower.includes('miro')) return <Layout className="w-4 h-4" />;
    return <Wrench className="w-4 h-4" />; // Default icon
  };

  const { data: project, isLoading, error } = useQuery<Project>({
    queryKey: ["/api/projects", projectId],
    enabled: !!projectId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto px-6 py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-700 rounded w-1/4 mb-6"></div>
            <div className="h-16 bg-slate-700 rounded w-3/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="h-96 bg-slate-700 rounded"></div>
              <div className="space-y-4">
                <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                <div className="h-4 bg-slate-700 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Project Not Found</h1>
          <p className="text-slate-300 mb-8">The project you're looking for doesn't exist.</p>
          <Link href="/">
            <Button data-testid="button-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" data-testid="link-home">
              <Button variant="ghost" className="hover:text-coral-400 hover:bg-transparent p-2 md:px-4 md:py-2 text-[#ffffff] bg-[#787878]">
                <ArrowLeft className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Back to Portfolio</span>
              </Button>
            </Link>
            <h2 className="text-lg md:text-xl font-bold text-white truncate ml-4">{project.title}</h2>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Hero Section */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6" data-testid="text-project-title">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-6 md:mb-8 px-4" data-testid="text-project-description">
              {project.detailedDescription || project.description}
            </p>
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {project.tags?.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="bg-slate-700/50 text-slate-300 hover:bg-slate-600/50"
                  data-testid={`badge-tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-12 md:mb-16">
            {/* Project Details */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 md:p-6 lg:sticky lg:top-24">
                <h3 className="text-xl font-bold text-white mb-6">Project Details</h3>
                
                {project.duration && (
                  <div className="flex items-center gap-3 mb-4" data-testid="project-duration">
                    <Calendar className="w-5 h-5 text-coral-400" />
                    <div>
                      <p className="text-sm text-slate-400">Duration</p>
                      <p className="text-white">{project.duration}</p>
                    </div>
                  </div>
                )}

                {project.role && (
                  <div className="flex items-center gap-3 mb-4" data-testid="project-role">
                    <User className="w-5 h-5 text-coral-400" />
                    <div>
                      <p className="text-sm text-slate-400">Role</p>
                      <p className="text-white">{project.role}</p>
                    </div>
                  </div>
                )}

                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex items-start gap-3 mb-4" data-testid="project-technologies">
                    <Wrench className="w-5 h-5 text-coral-400 mt-1" />
                    <div>
                      <p className="text-sm text-slate-400 mb-2">Technologies</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge 
                            key={tech}
                            variant="outline" 
                            className="text-xs border-slate-600 text-slate-300 flex items-center gap-1.5 px-2.5 py-1"
                            data-testid={`badge-tech-${tech.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {getTechIcon(tech)}
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {project.projectUrl && (
                  <Button asChild className="w-full mt-6" data-testid="button-project-link">
                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Live Project
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-2">
              {/* Project Sections - Now at the top */}
              <div className="space-y-8 md:space-y-12 mb-12 md:mb-16">
                {project.challenges && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    data-testid="project-challenges"
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Challenges</h3>
                    <div className="bg-slate-800/30 rounded-lg p-4 md:p-6">
                      <p className="text-slate-300 leading-relaxed">
                        {project.title === 'Meet and Eat'
                          ? "Design and build a working app in just 3 weeks that fosters cultural exchange and connections among university students through food."
                          : project.title === 'Skillry' 
                          ? "Creating a unified experience for diverse sports while maintaining sport-specific coaching methodologies. To improve the chat functionality for the athlete and coach"
                          : project.challenges
                        }
                      </p>
                    </div>
                  </motion.div>
                )}

                {project.solutions && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    data-testid="project-solutions"
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Solutions</h3>
                    <div className="bg-slate-800/30 rounded-lg p-4 md:p-6">
                      <p className="text-slate-300 leading-relaxed">
                        {project.title === 'Meet and Eat'
                          ? "Created Meet and Eat, an app that enables students to share and explore diverse cuisines while forming meaningful social connections."
                          : project.title === 'Skillry' 
                          ? "Devised a seamless user flow using personas each for the athlete and the coach."
                          : project.solutions
                        }
                      </p>
                    </div>
                  </motion.div>
                )}

                {project.outcomes && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    data-testid="project-outcomes"
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Outcomes & Impact</h3>
                    <div className="bg-slate-800/30 rounded-lg p-4 md:p-6">
                      <p className="text-slate-300 leading-relaxed">
                        {project.title === 'Skillry' 
                          ? "Successfully launched the version 0.6 of the app in Q3 of 2024 with an improved and seamless user experience for the users and the coaches end of the app."
                          : project.outcomes
                        }
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Image Gallery - Now at the bottom */}
              {project.projectImages && project.projectImages.length > 0 && (
                <div className="mb-8 md:mb-12" data-testid="project-gallery">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Project Gallery</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {project.projectImages.map((image, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="relative group cursor-pointer"
                        data-testid={`image-gallery-${index}`}
                        onClick={() => {
                          setCurrentImageIndex(index);
                          setModalOpen(true);
                        }}
                      >
                        {image.endsWith('.mov') || image.endsWith('.mp4') ? (
                          <>
                            <video
                              src={image}
                              className="w-full h-48 md:h-64 object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                              muted
                              preload="metadata"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <div className="text-white text-sm font-medium flex items-center gap-2">
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                                Play Video
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <img
                              src={image}
                              alt={`${project.title} screenshot ${index + 1}`}
                              className="w-full h-48 md:h-64 object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = `https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600`;
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <div className="text-white text-sm font-medium">Click to view details</div>
                            </div>
                          </>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>


        </motion.div>

        {/* Image Modal */}
        {project.projectImages && (
          <ImageModal
            images={project.projectImages}
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            currentIndex={currentImageIndex}
            onNavigate={setCurrentImageIndex}
            projectTitle={project.title}
          />
        )}
      </div>
    </div>
  );
}