
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Bell, Check, X } from 'lucide-react';

interface ConsentBannerProps {
  onConsentGiven: (consented: boolean) => void;
}

const ConsentBanner = ({ onConsentGiven }: ConsentBannerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setIsAnimating(true);
    }, 3000); // Show after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleConsent = (consented: boolean) => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      onConsentGiven(consented);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
      isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
    }`}>
      <Card className="w-80 glass-morphism neon-border animate-neon-pulse">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="bg-neon-gradient p-2 rounded-full flex-shrink-0">
              <Mail className="w-4 h-4 text-cyber-dark" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-cyber-neon mb-1">
                🎁 Ofertas Exclusivas
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Recibe descuentos VIP, lanzamientos anticipados y contenido exclusivo directo en tu email.
              </p>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={() => handleConsent(true)}
                  className="bg-neon-gradient hover:opacity-90 text-cyber-dark font-medium flex-1"
                >
                  <Check className="w-3 h-3 mr-1" />
                  ¡Sí, quiero!
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleConsent(false)}
                  className="border-cyber-accent text-muted-foreground hover:bg-cyber-surface"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsentBanner;
