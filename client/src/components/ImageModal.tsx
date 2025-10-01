import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Info, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";

interface ImageModalProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
  onNavigate: (index: number) => void;
  projectTitle: string;
}

// Zoom Controls Component
const ZoomControls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  
  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="bg-black/70 hover:bg-black/90 text-white border border-white/20 hover:border-white/40 transition-all duration-200"
        onClick={() => zoomIn()}
        title="Zoom In"
        data-testid="button-zoom-in"
      >
        <ZoomIn className="w-5 h-5" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="bg-black/70 hover:bg-black/90 text-white border border-white/20 hover:border-white/40 transition-all duration-200"
        onClick={() => zoomOut()}
        title="Zoom Out"
        data-testid="button-zoom-out"
      >
        <ZoomOut className="w-5 h-5" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="bg-black/70 hover:bg-black/90 text-white border border-white/20 hover:border-white/40 transition-all duration-200"
        onClick={() => resetTransform()}
        title="Reset Zoom"
        data-testid="button-zoom-reset"
      >
        <RotateCcw className="w-5 h-5" />
      </Button>
    </div>
  );
};

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
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const currentDescription = getImageDescription(currentIndex, projectTitle);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

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

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && images.length > 1) {
      handleNext();
    }
    if (isRightSwipe && images.length > 1) {
      handlePrevious();
    }
  };

  // Auto-hide description on mobile for better viewing
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setShowDescription(false);
    } else {
      setShowDescription(true);
    }
  }, [currentIndex]);

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
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="lg"
              className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-black/90 text-white border border-white/20 hover:border-white/40 transition-all duration-200"
              onClick={onClose}
              data-testid="button-close-modal"
            >
              <X className="w-8 h-8" />
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

            {/* Image Title - Top Left - More compact on mobile */}
            <div className="absolute top-2 left-2 md:top-4 md:left-4 z-10 bg-black/80 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg max-w-[60%] md:max-w-xs">
              <h3 className="text-sm md:text-lg font-bold leading-tight truncate">
                {currentDescription.title}
              </h3>
              {images.length > 1 && (
                <p className="text-xs text-slate-300 mt-0.5 md:mt-1">
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

            {/* Main Image/Video with Zoom - Add padding to avoid overlap */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex items-center justify-center pt-12 pb-4 md:pt-16 md:pb-8 px-2 md:px-4"
            >
              {images[currentIndex]?.endsWith('.mov') || images[currentIndex]?.endsWith('.mp4') ? (
                <video
                  src={images[currentIndex]}
                  className="max-w-full max-h-full object-contain rounded-lg"
                  controls
                  controlsList="nodownload"
                  data-testid={`modal-video-${currentIndex}`}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <TransformWrapper
                  initialScale={1}
                  minScale={0.5}
                  maxScale={4}
                  centerOnInit
                  wheel={{ step: 0.1 }}
                  doubleClick={{ mode: "toggle", step: 0.7 }}
                >
                  <ZoomControls />
                  <TransformComponent
                    wrapperClass="!w-full !h-full"
                    contentClass="!w-full !h-full flex items-center justify-center"
                  >
                    <img
                      src={images[currentIndex]}
                      alt={`${projectTitle} screenshot ${currentIndex + 1}`}
                      className={`max-w-full max-h-full object-contain rounded-lg ${
                        currentIndex === 0 && images[currentIndex]?.includes('user-flow') 
                          ? 'p-6 md:p-12 bg-white/10' 
                          : ''
                      }`}
                      data-testid={`modal-image-${currentIndex}`}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600`;
                      }}
                    />
                  </TransformComponent>
                </TransformWrapper>
              )}
            </motion.div>

            {/* Description Overlay - More compact on mobile */}
            <AnimatePresence>
              {showDescription && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-3 md:p-6 rounded-b-lg cursor-pointer max-h-[40vh] md:max-h-[50vh] overflow-y-auto"
                  data-testid="image-description"
                  onClick={() => setShowDescription(false)}
                >
                  <div className="max-w-4xl mx-auto">
                    <p className="text-slate-300 leading-relaxed text-sm md:text-base line-clamp-4 md:line-clamp-none">
                      {currentDescription.description}
                    </p>
                    <div className="mt-2 text-xs text-slate-400 opacity-60">
                      Tap to hide • Swipe to navigate
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Thumbnail Navigation - Top right corner - Smaller on mobile */}
            {images.length > 1 && (
              <div className="absolute top-2 right-2 md:top-4 md:right-16 z-20 opacity-80 md:opacity-0 md:hover:opacity-100 md:group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex gap-1 md:gap-2 bg-black/80 p-1.5 md:p-2 rounded-lg border border-white/20">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
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