import React from 'react';
import type { Product } from '../types';
import { Minus, Plus, ShoppingCart, Eye, AlertTriangle } from 'lucide-react';

interface ProductTableProps {
  products: Product[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onUpdateQuantity,
  onAddToCart,
  onSelectProduct,
}) => {
  return (
    <div className="table-responsive-container">
      <table className="products-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Inventory</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const subtotal = product.price * product.quantity;
            const isLowStock = product.inventory < 5 && product.inventory > 0;
            const isOutOfStock = product.inventory === 0;

            return (
              <tr key={product.id} className={isLowStock ? 'row-low-stock' : ''}>
                {/* Product Name and Image */}
                <td className="product-col">
                  <div className="table-product-cell">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="table-product-thumb"
                      onClick={() => onSelectProduct(product)}
                    />
                    <div className="table-product-meta">
                      <span
                        className="table-product-title"
                        onClick={() => onSelectProduct(product)}
                      >
                        {product.name}
                      </span>
                      <span className="table-product-rating">★ {product.rating.toFixed(1)} / 5</span>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td>
                  <span className="table-category-pill">{product.category}</span>
                </td>

                {/* Unit Price */}
                <td className="table-price">${product.price.toFixed(2)}</td>

                {/* Inventory in-stock status */}
                <td>
                  <div className="table-qty-cell">
                    <span className={`table-qty-value ${product.inventory < 5 ? 'low-stock-num' : ''}`}>
                      {product.inventory}
                    </span>
                    {isLowStock && (
                      <span className="low-stock-badge">
                        <AlertTriangle size={11} />
                        <span>low stock</span>
                      </span>
                    )}
                    {isOutOfStock && (
                      <span className="out-of-stock-badge">
                        <span>out of stock</span>
                      </span>
                    )}
                  </div>
                </td>

                {/* Purchase Quantity Stepper */}
                <td>
                  <div className="stepper-controls table-stepper">
                    <button
                      type="button"
                      className="stepper-btn small"
                      onClick={() => onUpdateQuantity(product.id, -1)}
                      disabled={product.quantity <= 0}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="stepper-count">{product.quantity}</span>
                    <button
                      type="button"
                      className="stepper-btn small"
                      onClick={() => onUpdateQuantity(product.id, 1)}
                      disabled={product.quantity >= product.inventory || isOutOfStock}
                      aria-label="Increase quantity"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                </td>

                {/* Subtotal (Price * Quantity) */}
                <td className="table-subtotal">
                  ${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>

                {/* Actions */}
                <td className="text-right">
                  <div className="table-actions-cell">
                    <button
                      type="button"
                      className="table-action-icon-btn"
                      onClick={() => onSelectProduct(product)}
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>

                    {isOutOfStock ? (
                      <button
                        type="button"
                        className="table-action-btn disabled"
                        disabled
                      >
                        Out
                      </button>
                    ) : product.quantity === 0 ? (
                      <button
                        type="button"
                        className="table-action-btn zero-qty"
                        onClick={() => onUpdateQuantity(product.id, 1)}
                        title="Increase quantity"
                      >
                        <ShoppingCart size={14} />
                        <span>Add</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="table-action-btn"
                        onClick={() => onAddToCart(product)}
                      >
                        <ShoppingCart size={14} />
                        <span>Add ({product.quantity})</span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
