import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import RosaryBeads from "./RosaryBeads";

interface RosarySidebarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  onOpenIntentions: () => void;
  progress: Record<string, number>;
}

const sections = [
  {
    id: 'initium',
    title: 'Initium',
    subtitle: 'Signum Crucis • Credo',
    icon: 'fas fa-cross',
    portuguese: 'Início'
  },
  {
    id: 'gaudiosa',
    title: 'Mysteria Gaudiosa',
    subtitle: 'Mistérios Gozosos',
    icon: 'fas fa-baby',
    portuguese: 'Mysteria Gaudiosa'
  },
  {
    id: 'dolorosa',
    title: 'Mysteria Dolorosa',
    subtitle: 'Mistérios Dolorosos',
    icon: 'fas fa-heart',
    portuguese: 'Mysteria Dolorosa'
  },
  {
    id: 'gloriosa',
    title: 'Mysteria Gloriosa',
    subtitle: 'Mistérios Gloriosos',
    icon: 'fas fa-crown',
    portuguese: 'Mysteria Gloriosa'
  },
  {
    id: 'ultima',
    title: 'Ultima Oratio',
    subtitle: 'Oração Final',
    icon: 'fas fa-dove',
    portuguese: 'Ultima Oratio'
  }
];

export default function RosarySidebar({ 
  currentSection, 
  onSectionChange, 
  onOpenIntentions,
  progress 
}: RosarySidebarProps) {
  const getCurrentDay = () => {
    const days = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
    const mysteries = ['gloriosa', 'gaudiosa', 'dolorosa', 'gloriosa', 'dolorosa', 'dolorosa', 'gaudiosa'];
    const today = new Date().getDay();
    return { day: days[today], mystery: mysteries[today] };
  };

  const { day, mystery } = getCurrentDay();

  return (
    <aside className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-96 glass-morphism border-r border-[var(--byzantine-gold-alpha)] animate-slide-in-left backdrop-blur-xl">
      <ScrollArea className="h-full sacred-scroll">
        <div className="p-8">
          {/* Sacred Navigation Title */}
          <div className="text-center mb-8">
            <h2 className="font-cinzel text-lg font-semibold text-byzantine-gold illuminated-text mb-2">
              Navigatio Sacra
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[var(--byzantine-gold)] to-transparent mx-auto"></div>
          </div>

          {/* Rosary Navigation */}
          <nav className="space-y-4">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant="ghost"
                className={`w-full sacred-border p-4 h-auto hover:bg-[var(--byzantine-gold-alpha)] transition-all duration-300 rounded-lg ${
                  currentSection === section.id 
                    ? 'animate-glow-pulse bg-[var(--byzantine-gold-alpha)]' 
                    : ''
                } ${
                  section.id === mystery 
                    ? 'today-mystery-highlight' 
                    : ''
                }`}
                onClick={() => onSectionChange(section.id)}
              >
                <div className="flex items-center space-x-3 w-full">
                  <i className={`${section.icon} text-byzantine-gold text-lg`} />
                  <div className="text-left flex-1">
                    <h3 className="font-cinzel font-medium text-byzantine-gold">
                      {section.title}
                    </h3>
                    <p className="text-xs text-sacred-ivory/70 font-inter">
                      {section.subtitle}
                    </p>
                  </div>
                </div>
                
                {/* Show progress beads for mystery sections */}
                {(['gaudiosa', 'dolorosa', 'gloriosa'].includes(section.id)) && (
                  <div className="mt-3">
                    <RosaryBeads 
                      completed={Math.min((progress[section.id] || 0) + 1, 5)}
                      total={5}
                      size="sm"
                    />
                  </div>
                )}
              </Button>
            ))}

            {/* Prayer Intentions */}
            <Button
              variant="ghost"
              className="w-full sacred-border p-4 h-auto hover:bg-[var(--byzantine-gold-alpha)] transition-all duration-300 bg-gradient-to-r from-[var(--byzantine-gold-alpha)] to-transparent rounded-lg"
              onClick={onOpenIntentions}
            >
              <div className="flex items-center space-x-3 w-full">
                <i className="fas fa-hands text-byzantine-gold text-lg" />
                <div className="text-left">
                  <h3 className="font-cinzel font-medium text-byzantine-gold">
                    Intenções
                  </h3>
                  <p className="text-xs text-sacred-ivory/70 font-inter">
                    Intentiones Orationis
                  </p>
                </div>
              </div>
            </Button>
          </nav>

          {/* Sacred Timeline */}
          <div className="mt-8 pt-6 border-t border-[var(--byzantine-gold-alpha)]">
            <h4 className="font-cinzel text-sm text-byzantine-gold mb-4 text-center">
              Tempus Sacrum
            </h4>
            <div className="text-center">
              <p className="text-xs text-sacred-ivory/70 font-inter mb-2 capitalize">
                {day}
              </p>
              <p className="text-sm font-medium capitalize">
                Mysteria {mystery}
              </p>
              <div className="w-8 h-8 mx-auto mt-3 rounded-full bg-gradient-to-r from-[var(--byzantine-gold)] to-[var(--byzantine-gold-alpha)] flex items-center justify-center">
                <i className={`${sections.find(s => s.id === mystery)?.icon} text-xs`} />
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
}
