import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', password: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(loginData.username, loginData.password);
      toast({
        title: "Login successful",
        description: "Welcome back to your prayer journey."
      });
      onOpenChange(false);
      setLoginData({ username: '', password: '' });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Registration failed",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register(registerData.username, registerData.password);
      toast({
        title: "Registration successful",
        description: "Your account has been created successfully."
      });
      onOpenChange(false);
      setRegisterData({ username: '', password: '', confirmPassword: '' });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Username may already exist. Please try a different one.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-morphism sacred-border max-w-lg animate-fade-in backdrop-blur-xl border-2">
        {/* Sacred Header */}
        <DialogHeader className="text-center border-b border-[var(--ancient-gold-alpha)] pb-6 mb-6">
          <DialogTitle className="font-cinzel text-2xl font-semibold text-byzantine-gold illuminated-text mb-2">
            <i className="fas fa-cross mr-3 text-lg" />
            Sancta Authentica
          </DialogTitle>
          <p className="text-sacred-ivory/80 font-cormorant italic text-sm">
            Intra vel redire ad iter spirituale tuum
          </p>
        </DialogHeader>

        {/* Sacred Tab Navigation */}
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[var(--cathedral-shadow)]/50 border border-[var(--ancient-gold-alpha)] rounded-lg p-1 mb-6">
            <TabsTrigger 
              value="login" 
              className="text-sacred-ivory font-inter text-sm data-[state=active]:bg-[var(--ancient-gold-alpha)] data-[state=active]:text-byzantine-gold data-[state=active]:border data-[state=active]:border-[var(--ancient-gold)] rounded-md transition-all duration-300"
            >
              <i className="fas fa-sign-in-alt mr-2 text-xs" />
              Ingressus
            </TabsTrigger>
            <TabsTrigger 
              value="register" 
              className="text-sacred-ivory font-inter text-sm data-[state=active]:bg-[var(--ancient-gold-alpha)] data-[state=active]:text-byzantine-gold data-[state=active]:border data-[state=active]:border-[var(--ancient-gold)] rounded-md transition-all duration-300"
            >
              <i className="fas fa-user-plus mr-2 text-xs" />
              Registratio
            </TabsTrigger>
          </TabsList>
          
          {/* Sign In Form */}
          <TabsContent value="login" className="space-y-5">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="login-username" className="text-byzantine-gold font-inter text-sm flex items-center">
                  <i className="fas fa-user mr-2 text-xs" />
                  Nomen Usoris
                </Label>
                <Input
                  id="login-username"
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="Nomen sacrum tuum scribe"
                  className="bg-[var(--gothic-stone)] border-[var(--ancient-gold-alpha)] text-parchment placeholder-parchment/60 focus:border-[var(--byzantine-gold)] focus:ring-[var(--ancient-gold-glow)] rounded-lg h-11 font-crimson"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-byzantine-gold font-inter text-sm flex items-center">
                  <i className="fas fa-key mr-2 text-xs" />
                  Tessera
                </Label>
                <Input
                  id="login-password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Clavem sacram tuam scribe"
                  className="bg-[var(--gothic-stone)] border-[var(--ancient-gold-alpha)] text-parchment placeholder-parchment/60 focus:border-[var(--byzantine-gold)] focus:ring-[var(--ancient-gold-glow)] rounded-lg h-11 font-crimson"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-12 bg-[var(--ancient-gold-alpha)] hover:bg-[var(--ancient-gold-glow)] border border-[var(--ancient-gold)] text-byzantine-gold font-inter rounded-lg transition-all duration-300 mt-6"
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2" />
                    Authenticatio...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt mr-2" />
                    Intra Locum Sacrum
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
          
          {/* Register Form */}
          <TabsContent value="register" className="space-y-5">
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="register-username" className="text-byzantine-gold font-inter text-sm flex items-center">
                  <i className="fas fa-user mr-2 text-xs" />
                  Nomen Usoris
                </Label>
                <Input
                  id="register-username"
                  type="text"
                  value={registerData.username}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="Nomen sacrum tuum elige"
                  className="bg-[var(--gothic-stone)] border-[var(--ancient-gold-alpha)] text-parchment placeholder-parchment/60 focus:border-[var(--byzantine-gold)] focus:ring-[var(--ancient-gold-glow)] rounded-lg h-11 font-crimson"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-password" className="text-byzantine-gold font-inter text-sm flex items-center">
                  <i className="fas fa-key mr-2 text-xs" />
                  Tessera
                </Label>
                <Input
                  id="register-password"
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Clavem sacram tuam crea"
                  className="bg-[var(--gothic-stone)] border-[var(--ancient-gold-alpha)] text-parchment placeholder-parchment/60 focus:border-[var(--byzantine-gold)] focus:ring-[var(--ancient-gold-glow)] rounded-lg h-11 font-crimson"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-byzantine-gold font-inter text-sm flex items-center">
                  <i className="fas fa-shield-alt mr-2 text-xs" />
                  Tessera Confirmatio
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder="Clavem sacram tuam confirma"
                  className="bg-[var(--gothic-stone)] border-[var(--ancient-gold-alpha)] text-parchment placeholder-parchment/60 focus:border-[var(--byzantine-gold)] focus:ring-[var(--ancient-gold-glow)] rounded-lg h-11 font-crimson"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-12 bg-[var(--ancient-gold-alpha)] hover:bg-[var(--ancient-gold-glow)] border border-[var(--ancient-gold)] text-byzantine-gold font-inter rounded-lg transition-all duration-300 mt-6"
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2" />
                    Ratiōnem sacram creandō...
                  </>
                ) : (
                  <>
                    <i className="fas fa-user-plus mr-2" />
                    Iter Sacrum Incipe
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        {/* Sacred Footer */}
        <div className="text-center pt-4 border-t border-[var(--ancient-gold-alpha)] mt-6">
          <p className="text-sacred-ivory/60 font-cormorant text-xs italic">
            "Ora pro nobis" - Orationes tuae sacrae et protectae sunt
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}