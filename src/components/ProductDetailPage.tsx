import React, { useState } from 'react';
import type { Product } from '../types';
import {
  ArrowLeft,
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

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onUpdateInventory: (productId: string, delta: number) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onAddToCart,
  onUpdateInventory,
}) => {
  const [purchaseQty, setPurchaseQty] = useState(1);

  const isLowStock = product.quantity < 5 && product.quantity > 0;
  const isOutOfStock = product.quantity === 0;
  const currentSubtotal = product.price * product.quantity;

  const handleDecreasePurchase = () => {
    if (purchaseQty > 1) {
      setPurchaseQty(purchaseQty - 1);
    }
  };

  const handleIncreasePurchase = () => {
    if (purchaseQty < product.quantity) {
      setPurchaseQty(purchaseQty + 1);
    }
  };

  const handleAddToCartWithQty = () => {
    if (product.quantity > 0) {
      onAddToCart(product, purchaseQty);
    }
  };

  // Parse specifications into items if separated by |
  const specItems = product.specification
    ? product.specification.split('|').map((s) => s.trim())
    : [];

  return (
    <div className="product-detail-page">
      {/* Top Bar with Back Link and Breadcrumbs */}
      <div className="detail-top-nav">
        <button
          type="button"
          className="back-btn"
          onClick={onBack}
        >
          <ArrowLeft size={18} />
          <span>Back to Products</span>
        </button>

        <nav className="detail-breadcrumbs" aria-label="Breadcrumb">
          <span className="crumb-link" onClick={onBack}>Products</span>
          <span className="crumb-separator">/</span>
          <span className="crumb-category">{product.category}</span>
          <span className="crumb-separator">/</span>
          <span className="crumb-current">{product.name}</span>
        </nav>
      </div>

      {/* Main Product Showcase Card */}
      <div className="detail-card">
        {/* Left: Product Image */}
        <div className="detail-image-section">
          <div className="detail-image-wrapper">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="detail-main-image"
            />
            <span className="detail-category-badge">{product.category}</span>
          </div>

          {/* Quick Specifications Tag Cloud */}
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

        {/* Right: Product Details & Controls */}
        <div className="detail-info-section">
          <div className="detail-header-block">
            {/* Rating Stars */}
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
                {product.rating.toFixed(1)} / 5.0 Rating
              </span>
              <span className="verified-badge">Verified Product</span>
            </div>

            <h1 className="detail-product-title">{product.name}</h1>

            {/* Price & Subtotal */}
            <div className="detail-price-box">
              <div className="detail-unit-price">
                <span className="price-label">Unit Price</span>
                <span className="price-amount">${product.price.toFixed(2)}</span>
              </div>
              <div className="detail-total-subtotal">
                <span className="subtotal-label">Subtotal (Inventory Value)</span>
                <span className="subtotal-amount">
                  ${currentSubtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Stock Status Banner */}
          <div className="detail-stock-section">
            <div className="stock-status-row">
              <span className="stock-label">Stock Status:</span>
              {isOutOfStock ? (
                <span className="stock-pill out-of-stock">
                  <AlertTriangle size={14} />
                  <span>Out of Stock (0 remaining)</span>
                </span>
              ) : isLowStock ? (
                <span className="stock-pill low-stock">
                  <AlertTriangle size={14} />
                  <span>Low Stock Alert ({product.quantity} remaining)</span>
                </span>
              ) : (
                <span className="stock-pill in-stock">
                  <CheckCircle size={14} />
                  <span>In Stock ({product.quantity} units available)</span>
                </span>
              )}
            </div>

            {/* Live Inventory Stepper */}
            <div className="inventory-adjustment-bar">
              <span className="inventory-adj-label">Adjust In-Stock Inventory:</span>
              <div className="stepper-controls">
                <button
                  type="button"
                  className="stepper-btn"
                  onClick={() => onUpdateInventory(product.id, -1)}
                  disabled={product.quantity <= 0}
                  title="Decrease in-stock units"
                >
                  <Minus size={15} />
                </button>
                <span className="stepper-count">{product.quantity}</span>
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
            <h3 className="section-heading">Full Description</h3>
            <p className="detail-description-text">{product.description}</p>
          </div>

          {/* Add to Cart Action Area */}
          <div className="detail-action-card">
            <div className="purchase-qty-picker">
              <span className="qty-picker-label">Purchase Quantity:</span>
              <div className="stepper-controls">
                <button
                  type="button"
                  className="stepper-btn"
                  onClick={handleDecreasePurchase}
                  disabled={purchaseQty <= 1 || isOutOfStock}
                >
                  <Minus size={15} />
                </button>
                <span className="stepper-count">{isOutOfStock ? 0 : purchaseQty}</span>
                <button
                  type="button"
                  className="stepper-btn"
                  onClick={handleIncreasePurchase}
                  disabled={purchaseQty >= product.quantity || isOutOfStock}
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>

            <div className="cart-cta-wrap">
              {isOutOfStock ? (
                <button
                  type="button"
                  className="detail-add-btn disabled"
                  disabled
                >
                  <span>Currently Out of Stock</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="detail-add-btn"
                  onClick={handleAddToCartWithQty}
                >
                  <ShoppingCart size={18} />
                  <span>Add to Cart ({purchaseQty} item{purchaseQty > 1 ? 's' : ''})</span>
                </button>
              )}
            </div>
          </div>

          {/* Meta Details List */}
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
  );
};
