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

// Image descriptions for Skillry project
const getImageDescription = (index: number): { title: string; description: string; workDone: string[] } => {
  const descriptions = [
    {
      title: "Home Screen & Navigation",
      description: "Clean and intuitive home interface showcasing different sports categories with easy navigation.",
      workDone: ["UI/UX Design", "Information Architecture", "Visual Hierarchy", "Icon Design"]
    },
    {
      title: "Coach Profile & Booking",
      description: "Comprehensive coach profiles with ratings, specializations, and seamless booking system.",
      workDone: ["User Flow Design", "Profile Layout", "Booking Interface", "Rating System"]
    },
    {
      title: "Training Session Interface",
      description: "Interactive training session with video analysis, real-time feedback, and progress tracking.",
      workDone: ["Video UI Design", "Feedback System", "Progress Visualization", "Interactive Elements"]
    },
    {
      title: "Performance Analytics",
      description: "Data-driven insights showing athlete progress with charts, metrics, and achievement tracking.",
      workDone: ["Data Visualization", "Chart Design", "Metrics Dashboard", "Progress Tracking"]
    },
    {
      title: "Social Features",
      description: "Community aspect allowing athletes to connect, share achievements, and motivate each other.",
      workDone: ["Social UI Design", "Feed Layout", "Interaction Design", "Community Features"]
    },
    {
      title: "Settings & Personalization",
      description: "Customizable user preferences, notification settings, and personalized training plans.",
      workDone: ["Settings Interface", "Personalization Features", "User Preferences", "Notification Design"]
    },
    {
      title: "Marketing Materials",
      description: "Brand positioning and marketing assets for app store listings and promotional campaigns.",
      workDone: ["Brand Design", "Marketing Strategy", "Asset Creation", "App Store Optimization"]
    }
  ];

  return descriptions[index] || {
    title: `Screenshot ${index + 1}`,
    description: "Project screenshot showcasing the user interface and design work.",
    workDone: ["UI/UX Design", "Interface Development"]
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
  
  const currentDescription = getImageDescription(currentIndex);

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
            className="relative w-full h-full max-w-6xl max-h-[90vh] mx-4"
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

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
                  onClick={handlePrevious}
                  data-testid="button-previous"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
                  onClick={handleNext}
                  data-testid="button-next"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </>
            )}

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute top-4 left-4 z-10 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            )}

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

            {/* Main Image */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex items-center justify-center"
            >
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
                    <h3 className="text-xl font-bold text-white mb-2">
                      {currentDescription.title}
                    </h3>
                    <p className="text-slate-300 mb-4 leading-relaxed">
                      {currentDescription.description}
                    </p>
                    <div>
                      <p className="text-sm text-slate-400 mb-2">Work Completed:</p>
                      <div className="flex flex-wrap gap-2">
                        {currentDescription.workDone.map((work, index) => (
                          <span
                            key={index}
                            className="text-xs bg-coral-500/20 text-coral-300 px-2 py-1 rounded-full"
                            data-testid={`work-tag-${index}`}
                          >
                            {work}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 p-2 rounded-lg">
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
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}