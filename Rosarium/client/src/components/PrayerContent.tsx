import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { rosaryContent } from "@/lib/rosaryData";
import RosaryBeads from "./RosaryBeads";

interface PrayerContentProps {
  section: string;
  onNext: () => void;
  onPrevious: () => void;
  intentions: Array<{ id: number; text: string }>;
  progress: Record<string, number>;
  onProgressUpdate: (section: string, completed: number) => void;
}

export default function PrayerContent({ 
  section, 
  onNext, 
  onPrevious, 
  intentions,
  progress,
  onProgressUpdate
}: PrayerContentProps) {
  const content = rosaryContent[section];
  
  if (!content) {
    return (
      <div className="text-center">
        <p className="text-sacred-ivory/70">Seção não encontrada</p>
      </div>
    );
  }

  // Check if this is a mystery section with multiple sub-sections
  const isMysterySection = ['gaudiosa', 'dolorosa', 'gloriosa'].includes(section);
  const currentProgress = progress[section] || 0; // This represents completed count (0-5)
  // For mystery sections: show current mystery based on progress (0-based index)
  // If progress is 0, show first mystery (index 0)
  // If progress is 1, show first mystery (index 0) - it's completed
  // If progress is 2, show second mystery (index 1) - first is completed, second is current
  const currentSubSection = isMysterySection ? Math.min(currentProgress, content.sections.length - 1) : 0;

  const handleBeadClick = (index: number) => {
    // When clicking bead at index, set progress to that index (0-4)
    // This means we're now viewing mystery at that index
    onProgressUpdate(section, index);
  };

  const handleMysteryNext = () => {
    if (isMysterySection && currentProgress < 5) {
      onProgressUpdate(section, currentProgress + 1);
    } else {
      onNext();
    }
  };

  const handleMysteryPrevious = () => {
    if (isMysterySection && currentProgress > 0) {
      onProgressUpdate(section, currentProgress - 1);
    } else {
      onPrevious();
    }
  };

  return (
    <main className="animate-fade-in relative" style={{ marginLeft: '384px', padding: '2rem' }}>
      <div className="max-w-4xl mx-auto">
        {/* Sacred Header */}
        <div className="text-center mb-12 glass-morphism p-8 rounded-2xl sacred-border">
          <h1 className="font-cinzel text-4xl font-semibold text-ancient-gold sacred-header-glow mb-4">
            {content.title}
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[var(--ancient-gold)] to-transparent mx-auto mb-6 rounded-full"></div>
          <p className="text-parchment font-inter text-lg">
            {content.subtitle} • <em className="font-cormorant text-ancient-gold/80">{content.latin}</em>
          </p>
          
          {/* Progress indicator for mystery sections */}
          {isMysterySection && (
            <div className="mt-6">
              <p className="text-ancient-gold/80 font-inter text-sm mb-3">
                {Math.min(currentProgress + 1, 5)} de 5
              </p>
              <RosaryBeads 
                completed={Math.min(currentProgress + 1, 5)}
                total={5}
                size="md"
                onBeadClick={handleBeadClick}
              />
            </div>
          )}
        </div>

        {/* Prayer Content Sections */}
        <div className="space-y-8">
          {/* For mystery sections, show only the current sub-section */}
          {isMysterySection ? (
            <>
              {content.sections[currentSubSection] && (
                <>
                  {/* Mystery Offering Card */}
                  <Card className="sacred-content-card rounded-2xl sacred-border">
                    <CardContent className="p-8">
                      <div className="text-center mb-8">
                        <h2 className="font-cinzel text-2xl font-medium text-ancient-gold sacred-header-glow mb-3">
                          <i className={`${content.sections[currentSubSection].icon} mr-3 text-2xl`} />
                          {content.sections[currentSubSection].title}
                        </h2>
                        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[var(--ancient-gold)] to-transparent mx-auto rounded-full"></div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Latin Column */}
                        <div className="space-y-4">
                          <h3 className="font-cormorant text-lg font-medium text-ancient-gold mb-4">
                            Lingua Latina
                          </h3>
                          <div 
                            className="latin-text font-cormorant text-lg leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: (content.sections[currentSubSection] as any).offering?.latin || (content.sections[currentSubSection] as any).latin }}
                          />
                        </div>

                        {/* Portuguese Column */}
                        <div className="space-y-4">
                          <h3 className="font-cormorant text-lg font-medium text-ancient-gold mb-4">
                            Português
                          </h3>
                          <div 
                            className="portuguese-text font-crimson text-lg leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: (content.sections[currentSubSection] as any).offering?.portuguese || (content.sections[currentSubSection] as any).portuguese }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Individual Prayer Cards for mystery sections */}
                  {isMysterySection && (content.sections[currentSubSection] as any).prayers && (content.sections[currentSubSection] as any).prayers.map((prayer: any, prayerIndex: number) => (
                    <Card key={prayerIndex} className="sacred-content-card rounded-2xl sacred-border">
                      <CardContent className="p-8">
                        <div className="text-center mb-8">
                          <h2 className="font-cinzel text-2xl font-medium text-ancient-gold sacred-header-glow mb-3">
                            <i className={`${prayer.icon} mr-3 text-2xl`} />
                            {prayer.title}
                          </h2>
                          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[var(--ancient-gold)] to-transparent mx-auto rounded-full"></div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                          {/* Latin Column */}
                          <div className="space-y-4">
                            <h3 className="font-cormorant text-lg font-medium text-ancient-gold mb-4">
                              Lingua Latina
                            </h3>
                            <div 
                              className="latin-text font-cormorant text-lg leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: prayer.latin }}
                            />
                          </div>

                          {/* Portuguese Column */}
                          <div className="space-y-4">
                            <h3 className="font-cormorant text-lg font-medium text-ancient-gold mb-4">
                              Português
                            </h3>
                            <div 
                              className="portuguese-text font-crimson text-lg leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: prayer.portuguese }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </>
              )}
            </>
          ) : (
            /* For non-mystery sections, show all sections */
            <>
              {content.sections.map((prayerSection, index) => (
                <div key={index}>
                  <Card className="sacred-content-card rounded-2xl sacred-border">
                    <CardContent className="p-8">
                      <div className="text-center mb-8">
                        <h2 className="font-cinzel text-2xl font-medium text-ancient-gold sacred-header-glow mb-3">
                          <i className={`${prayerSection.icon} mr-3 text-2xl`} />
                          {prayerSection.title}
                        </h2>
                        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[var(--ancient-gold)] to-transparent mx-auto rounded-full"></div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Latin Column */}
                        <div className="space-y-4">
                          <h3 className="font-cormorant text-lg font-medium text-ancient-gold mb-4">
                            Lingua Latina
                          </h3>
                          <div 
                            className="latin-text font-cormorant text-lg leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: (prayerSection as any).latin }}
                          />
                        </div>

                        {/* Portuguese Column */}
                        <div className="space-y-4">
                          <h3 className="font-cormorant text-lg font-medium text-ancient-gold mb-4">
                            Português
                          </h3>
                          <div 
                            className="portuguese-text font-crimson text-lg leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: (prayerSection as any).portuguese }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Show Personal Intentions after Offertorium Rosarii */}
                  {prayerSection.title === "Offertorium Rosarii" && intentions.length > 0 && (
                    <Card className="sacred-content-card rounded-2xl sacred-border mt-6">
                      <CardContent className="p-8">
                        <h3 className="font-cinzel text-xl font-medium text-ancient-gold sacred-header-glow mb-6 text-center">
                          <i className="fas fa-heart mr-3 text-lg" />
                          Intentiones Personales
                        </h3>
                        <div className="bg-[var(--cathedral-shadow)]/40 p-6 rounded-xl border border-[var(--ancient-gold-alpha)]">
                          {intentions.map((intention) => (
                            <p key={intention.id} className="text-parchment font-crimson text-base mb-3 last:mb-0">
                              <i className="fas fa-heart text-ancient-gold mr-3 text-sm" />
                              {intention.text}
                            </p>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ))}
            </>
          )}


        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-[var(--byzantine-gold-alpha)]">
          <Button
            variant="ghost"
            onClick={handleMysteryPrevious}
            className="flex items-center space-x-2 px-6 py-3 glass-morphism rounded-lg hover:bg-[var(--byzantine-gold-alpha)] transition-all duration-300"
            disabled={!isMysterySection && section === 'initium'}
          >
            <i className="fas fa-chevron-left text-byzantine-gold" />
            <span className="font-inter">
              {isMysterySection && currentProgress > 0 ? 'Anterior' : 'Seção Anterior'}
            </span>
          </Button>

          <div className="flex space-x-2">
            {['initium', 'gaudiosa', 'dolorosa', 'gloriosa', 'ultima'].map((sectionId, index) => (
              <div
                key={sectionId}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  section === sectionId 
                    ? 'bg-[var(--byzantine-gold)]' 
                    : 'bg-[var(--byzantine-gold-alpha)]'
                }`}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            onClick={handleMysteryNext}
            className="flex items-center space-x-2 px-6 py-3 glass-morphism rounded-lg hover:bg-[var(--byzantine-gold-alpha)] transition-all duration-300"
            disabled={!isMysterySection && section === 'ultima'}
          >
            <span className="font-inter">
              {isMysterySection && currentProgress < 4 ? 'Próximo' : 'Próxima Seção'}
            </span>
            <i className="fas fa-chevron-right text-byzantine-gold" />
          </Button>
        </div>
      </div>
    </main>
  );
}
