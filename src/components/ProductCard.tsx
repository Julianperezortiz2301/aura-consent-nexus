
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  featured?: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className={`group glass-morphism hover:neon-border transition-all duration-300 hover:scale-105 ${
      product.featured ? 'neon-border animate-neon-pulse' : ''
    }`}>
      <CardContent className="p-4">
        <div className="aspect-square bg-cyber-surface rounded-lg mb-3 overflow-hidden relative">
          <img 
            src={`https://images.unsplash.com/${product.image}?w=300&h=300&fit=crop`}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {product.featured && (
            <div className="absolute top-2 right-2 bg-neon-gradient text-cyber-dark text-xs px-2 py-1 rounded-full font-semibold">
              HOT
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="text-xs text-cyber-neon font-medium">{product.category}</div>
          <h3 className="font-semibold text-foreground group-hover:text-cyber-neon transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold neon-text">${product.price}</span>
            <Button 
              size="sm" 
              className="bg-cyber-surface hover:bg-neon-gradient hover:text-cyber-dark transition-all duration-300"
            >
              Añadir
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
