import { useState, useMemo } from 'react';
import type { Product, CartItem, ToastMessage } from './types';
import { DEFAULT_PRODUCTS, CATEGORIES } from './data/defaultProducts';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { FeaturedProducts } from './components/FeaturedProducts';
import { ProductCard } from './components/ProductCard';
import { ProductTable } from './components/ProductTable';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AddProductModal } from './components/AddProductModal';
import { CartDrawer } from './components/CartDrawer';
import { ToastContainer } from './components/Toast';
import {
  Package,
  LayoutGrid,
  List,
  Search,
  Plus,
  SlidersHorizontal,
} from 'lucide-react';
import './App.css';

export function App() {
  // Products state (defaults loaded)
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Navigation & View state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');

  // Filtering state
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Toast notifications state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (
    title: string,
    message: string,
    type: 'success' | 'info' | 'warning' | 'error' = 'success'
  ) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Add new product dynamically
  const handleAddProduct = (newProdData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...newProdData,
      id: `prod-${Date.now()}`,
    };

    setProducts((prev) => [newProduct, ...prev]);

    showToast(
      'Product Created!',
      `"${newProduct.name}" added to catalog (Inventory: ${newProduct.inventory}, Quantity: 0)`,
      'success'
    );
  };

  // Update purchase quantity (+/- 1) & reduce/restore inventory dynamically
  const handleUpdateQuantity = (productId: string, delta: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          // Cannot increase if no inventory left
          if (delta > 0 && p.inventory <= 0) return p;
          // Cannot decrease if quantity is already 0
          if (delta < 0 && p.quantity <= 0) return p;

          const newQty = p.quantity + delta;
          const newInv = p.inventory - delta; // Inventory reduced as quantity is assigned!
          return { ...p, quantity: newQty, inventory: newInv };
        }
        return p;
      })
    );

    // Sync cart quantity if already present in cart
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === productId);
      if (!existing) return prev;

      const nextQty = existing.quantity + delta;
      if (nextQty <= 0) {
        return prev.filter((item) => item.product.id !== productId);
      }
      return prev.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: nextQty,
              product: {
                ...item.product,
                quantity: nextQty,
                inventory: item.product.inventory - delta,
              },
            }
          : item
      );
    });
  };

  // Update in-stock inventory (+/- 1)
  const handleUpdateInventory = (productId: string, delta: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newInv = Math.max(0, p.inventory + delta);
          return { ...p, inventory: newInv };
        }
        return p;
      })
    );
  };

  // Add to cart with conditional rendering feedback
  const handleAddToCart = (product: Product, quantityToAdd?: number) => {
    const currentProd = products.find((p) => p.id === product.id) || product;
    let qty = quantityToAdd !== undefined ? quantityToAdd : currentProd.quantity;

    // If quantity is 0, assign 1 unit automatically and reduce inventory by 1
    if (qty <= 0) {
      if (currentProd.inventory <= 0) {
        showToast('Out of Stock', `"${currentProd.name}" is currently out of stock.`, 'warning');
        return;
      }
      // Assign 1 unit
      qty = 1;
      setProducts((prev) =>
        prev.map((p) =>
          p.id === currentProd.id
            ? { ...p, quantity: 1, inventory: p.inventory - 1 }
            : p
        )
      );
    }

    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === currentProd.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === currentProd.id ? { ...item, quantity: qty } : item
        );
      } else {
        return [...prev, { product: { ...currentProd, quantity: qty }, quantity: qty }];
      }
    });

    showToast(
      'Added to Cart',
      `${qty}x "${currentProd.name}" added to your cart.`,
      'success'
    );
  };

  // Update Cart quantity from Drawer
  const handleUpdateCartQty = (productId: string, delta: number) => {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;

    if (delta > 0 && prod.inventory <= 0) {
      showToast('Limit Reached', `No more available inventory for "${prod.name}".`, 'info');
      return;
    }

    // Update product quantity and inventory
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newQty = Math.max(0, p.quantity + delta);
          const newInv = p.inventory - delta;
          return { ...p, quantity: newQty, inventory: newInv };
        }
        return p;
      })
    );

    // Update cart items
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove from cart (restores inventory)
  const handleRemoveFromCart = (productId: string) => {
    const itemToRemove = cartItems.find((item) => item.product.id === productId);
    if (itemToRemove) {
      const restoreCount = itemToRemove.quantity;
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id === productId) {
            return {
              ...p,
              quantity: 0,
              inventory: p.inventory + restoreCount,
            };
          }
          return p;
        })
      );
    }
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Removed', 'Item was removed and returned to inventory.', 'info');
  };

  // Clear entire cart (restores all inventory)
  const handleClearCart = () => {
    setProducts((prev) =>
      prev.map((p) => {
        const itemInCart = cartItems.find((ci) => ci.product.id === p.id);
        if (itemInCart) {
          return {
            ...p,
            quantity: 0,
            inventory: p.inventory + itemInCart.quantity,
          };
        }
        return p;
      })
    );
    setCartItems([]);
    showToast('Cart Cleared', 'All items returned to inventory.', 'info');
  };

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        p.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  // Overall total of all subtotals
  const overallInventoryTotal = useMemo(() => {
    return products.reduce((acc, p) => acc + p.price * p.quantity, 0);
  }, [products]);

  // Distinct products in cart (if you purchase Apple Watch, no matter how many, count is 1)
  const totalCartCount = useMemo(() => {
    return cartItems.length;
  }, [cartItems]);

  return (
    <div className="app-root">
      {/* Top Navbar */}
      <Navbar
        totalCartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onNavigateHome={() => {
          setSelectedProduct(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <main className="main-content">
        <div className="catalog-view">
          {/* 1. Hero Slider Banner ("Next-Gen Tech Essentials") */}
          <HeroSlider
            onSelectCategory={(category) => {
              setSelectedCategory(category);
              const el = document.getElementById('product-catalog-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* 2. Feature Products row */}
          <FeaturedProducts
            products={products}
            onSelectProduct={(product) => setSelectedProduct(product)}
          />

          {/* 3. Product List Section */}
          <section id="product-catalog-section" className="product-list-section">
            {/* Section Header Controls */}
            <div className="catalog-header-bar">
              <div className="catalog-title-group">
                <div className="catalog-title-wrap">
                  <Package size={22} className="catalog-icon" />
                  <h2 className="catalog-title">Product List</h2>
                </div>
                <span className="catalog-count-badge">
                  {filteredProducts.length} product{filteredProducts.length === 1 ? '' : 's'} found
                </span>
              </div>

              <div className="catalog-controls-group">
                {/* Search Input */}
                <div className="search-input-box">
                  <Search size={16} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                </div>

                {/* Category Filter Dropdown (Matches Screenshot 3) */}
                <div className="category-filter-box">
                  <label htmlFor="category-select" className="filter-label">
                    CATEGORY:
                  </label>
                  <div className="select-wrapper">
                    <select
                      id="category-select"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="category-dropdown"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* View Mode Toggle: Cards / Table */}
                <div className="view-mode-toggle">
                  <button
                    type="button"
                    className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
                    onClick={() => setViewMode('card')}
                    title="Card Layout"
                    aria-label="Card Layout"
                  >
                    <LayoutGrid size={17} />
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
                    onClick={() => setViewMode('table')}
                    title="Table Layout"
                    aria-label="Table Layout"
                  >
                    <List size={17} />
                  </button>
                </div>

              </div>
            </div>

            {/* Dynamic Overall Total Bar */}
            <div className="overall-total-banner">
              <div className="overall-total-info">
                <span className="total-title">Total Subtotals:</span>
                <span className="total-formula">Sum of all product subtotals (Price × Quantity)</span>
              </div>
              <div className="overall-total-figure">
                ${overallInventoryTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>

            {/* Products Display: Cards or Table */}
            {filteredProducts.length === 0 ? (
              <div className="no-products-found">
                <SlidersHorizontal size={40} className="no-products-icon" />
                <h3>No products found</h3>
                <p>Try resetting the category filter or searching for another term.</p>
                <button
                  type="button"
                  className="reset-filters-btn"
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                >
                  Reset Filters
                </button>
              </div>
            ) : viewMode === 'card' ? (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onUpdateQuantity={handleUpdateQuantity}
                    onAddToCart={handleAddToCart}
                    onSelectProduct={(p) => setSelectedProduct(p)}
                  />
                ))}
              </div>
            ) : (
              <ProductTable
                products={filteredProducts}
                onUpdateQuantity={handleUpdateQuantity}
                onAddToCart={handleAddToCart}
                onSelectProduct={(p) => setSelectedProduct(p)}
              />
            )}

            {/* Add New Product Button at the bottom of the page */}
            <div className="add-product-bottom-wrap">
              <button
                type="button"
                className="add-product-bottom-btn"
                onClick={() => setIsAddModalOpen(true)}
              >
                <Plus size={20} />
                <span>Add New Product</span>
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        isOpen={!!selectedProduct}
        product={
          selectedProduct
            ? products.find((p) => p.id === selectedProduct.id) || selectedProduct
            : null
        }
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={handleUpdateQuantity}
        onUpdateInventory={handleUpdateInventory}
      />

      {/* Add New Product Modal  */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProduct={handleAddProduct}
      />

      {/* Cart Slide-over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateCartQty={handleUpdateCartQty}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Floating Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}

export default App;
