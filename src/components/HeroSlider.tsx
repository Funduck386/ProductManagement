import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

interface Slide {
  badge: string;
  title: string;
  description: string;
  imageUrl: string;
  actionText: string;
  category: string;
}

const SLIDES: Slide[] = [
  {
    badge: 'NEW ARRIVALS',
    title: 'Next-Gen Tech Essentials',
    description: 'Upgrade your workflow with top tier performance & high-efficiency gear.',
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=700&q=80',
    actionText: 'Explore Collection',
    category: 'Audio',
  },
  {
    badge: 'LIMITED EDITION',
    title: 'Smart Health & Precision',
    description: 'Next-level health tracking, seamless connectivity, and durable aerospace design.',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80',
    actionText: 'Discover Wearables',
    category: 'Wearables',
  },
  {
    badge: 'PRO PERFORMANCE',
    title: 'Master Your Workspace',
    description: 'Engineered for coders, designers, and creators who demand tactile perfection.',
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=700&q=80',
    actionText: 'View Gear',
    category: 'Gaming',
  },
];

interface HeroSliderProps {
  onSelectCategory: (category: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onSelectCategory }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const slide = SLIDES[currentSlide];

  return (
    <section className="hero-slider-section">
      <div className="hero-card">
        {/* Background ambient radial gradients */}
        <div className="hero-glow-1"></div>
        <div className="hero-glow-2"></div>

        {/* Content Side */}
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={13} className="hero-badge-icon" />
            <span>{slide.badge}</span>
          </div>

          <h1 className="hero-title">{slide.title}</h1>
          <p className="hero-description">{slide.description}</p>

          <button
            type="button"
            className="hero-action-btn"
            onClick={() => onSelectCategory(slide.category)}
          >
            <span>{slide.actionText}</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Image Side */}
        <div className="hero-image-wrapper">
          <img
            key={slide.imageUrl}
            src={slide.imageUrl}
            alt={slide.title}
            className="hero-image"
          />
        </div>

        {/* Navigation Arrows */}
        <button
          type="button"
          className="slider-nav-btn prev"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          type="button"
          className="slider-nav-btn next"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>

        {/* Indicator dots */}
        <div className="slider-indicators">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

