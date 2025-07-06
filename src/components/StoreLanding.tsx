
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import ProductCard from './ProductCard';
import ConsentBanner from './ConsentBanner';
import { Bell, User, LogIn } from 'lucide-react';

interface User {
  email: string;
  consented?: boolean;
}

interface StoreLandingProps {
  user: User;
  onLogout: () => void;
}

const StoreLanding = ({ user, onLogout }: StoreLandingProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showConsentBanner, setShowConsentBanner] = useState(true);
  const [userConsented, setUserConsented] = useState(false);

  const products = [
    { id: 1, name: 'Auriculares Neural', price: 299, image: 'photo-1484704849700-f032a568e944', category: 'Audio Tech', featured: true },
    { id: 2, name: 'Smartwatch Quantum', price: 599, image: 'photo-1523275335684-37898b6baf30', category: 'Wearables' },
    { id: 3, name: 'Laptop Holográfica', price: 1299, image: 'photo-1496181133206-80ce9b88a853', category: 'Computing', featured: true },
    { id: 4, name: 'Drone IA Pro', price: 899, image: 'photo-1473968512647-3e447244af8f', category: 'Robotics' },
    { id: 5, name: 'VR Headset Elite', price: 799, image: 'photo-1593508512255-86ab42a8e620', category: 'Virtual Reality' },
    { id: 6, name: 'Speaker Levitante', price: 399, image: 'photo-1608043152269-423dbba4d7da', category: 'Audio Tech' },
  ];

  const categories = ['Todo', 'Audio Tech', 'Wearables', 'Computing', 'Robotics', 'Virtual Reality'];
  const [selectedCategory, setSelectedCategory] = useState('Todo');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todo' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleConsentResponse = (consented: boolean) => {
    setUserConsented(consented);
    setShowConsentBanner(false);
    
    if (consented) {
      // Show success notification
      setTimeout(() => {
        alert('¡Perfecto! Ahora recibirás ofertas exclusivas en tu email. 🎉');
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-cyber-gradient">
      {/* Header */}
      <header className="glass-morphism border-b border-cyber-accent sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold neon-text">CyberStore 2025</h1>
              <Badge variant="secondary" className="bg-neon-gradient text-cyber-dark">
                BETA
              </Badge>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm">
                <User className="w-4 h-4 text-cyber-neon" />
                <span className="text-muted-foreground">{user.email}</span>
                {userConsented && (
                  <Badge variant="outline" className="border-cyber-neon text-cyber-neon">
                    <Bell className="w-3 h-3 mr-1" />
                    VIP
                  </Badge>
                )}
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={onLogout}
                className="border-cyber-accent hover:bg-cyber-surface"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Salir
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyber-neon rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyber-purple rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
            Bienvenido al
            <span className="neon-text block">Futuro del Comercio</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Descubre productos revolucionarios diseñados para la nueva era digital
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <Input
              type="text"
              placeholder="Buscar productos futuristas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-cyber-surface border-cyber-accent focus:neon-border text-center py-3"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 mb-8">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category 
                  ? "bg-neon-gradient text-cyber-dark" 
                  : "border-cyber-accent text-muted-foreground hover:bg-cyber-surface"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-4 pb-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No se encontraron productos que coincidan con tu búsqueda.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Consent Banner */}
      {showConsentBanner && !userConsented && (
        <ConsentBanner onConsentGiven={handleConsentResponse} />
      )}
    </div>
  );
};

export default StoreLanding;
