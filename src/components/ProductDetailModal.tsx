import React, { useEffect } from 'react';
import type { Product } from '../types';
import {
  X,
  ShoppingCart,
  Star,
  AlertTriangle,
  CheckCircle,
  Package,
  Layers,
  Sparkles,
  Minus,
  Plus,
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onUpdateInventory: (productId: string, delta: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onUpdateQuantity,
  onUpdateInventory,
}) => {
  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const isLowStock = product.inventory < 5 && product.inventory > 0;
  const isOutOfStock = product.inventory === 0;
  const currentSubtotal = product.price * product.quantity;

  const handleDecreasePurchase = () => {
    if (product.quantity > 0) {
      onUpdateQuantity(product.id, -1);
    }
  };

  const handleIncreasePurchase = () => {
    if (product.inventory > 0) {
      onUpdateQuantity(product.id, 1);
    }
  };

  const handleAddToCartAction = () => {
    if (product.quantity > 0 && product.inventory >= 0) {
      onAddToCart(product, product.quantity);
    } else if (product.quantity === 0 && product.inventory > 0) {
      onUpdateQuantity(product.id, 1);
      onAddToCart(product, 1);
    }
  };

  // Parse specifications into items if separated by |
  const specItems = product.specification
    ? product.specification.split('|').map((s) => s.trim())
    : [];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content product-detail-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="product-modal-title"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="detail-modal-tag">{product.category}</span>
            <h2 id="product-modal-title" className="modal-title">
              Product Details
            </h2>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close product details"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="detail-modal-body">
          {/* Left Column: Product Image & Tech Specs */}
          <div className="detail-modal-media-col">
            <div className="detail-modal-image-wrap">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="detail-modal-image"
              />
              <span className="product-category-badge">{product.category}</span>
            </div>

            {/* Specifications Box */}
            <div className="specifications-box">
              <h4 className="specs-title">
                <Sparkles size={16} />
                <span>Technical Specifications</span>
              </h4>
              <div className="specs-list">
                {specItems.length > 0 ? (
                  specItems.map((spec, i) => (
                    <div key={i} className="spec-tag">
                      <span className="spec-dot">•</span>
                      <span>{spec}</span>
                    </div>
                  ))
                ) : (
                  <p className="no-specs-text">{product.specification}</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Information, Pricing, Stock & Actions */}
          <div className="detail-modal-info-col">
            {/* Rating Row */}
            <div className="detail-rating-row">
              <div className="stars-wrapper">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={`star-icon ${star <= Math.round(product.rating) ? 'filled' : ''}`}
                  />
                ))}
              </div>
              <span className="rating-text">
                {product.rating.toFixed(1)} / 5.0
              </span>
              <span className="verified-badge">Verified Authentic</span>
            </div>

            {/* Title */}
            <h1 className="detail-modal-name">{product.name}</h1>

            {/* Price & Subtotal Box */}
            <div className="detail-price-box">
              <div className="detail-unit-price">
                <span className="price-label">Unit Price</span>
                <span className="price-amount">${product.price.toFixed(2)}</span>
              </div>
              <div className="detail-total-subtotal">
                <span className="subtotal-label">Subtotal (Price × Quantity)</span>
                <span className="subtotal-amount">
                  ${currentSubtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Stock Status Bar */}
            <div className="detail-stock-section">
              <div className="stock-status-row">
                <span className="stock-label">Inventory:</span>
                {isOutOfStock ? (
                  <span className="stock-pill out-of-stock">
                    <AlertTriangle size={14} />
                    <span>Out of Stock (0 remaining)</span>
                  </span>
                ) : isLowStock ? (
                  <span className="stock-pill low-stock">
                    <AlertTriangle size={14} />
                    <span>Low Stock ({product.inventory} units available)</span>
                  </span>
                ) : (
                  <span className="stock-pill in-stock">
                    <CheckCircle size={14} />
                    <span>In Stock ({product.inventory} units)</span>
                  </span>
                )}
              </div>

              {/* Adjust In-Stock Inventory Stepper */}
              <div className="inventory-adjustment-bar">
                <span className="inventory-adj-label">Adjust In-Stock:</span>
                <div className="stepper-controls">
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => onUpdateInventory(product.id, -1)}
                    disabled={product.inventory <= 0}
                    title="Decrease in-stock units"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="stepper-count">{product.inventory}</span>
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => onUpdateInventory(product.id, 1)}
                    title="Increase in-stock units"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="detail-description-section">
              <h3 className="section-heading">Description</h3>
              <p className="detail-description-text">{product.description}</p>
            </div>

            {/* Purchase Action Box */}
            <div className="detail-action-card">
              <div className="purchase-qty-picker">
                <span className="qty-picker-label">Quantity:</span>
                <div className="stepper-controls">
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={handleDecreasePurchase}
                    disabled={product.quantity <= 0}
                    title={product.quantity <= 0 ? 'Quantity is already 0' : 'Decrease purchase quantity'}
                  >
                    <Minus size={15} />
                  </button>
                  <span className="stepper-count">{product.quantity}</span>
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={handleIncreasePurchase}
                    disabled={product.inventory <= 0}
                    title={
                      product.inventory <= 0
                        ? 'Cannot exceed inventory'
                        : 'Increase purchase quantity'
                    }
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>

              <div className="cart-cta-wrap">
                {isOutOfStock && product.quantity === 0 ? (
                  <button
                    type="button"
                    className="detail-add-btn disabled"
                    disabled
                  >
                    <span>Currently Out of Stock</span>
                  </button>
                ) : product.quantity === 0 ? (
                  <button
                    type="button"
                    className="detail-add-btn zero-qty"
                    onClick={handleAddToCartAction}
                  >
                    <ShoppingCart size={18} />
                    <span>Add to Cart (1)</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="detail-add-btn"
                    onClick={handleAddToCartAction}
                  >
                    <ShoppingCart size={18} />
                    <span>Add to Cart ({product.quantity})</span>
                  </button>
                )}
              </div>
            </div>

            {/* Metadata Footer */}
            <div className="detail-quick-meta">
              <div className="meta-item">
                <Package size={15} />
                <span>SKU: {product.id.toUpperCase()}</span>
              </div>
              <div className="meta-item">
                <Layers size={15} />
                <span>Category: {product.category}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
