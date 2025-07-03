import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import StarfieldBackground from "@/components/StarfieldBackground";
import RosarySidebar from "@/components/RosarySidebar";
import PrayerContent from "@/components/PrayerContent";
import IntentionsModal from "@/components/IntentionsModal";
import LoginDialog from "@/components/LoginDialog";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/hooks/useAuth";
import { useIntentions } from "@/hooks/useIntentions";
import prayingHandsImage from "@assets/—Pngtree—praying hands rosary beads golden_20795995 (1)_1751503637738.png";

const sections = ['initium', 'gaudiosa', 'dolorosa', 'gloriosa', 'ultima'];

export default function RosaryPage() {
  const [currentSection, setCurrentSection] = useState('initium');
  const [intentionsModalOpen, setIntentionsModalOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [progress, setProgress] = useState<Record<string, number>>({
    gaudiosa: 0,
    dolorosa: 0,
    gloriosa: 0
  });

  const { user, logout } = useAuth();
  const { 
    intentions, 
    addIntention, 
    removeIntention, 
    isAddingIntention 
  } = useIntentions(user?.id || null);

  // Load progress from localStorage
  useEffect(() => {
    const storedProgress = localStorage.getItem('rosary_progress');
    if (storedProgress) {
      try {
        setProgress(JSON.parse(storedProgress));
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage
  const updateProgress = (section: string, completed: number) => {
    const newProgress = { ...progress, [section]: completed };
    setProgress(newProgress);
    localStorage.setItem('rosary_progress', JSON.stringify(newProgress));
  };

  const handleNext = () => {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex < sections.length - 1) {
      setCurrentSection(sections[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex > 0) {
      setCurrentSection(sections[currentIndex - 1]);
    }
  };

  const handleSaveIntentions = () => {
    // Intentions are automatically saved through the hook
    console.log('Intentions saved');
  };

  return (
    <>
      <StarfieldBackground />
      
      {/* Navigation Header */}
      <header className="fixed top-0 w-full z-50 glass-morphism border-b border-[var(--byzantine-gold-alpha)] backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Sacred Logo */}
            <div className="flex items-center space-x-4">
              <div className="sacred-logo-container">
                <img 
                  src={prayingHandsImage} 
                  alt="Praying Hands with Rosary" 
                  className="sacred-logo w-12 h-12 object-contain sacred-image-glow"
                />
              </div>
              <h1 className="font-cinzel text-2xl font-semibold text-parchment sacred-header-glow">
                <span className="text-ancient-gold">✠</span> Rosarium Virginis Mariae <span className="text-ancient-gold">✠</span>
              </h1>
            </div>
            
            {/* Sacred Actions */}
            <div className="flex items-center space-x-4">
              {/* Gregorian chant audio toggle */}
              <Button 
                variant="ghost"
                size="sm"
                className="p-2 rounded-lg glass-morphism hover:bg-[var(--ancient-gold-alpha)] transition-all duration-300"
              >
                <i className="fas fa-music text-ancient-gold" />
              </Button>
              
              {/* Settings */}
              <Button 
                variant="ghost"
                size="sm"
                className="p-2 rounded-lg glass-morphism hover:bg-[var(--byzantine-gold-alpha)] transition-all duration-300"
              >
                <i className="fas fa-cog text-byzantine-gold" />
              </Button>
              
              {/* Authentication */}
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-xs text-sacred-ivory/70 font-inter">Benvenuto</p>
                    <p className="text-sm text-byzantine-gold font-crimson">{user.username}</p>
                  </div>
                  <Button 
                    variant="ghost"
                    className="px-4 py-2 rounded-lg glass-morphism hover:bg-red-400/20 border border-red-400/30 transition-all duration-300 font-inter text-sm"
                    onClick={logout}
                  >
                    <i className="fas fa-sign-out-alt mr-2 text-red-400" />
                    <span className="text-red-300">Sair</span>
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="ghost"
                  className="px-4 py-2 rounded-lg glass-morphism hover:bg-[var(--byzantine-gold-alpha)] transition-all duration-300 font-inter text-sm"
                  onClick={() => setLoginDialogOpen(true)}
                >
                  <i className="fas fa-sign-in-alt mr-2" />
                  Entrar
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="pt-20">
        <RosarySidebar 
          currentSection={currentSection}
          onSectionChange={setCurrentSection}
          onOpenIntentions={() => setIntentionsModalOpen(true)}
          progress={progress}
        />
        
        <PrayerContent 
          section={currentSection}
          onNext={handleNext}
          onPrevious={handlePrevious}
          intentions={intentions}
          progress={progress}
          onProgressUpdate={updateProgress}
        />
      </div>

      <IntentionsModal 
        open={intentionsModalOpen}
        onOpenChange={setIntentionsModalOpen}
        intentions={intentions}
        onAddIntention={addIntention}
        onRemoveIntention={removeIntention}
        onSave={handleSaveIntentions}
      />

      <LoginDialog 
        open={loginDialogOpen}
        onOpenChange={setLoginDialogOpen}
      />
      
      <Toaster />
    </>
  );
}
