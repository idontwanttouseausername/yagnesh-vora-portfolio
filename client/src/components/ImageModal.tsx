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
const getImageDescription = (index: number): { title: string; description: string } => {
  const descriptions = [
    {
      title: "Home Screen & Navigation",
      description: "Clear and intuitive home interface redesigned after completing usability tests that suggested to suggest Coaches for the sport user has selected."
    },
    {
      title: "Coach Profile & Booking",
      description: "Comprehensive coach profiles with ratings, specializations, and seamless booking system."
    },
    {
      title: "Training Session Interface",
      description: "Interactive training session with video analysis, real-time feedback, and progress tracking."
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

  return descriptions[index] || {
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

            {/* Image Title - Top Center */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-black/70 text-white px-4 py-2 rounded-lg text-center">
              <h3 className="text-lg font-bold">
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
                    <p className="text-slate-300 leading-relaxed">
                      {currentDescription.description}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Thumbnail Navigation - Only visible on hover */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex gap-2 bg-black/70 p-2 rounded-lg">
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