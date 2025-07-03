import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface IntentionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  intentions: Array<{ id: number; text: string }>;
  onAddIntention: (text: string) => void;
  onRemoveIntention: (id: number) => void;
  onSave: () => void;
}

export default function IntentionsModal({
  open,
  onOpenChange,
  intentions,
  onAddIntention,
  onRemoveIntention,
  onSave
}: IntentionsModalProps) {
  const [newIntention, setNewIntention] = useState("");

  const handleAddIntention = () => {
    if (newIntention.trim()) {
      onAddIntention(newIntention.trim());
      setNewIntention("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddIntention();
    }
  };

  const handleSave = () => {
    onSave();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-morphism sacred-border max-w-lg animate-fade-in backdrop-blur-xl border-2">
        {/* Modal Header */}
        <DialogHeader className="text-center border-b border-[var(--byzantine-gold-alpha)] pb-4 mb-6">
          <DialogTitle className="font-cinzel text-2xl font-semibold text-byzantine-gold illuminated-text">
            <i className="fas fa-heart mr-3" />
            Intenções de Oração
          </DialogTitle>
          <p className="text-sacred-ivory/80 font-cormorant italic text-sm mt-2">
            Intentiones Orationis
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* New Intention Input */}
          <div>
            <Label className="text-sacred-ivory font-inter text-sm">
              Nova Intenção
            </Label>
            <div className="flex space-x-3 mt-2">
              <Input
                value={newIntention}
                onChange={(e) => setNewIntention(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ex: Pela paz no mundo, pela saúde da família..."
                className="flex-1 bg-[var(--ecclesiastical)] border-[var(--byzantine-gold-alpha)] text-sacred-ivory placeholder-sacred-ivory/50 focus:border-[var(--byzantine-gold)] focus:ring-[var(--byzantine-gold-glow)] rounded-lg"
              />
              <Button
                onClick={handleAddIntention}
                className="px-4 py-2 bg-[var(--byzantine-gold-alpha)] hover:bg-[var(--byzantine-gold-glow)] border border-[var(--byzantine-gold)] text-byzantine-gold font-inter rounded-lg transition-all duration-300"
              >
                Adicionar
              </Button>
            </div>
          </div>

          {/* Current Intentions */}
          <div>
            <h3 className="text-sacred-ivory font-inter text-sm mb-3">
              Intenções Atuais{" "}
              <span className="text-byzantine-gold">({intentions.length})</span>
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto sacred-scroll">
              {intentions.length === 0 ? (
                <p className="text-sacred-ivory/60 text-sm text-center py-4">
                  Nenhuma intenção adicionada ainda
                </p>
              ) : (
                intentions.map((intention) => (
                  <div
                    key={intention.id}
                    className="flex items-center justify-between p-3 bg-[var(--cathedral-shadow)]/30 rounded-lg border border-[var(--ancient-gold-alpha)] hover:border-[var(--ancient-gold-glow)] transition-all duration-300"
                  >
                    <span className="text-parchment text-sm flex-1 font-crimson">
                      <i className="fas fa-heart text-ancient-gold mr-2 text-xs" />
                      {intention.text}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveIntention(intention.id)}
                      className="text-parchment/50 hover:text-red-400 hover:bg-red-400/10 ml-2 rounded-lg"
                    >
                      <i className="fas fa-times text-xs" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex justify-between space-x-4 pt-6 border-t border-[var(--ancient-gold-alpha)]">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="px-6 py-3 glass-morphism hover:bg-parchment/10 text-parchment font-inter rounded-lg transition-all duration-300"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              className="px-6 py-3 bg-[var(--ancient-gold-alpha)] hover:bg-[var(--ancient-gold-glow)] border border-[var(--ancient-gold)] text-ancient-gold font-inter rounded-lg transition-all duration-300"
            >
              Salvar Intenções
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
