import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { ArrowLeft, ExternalLink, Calendar, User, Wrench, Figma, Trello, Video, Scissors, Layout, Home, Mail } from "lucide-react";
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

  // Scroll to top when project page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [projectId]);

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
      <div className="container mx-auto px-4 md:px-6 pt-32 md:pt-32 pb-16">
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
                  className={(project.title === 'Skillry' || project.title === 'Meet and Eat')
                    ? "bg-gradient-to-r from-blue-600/80 to-teal-600/80 text-white hover:from-blue-700/90 hover:to-teal-700/90 border border-blue-400/30" 
                    : "bg-slate-700/50 text-slate-300 hover:bg-slate-600/50"
                  }
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
                      {project.title === 'Skillry' ? (
                        <ul className="text-slate-300 leading-relaxed list-disc list-inside space-y-2">
                          <li>Evaluate the chat section and redesign to improve the user flow to make a coaching request</li>
                        </ul>
                      ) : project.title === 'Meet and Eat' ? (
                        <ul className="text-slate-300 leading-relaxed list-disc list-inside space-y-2">
                          <li>Design and build a working app in just 3 weeks that fosters cultural exchange and connections among university students through food.</li>
                        </ul>
                      ) : (
                        <p className="text-slate-300 leading-relaxed">
                          {project.challenges}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Journey Section - Meet and Eat only */}
                {project.title === 'Meet and Eat' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    data-testid="project-journey"
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Journey</h3>
                    <p className="text-slate-400 mb-6 text-sm md:text-base">
                      From early brainstorming to paper sketches — a look at how the idea took shape before any pixels were pushed.
                    </p>

                    {/* Ideation & Feedback */}
                    <div className="mb-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">1</div>
                        <h4 className="text-lg md:text-xl font-semibold text-white">Ideation & Feedback</h4>
                      </div>
                      <div className="bg-slate-800/30 rounded-lg p-4 md:p-6">
                        <p className="text-slate-300 text-sm md:text-base mb-5 leading-relaxed">
                          During our Apple Foundation Program sessions, we explored themes around food psychology and cultural connection. These notes capture the raw feedback and pivots from our ideation sessions — from questioning "Is it a dinner date?" to landing on the concept of <span className="text-amber-400 font-medium">"Demystify food perception"</span> and the guiding principle: <span className="text-emerald-400 italic">"Come try our food and know who we are."</span>
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="relative group">
                            <img
                              src="/attached_assets/Ideation Meet and Eat 1.jpeg"
                              alt="Ideation notes - brainstorming session with feedback on food app concept"
                              className="w-full rounded-lg shadow-lg border border-slate-700/50 transition-transform duration-300 group-hover:scale-[1.02]"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent rounded-b-lg p-3">
                              <p className="text-slate-200 text-xs md:text-sm font-medium">Brainstorming & Peer Feedback</p>
                            </div>
                          </div>
                          <div className="relative group">
                            <img
                              src="/attached_assets/Ideation Meet and Eat 2.jpeg"
                              alt="Ideation notes - food psychology and demystifying food perception"
                              className="w-full rounded-lg shadow-lg border border-slate-700/50 transition-transform duration-300 group-hover:scale-[1.02]"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent rounded-b-lg p-3">
                              <p className="text-slate-200 text-xs md:text-sm font-medium">Food Psychology & Core Concept</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* User Flow Sketch */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">2</div>
                        <h4 className="text-lg md:text-xl font-semibold text-white">User Flow Sketch</h4>
                      </div>
                      <div className="bg-slate-800/30 rounded-lg p-4 md:p-6">
                        <p className="text-slate-300 text-sm md:text-base mb-5 leading-relaxed">
                          Before jumping into Figma, I sketched out the core user flow on paper to validate the journey: from joining a huddle, selecting available dates, getting matched with other students, chatting about cuisines, to documenting the experience in a scrapbook.
                        </p>
                        <div className="relative group">
                          <img
                            src="/attached_assets/Sketch Meet and Eat.jpeg"
                            alt="Hand-drawn wireframe sketches showing the Meet and Eat user flow across 5 screens"
                            className="w-full rounded-lg shadow-lg border border-slate-700/50 transition-transform duration-300 group-hover:scale-[1.02]"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent rounded-b-lg p-3 md:p-4">
                            <p className="text-slate-200 text-xs md:text-sm font-medium">Paper wireframes — Home → Find a Huddle → Match → Chat → Scrapbook</p>
                          </div>
                        </div>
                      </div>
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
                      {project.title === 'Skillry' ? (
                        <ul className="text-slate-300 leading-relaxed list-disc list-inside space-y-2">
                          <li>To conduct usability tests to improve the user flow for making a coaching request using journey maps.</li>
                          <li>To redesign the chat system for improved control of requests.</li>
                        </ul>
                      ) : project.title === 'Meet and Eat' ? (
                        <ul className="text-slate-300 leading-relaxed list-disc list-inside space-y-2">
                          <li>Created Meet and Eat, an app that enables students to share and explore diverse cuisines while forming meaningful social connections.</li>
                        </ul>
                      ) : (
                        <p className="text-slate-300 leading-relaxed">
                          {project.solutions}
                        </p>
                      )}
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
                      {project.title === 'Skillry' ? (
                        <ul className="text-slate-300 leading-relaxed list-disc list-inside space-y-2">
                          <li>Added control for the coach to review requests before accepting it.</li>
                          <li>Successfully redesigned the chat features with an improvised user flow to make a coaching request that was released in Q3 of 2024.</li>
                        </ul>
                      ) : project.title === 'Meet and Eat' ? (
                        <ul className="text-slate-300 leading-relaxed list-disc list-inside space-y-2">
                          <li>Delivered a fully functional prototype in the Apple Foundation Program, showcasing the potential of food as a medium for inclusivity and cross-cultural engagement.</li>
                        </ul>
                      ) : (
                        <p className="text-slate-300 leading-relaxed">
                          {project.outcomes}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Image Gallery - Now at the bottom */}
              {project.projectImages && project.projectImages.length > 0 && (
                <div className="mb-8 md:mb-12" data-testid="project-gallery">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Project Gallery</h3>
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-6">
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
                              className="w-full h-32 sm:h-40 md:h-64 object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
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
                              className="w-full h-32 sm:h-40 md:h-64 object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
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

        {/* Bottom Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 pb-8"
        >
          <Link href="/" data-testid="button-bottom-home">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 w-full sm:w-auto"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Portfolio
            </Button>
          </Link>
          
          <Link href="/#contact" data-testid="button-bottom-contact">
            <Button 
              variant="outline"
              size="lg"
              className="border-2 text-coral hover:bg-slate-700 hover:text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 w-full sm:w-auto"
              style={{ borderColor: 'var(--coral)' }}
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Me
            </Button>
          </Link>
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