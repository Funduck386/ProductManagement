import React from 'react';
import type { Product } from '../types';
import { Minus, Plus, ShoppingCart, Eye, AlertTriangle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onUpdateQuantity: (id: string, delta: number) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onUpdateQuantity,
  onAddToCart,
  onSelectProduct,
}) => {
  // Compute subtotal: price * quantity (quantity starts at 0)
  const subtotal = product.price * product.quantity;
  const isLowStock = product.inventory < 5 && product.inventory > 0;
  const isOutOfStock = product.inventory === 0;

  return (
    <div className={`product-card ${isLowStock ? 'card-low-stock' : ''} ${isOutOfStock ? 'card-out-of-stock' : ''}`}>
      {/* Product Image Area */}
      <div className="product-image-wrap" onClick={() => onSelectProduct(product)}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        <span className="product-category-badge">{product.category}</span>

        {/* Quick view overlay icon */}
        <div className="quick-view-overlay">
          <span className="quick-view-pill">
            <Eye size={14} />
            <span>View Details</span>
          </span>
        </div>
      </div>

      {/* Product Information */}
      <div className="product-body">
        {/* Title */}
        <h3
          className="product-name"
          onClick={() => onSelectProduct(product)}
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Price & Current Inventory Row (Inventory replaces Qty) */}
        <div className="product-meta-row">
          <div className="product-price">
            <span className="meta-label">Price:</span>
            <span className="price-value">${product.price.toFixed(2)}</span>
          </div>

          <div className="product-stock-status">
            <span className="meta-label">Inventory:</span>
            <span className={`stock-number ${product.inventory < 5 ? 'low-stock-num' : ''}`}>
              {product.inventory}
            </span>

            {/* Conditional formatting: Low Stock highlight */}
            {isLowStock && (
              <span className="low-stock-badge">
                <AlertTriangle size={11} />
                <span>low stock</span>
              </span>
            )}

            {/* Conditional formatting: Out of stock */}
            {isOutOfStock && (
              <span className="out-of-stock-badge">
                <span>out of stock</span>
              </span>
            )}
          </div>
        </div>

        {/* Quantity Stepper Controls (Starts with zero) */}
        <div className="inventory-stepper-box">
          <span className="inventory-label">Quantity:</span>
          <div className="stepper-controls">
            {/* Conditional Rendering: Minus button is disabled when quantity is 0 */}
            <button
              type="button"
              className="stepper-btn"
              onClick={() => onUpdateQuantity(product.id, -1)}
              disabled={product.quantity <= 0}
              aria-label="Decrease quantity"
              title={product.quantity <= 0 ? 'Quantity is already 0' : 'Decrease quantity'}
            >
              <Minus size={15} />
            </button>

            <span className="stepper-count">{product.quantity}</span>

            {/* Plus button: disabled if reaching inventory limit */}
            <button
              type="button"
              className="stepper-btn"
              onClick={() => onUpdateQuantity(product.id, 1)}
              disabled={product.quantity >= product.inventory || isOutOfStock}
              aria-label="Increase quantity"
              title={
                isOutOfStock
                  ? 'Product is out of stock'
                  : product.quantity >= product.inventory
                  ? 'Cannot exceed available inventory'
                  : 'Increase quantity'
              }
            >
              <Plus size={15} />
            </button>
          </div>
        </div>

        {/* Subtotal Row */}
        <div className="subtotal-row">
          <span className="subtotal-label">TOTAL (SUBTOTAL):</span>
          <span className="subtotal-value">
            ${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        {/* Add to Cart button using conditional rendering */}
        {isOutOfStock ? (
          <button
            type="button"
            className="add-to-cart-btn disabled"
            disabled
          >
            <span>Out of Stock</span>
          </button>
        ) : product.quantity === 0 ? (
          <button
            type="button"
            className="add-to-cart-btn zero-qty"
            onClick={() => onUpdateQuantity(product.id, 1)}
            title="Increase quantity to add to cart"
          >
            <ShoppingCart size={17} />
            <span>Add to Cart</span>
          </button>
        ) : (
          <button
            type="button"
            className="add-to-cart-btn"
            onClick={() => onAddToCart(product)}
          >
            <ShoppingCart size={17} />
            <span>Add to Cart ({product.quantity})</span>
          </button>
        )}
      </div>
    </div>
  );
};
