import React from 'react';
import { Box, ShoppingCart, Plus, Package } from 'lucide-react';

interface NavbarProps {
  totalCartCount: number;
  onOpenCart: () => void;
  onOpenAddModal: () => void;
  onNavigateHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  totalCartCount,
  onOpenCart,
  onOpenAddModal,
  onNavigateHome,
}) => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand Logo */}
        <div className="brand" onClick={onNavigateHome} role="button" tabIndex={0}>
          <div className="brand-icon-wrapper">
            <Box className="brand-icon" size={24} />
          </div>
          <div className="brand-text">
            <span className="brand-title">Pre-Final-Exam_YN</span>
            <span className="brand-subtitle">Product Management App</span>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="nav-links">
          <button
            type="button"
            className="nav-link"
            onClick={onNavigateHome}
          >
            <Package size={17} />
            <span>Products</span>
          </button>

          <button
            type="button"
            className="nav-link add-product-btn"
            onClick={onOpenAddModal}
          >
            <Plus size={17} />
            <span>Add Product</span>
          </button>

          {/* Cart button */}
          <button
            type="button"
            className="cart-button"
            onClick={onOpenCart}
            aria-label={`Cart with ${totalCartCount} products`}
          >
            <ShoppingCart size={18} />
            <span>Cart ({totalCartCount})</span>
            {totalCartCount > 0 && <span className="cart-badge-dot"></span>}
          </button>
        </nav>
      </div>
    </header>
  );
};

