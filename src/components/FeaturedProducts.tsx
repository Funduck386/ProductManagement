import React from 'react';
import type { Product } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FeaturedProductsProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  onSelectProduct,
}) => {
  // One featured representative per category
  const featured = products.filter((p) => p.isFeatured);

  return (
    <section className="featured-section">
      <div className="section-header">
        <div className="section-title-wrap">
          <div className="section-title-row">
            <Sparkles size={20} className="section-icon" />
            <h2 className="section-title">Feature Products</h2>
          </div>
          <p className="section-subtitle">Click any card to open detailed page view</p>
        </div>
      </div>

      <div className="featured-grid">
        {featured.map((product) => (
          <div
            key={product.id}
            className="featured-card"
            onClick={() => onSelectProduct(product)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onSelectProduct(product);
              }
            }}
          >
            <div className="featured-image-container">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="featured-image"
                loading="lazy"
              />
              <span className="featured-badge">{product.category}</span>
            </div>

            <div className="featured-info">
              <h3 className="featured-name">{product.name}</h3>
              <div className="featured-footer">
                <span className="featured-price">${product.price.toFixed(2)}</span>
                <span className="featured-view-link">
                  View <ArrowRight size={14} className="arrow-icon" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
