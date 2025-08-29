import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageModalProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
  onNavigate: (index: number) => void;
  projectTitle: string;
}

// Image descriptions for projects
const getImageDescription = (index: number, projectTitle: string): { title: string; description: string } => {
  if (projectTitle === 'Skillry') {
    const skillryDescriptions = [
      {
        title: "Home Screen & Navigation",
        description: "Clear and intuitive home interface redesigned after completing usability tests that suggested to show coaches for the sport user has selected."
      },
      {
        title: "Coaching Requests and Chat",
        description: "Easy to access requests for coach. This section has been divided into 3 categories according to the request type made by the athlete."
      },
      {
        title: "Chat Interface for Learner",
        description: "The chat section displays the requests made by the learner and access the rejected requests by the coach."
      },
      {
        title: "Performance Analytics",
        description: "Data-driven insights showing athlete progress with charts, metrics, and achievement tracking."
      },
      {
        title: "Social Features",
        description: "Community aspect allowing athletes to connect, share achievements, and motivate each other."
      },
      {
        title: "Settings & Personalization",
        description: "Customizable user preferences, notification settings, and personalized training plans."
      }
    ];
    return skillryDescriptions[index] || {
      title: `Screenshot ${index + 1}`,
      description: "Project screenshot showcasing the user interface and design work."
    };
  } else if (projectTitle === 'Meet and Eat') {
    const meetAndEatDescriptions = [
      {
        title: "Home Screen - Find a Huddle",
        description: "The main landing screen featuring the app's cheerful branding and primary call-to-action button to find dining companions. The warm color palette and friendly illustrations create an inviting atmosphere for cultural food sharing."
      },
      {
        title: "Availability Calendar",
        description: "Interactive calendar interface allowing users to select their availability for the next two weeks. The intuitive date selection helps coordinate meal times with potential dining partners."
      },
      {
        title: "Join a Huddle - Cultural Matching",
        description: "Personalized matching screen showing cultural cuisine preferences through flag representations. Users can see potential dining partners from different cultural backgrounds, promoting cross-cultural connections through food."
      },
      {
        title: "Group Chat Interface",
        description: "Real-time messaging interface for coordinated dining groups. The chat allows participants to discuss meal plans, dietary preferences, and coordinate meeting details for their cultural food sharing experience."
      },
      {
        title: "Scrapbook - Memory Sharing",
        description: "Digital scrapbook feature where users can document and share their dining experiences, including photos of food and memories with new friends. This creates a lasting record of cultural connections made through the app."
      },
      {
        title: "App Demo Video",
        description: "Comprehensive demonstration video showcasing the app's key features and user flow, from finding dining partners to creating lasting memories through shared cultural cuisine experiences."
      }
    ];
    return meetAndEatDescriptions[index] || {
      title: `Screenshot ${index + 1}`,
      description: "Project screenshot showcasing the user interface and design work."
    };
  }

  return {
    title: `Screenshot ${index + 1}`,
    description: "Project screenshot showcasing the user interface and design work."
  };
};

export default function ImageModal({ 
  images, 
  isOpen, 
  onClose, 
  currentIndex, 
  onNavigate, 
  projectTitle 
}: ImageModalProps) {
  const [showDescription, setShowDescription] = useState(true);
  
  const currentDescription = getImageDescription(currentIndex, projectTitle);

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    onNavigate(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    onNavigate(newIndex);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={onClose}
          onKeyDown={handleKeyPress}
          tabIndex={0}
          data-testid="image-modal"
        >
          <div 
            className="relative w-full h-full max-w-6xl max-h-[90vh] mx-4 group"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
              onClick={onClose}
              data-testid="button-close-modal"
            >
              <X className="w-5 h-5" />
            </Button>

            {/* Navigation Buttons - Only visible on hover */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={handlePrevious}
                  data-testid="button-previous"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={handleNext}
                  data-testid="button-next"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </>
            )}

            {/* Image Title - Top Left */}
            <div className="absolute top-4 left-4 z-10 bg-black/70 text-white px-4 py-2 rounded-lg max-w-xs">
              <h3 className="text-lg font-bold leading-tight">
                {currentDescription.title}
              </h3>
              {images.length > 1 && (
                <p className="text-xs text-slate-300 mt-1">
                  {currentIndex + 1} / {images.length}
                </p>
              )}
            </div>

            {/* Description Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute bottom-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
              onClick={() => setShowDescription(!showDescription)}
              data-testid="button-toggle-description"
            >
              <Info className="w-5 h-5" />
            </Button>

            {/* Main Image/Video */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex items-center justify-center"
            >
              {images[currentIndex]?.endsWith('.mov') || images[currentIndex]?.endsWith('.mp4') ? (
                <video
                  src={images[currentIndex]}
                  className="max-w-full max-h-full object-contain rounded-lg"
                  controls
                  data-testid={`modal-video-${currentIndex}`}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={images[currentIndex]}
                  alt={`${projectTitle} screenshot ${currentIndex + 1}`}
                  className="max-w-full max-h-full object-contain rounded-lg"
                  data-testid={`modal-image-${currentIndex}`}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600`;
                  }}
                />
              )}
            </motion.div>

            {/* Description Overlay */}
            <AnimatePresence>
              {showDescription && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 rounded-b-lg"
                  data-testid="image-description"
                >
                  <div className="max-w-4xl mx-auto">
                    <p className="text-slate-300 leading-relaxed">
                      {currentDescription.description}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Thumbnail Navigation - At the very bottom */}
            {images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex gap-2 bg-black/80 p-2 rounded-lg border border-white/20">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
                      }`}
                      onClick={() => onNavigate(index)}
                      data-testid={`thumbnail-${index}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}