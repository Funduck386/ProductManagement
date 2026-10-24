import React from 'react';
import type { CartItem } from '../types';
import { X, ShoppingCart, Trash2, Minus, Plus, ArrowRight, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateCartQty: (productId: string, delta: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateCartQty,
  onRemoveFromCart,
  onClearCart,
}) => {
  if (!isOpen) return null;

  // Number of distinct products in cart
  const productTypesCount = cartItems.length;
  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <div
        className="cart-drawer-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div className="cart-drawer-title-wrap">
            <ShoppingCart size={20} className="cart-header-icon" />
            <h2 id="cart-title" className="cart-drawer-title">
              Cart ({productTypesCount})
            </h2>
          </div>
          <button
            type="button"
            className="cart-close-btn"
            onClick={onClose}
            aria-label="Close cart drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="cart-drawer-body">
          {cartItems.length === 0 ? (
            <div className="cart-empty-state">
              <div className="cart-empty-icon-box">
                <ShoppingCart size={48} className="cart-empty-icon" />
              </div>
              <p className="cart-empty-title">Cart is currently empty</p>
              <p className="cart-empty-subtitle">
                Explore our catalog and add your favorite tech essentials!
              </p>
              <button
                type="button"
                className="cart-shop-now-btn"
                onClick={onClose}
              >
                <span>Browse Products</span>
                <ArrowRight size={15} />
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map(({ product, quantity }) => {
                const itemSubtotal = product.price * quantity;
                return (
                  <div key={product.id} className="cart-item-card">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="cart-item-img"
                    />

                    <div className="cart-item-details">
                      <div className="cart-item-title-row">
                        <h4 className="cart-item-name">{product.name}</h4>
                        <button
                          type="button"
                          className="cart-item-remove-btn"
                          onClick={() => onRemoveFromCart(product.id)}
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="cart-item-meta">
                        <span className="cart-item-unit-price">
                          ${product.price.toFixed(2)} each
                        </span>
                        <span className="cart-item-category">{product.category}</span>
                      </div>

                      <div className="cart-item-footer">
                        {/* Stepper controls */}
                        <div className="stepper-controls cart-stepper">
                          <button
                            type="button"
                            className="stepper-btn small"
                            onClick={() => onUpdateCartQty(product.id, -1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="stepper-count">{quantity}</span>
                          <button
                            type="button"
                            className="stepper-btn small"
                            onClick={() => onUpdateCartQty(product.id, 1)}
                            disabled={quantity >= product.inventory}
                            title={
                              quantity >= product.inventory
                                ? 'Reached available in-stock inventory'
                                : 'Increase quantity'
                            }
                            aria-label="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        {/* Item Subtotal */}
                        <div className="cart-item-subtotal">
                          <span className="item-subtotal-val">
                            ${itemSubtotal.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Drawer Footer with Totals and Checkout */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-block">
              <div className="summary-row">
                <span>Subtotal ({productTypesCount} product{productTypesCount === 1 ? '' : 's'})</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Standard Shipping</span>
                <span className="free-badge">FREE</span>
              </div>
              <div className="summary-row total-row">
                <span>Cart Total</span>
                <span className="cart-total-amount">
                  ${cartSubtotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="cart-actions-row">
              <button
                type="button"
                className="btn-clear-cart"
                onClick={onClearCart}
              >
                Clear Cart
              </button>
              <button
                type="button"
                className="btn-checkout"
                onClick={() => {
                  alert(
                    `Thank you for your order! Total paid: $${cartSubtotal.toFixed(2)}`
                  );
                  onClearCart();
                  onClose();
                }}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="cart-guarantee">
              <ShieldCheck size={14} />
              <span>Secure checkout powered by Pre-Final-Exam_YN</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
