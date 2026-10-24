import React, { useState } from 'react';
import type { Product } from '../types';
import { PRESET_IMAGES } from '../data/defaultProducts';
import {
  X,
  PlusCircle,
  AlertCircle,
  Check,
  Headphones,
  Watch,
  Camera,
  Mouse,
  Keyboard,
  Volume2,
  Sparkles,
} from 'lucide-react';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [rating, setRating] = useState('5');
  const [price, setPrice] = useState('');
  const [inventory, setInventory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [specification, setSpecification] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState(false);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Product name is required';
    }
    if (!category.trim()) {
      newErrors.category = 'Category is required';
    }
    const numRating = parseFloat(rating);
    if (!rating || isNaN(numRating) || numRating < 1 || numRating > 5) {
      newErrors.rating = 'Rating must be between 1 and 5';
    }
    const numPrice = parseFloat(price);
    if (!price || isNaN(numPrice) || numPrice <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    const numInventory = parseInt(inventory, 10);
    if (!inventory || isNaN(numInventory) || numInventory < 0) {
      newErrors.inventory = 'Inventory must be 0 or more';
    }
    if (!imageUrl.trim()) {
      newErrors.imageUrl = 'Feature image URL is required';
    } else if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
      newErrors.imageUrl = 'Please enter a valid image URL (http/https)';
    }
    if (!description.trim()) {
      newErrors.description = 'Product description is required';
    }
    if (!specification.trim()) {
      newErrors.specification = 'Product specifications are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    if (!validateForm()) {
      return;
    }

    const newProduct: Omit<Product, 'id'> = {
      name: name.trim(),
      category: category.trim(),
      rating: parseFloat(rating),
      price: parseFloat(price),
      inventory: parseInt(inventory, 10),
      quantity: 0, // Starts with zero as user hasn't specified purchase quantity yet
      imageUrl: imageUrl.trim(),
      description: description.trim(),
      specification: specification.trim(),
      isFeatured: false,
    };

    onAddProduct(newProduct);

    // Reset fields
    setName('');
    setCategory('Electronics');
    setRating('5');
    setPrice('');
    setInventory('');
    setImageUrl('');
    setDescription('');
    setSpecification('');
    setErrors({});
    setTouched(false);
    onClose();
  };

  const handleApplyPreset = (preset: (typeof PRESET_IMAGES)[0]) => {
    setImageUrl(preset.url);
    if (!category || category === 'Electronics') {
      setCategory(preset.defaultCategory);
    }
    if (!name) {
      setName(`Premium ${preset.name}`);
    }
    if (!price) {
      setPrice('99.99');
    }
    if (!inventory) {
      setInventory('10');
    }
    if (!description) {
      setDescription(`High-performance ${preset.name.toLowerCase()} designed for modern professionals and tech enthusiasts.`);
    }
    if (!specification) {
      setSpecification(`Material: Premium composite | Connectivity: Bluetooth 5.3 & USB-C | Warranty: 1 Year`);
    }
    // Clear image error if any
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.imageUrl;
      return copy;
    });
  };

  const renderPresetIcon = (iconName: string) => {
    switch (iconName) {
      case 'Headphones':
        return <Headphones size={13} />;
      case 'Watch':
        return <Watch size={13} />;
      case 'Camera':
        return <Camera size={13} />;
      case 'Mouse':
        return <Mouse size={13} />;
      case 'Keyboard':
        return <Keyboard size={13} />;
      case 'Volume2':
        return <Volume2 size={13} />;
      default:
        return <Sparkles size={13} />;
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <PlusCircle size={20} className="modal-title-icon" />
            <h2 id="modal-title" className="modal-title">
              Add New Product
            </h2>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        {/* Global validation banner */}
        {touched && Object.keys(errors).length > 0 && (
          <div className="form-error-banner">
            <AlertCircle size={16} />
            <span>Please fill in all required fields accurately before saving.</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="modal-form" noValidate>
          {/* PRODUCT NAME */}
          <div className="form-group">
            <label htmlFor="product-name" className="form-label">
              PRODUCT NAME <span className="required-star">*</span>
            </label>
            <input
              id="product-name"
              type="text"
              className={`form-input ${errors.name ? 'input-error' : ''}`}
              placeholder="e.g. Wireless Gaming Controller"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <span className="field-error-text">{errors.name}</span>}
          </div>

          {/* CATEGORY & RATING ROW */}
          <div className="form-row-2">
            <div className="form-group">
              <label htmlFor="product-category" className="form-label">
                CATEGORY <span className="required-star">*</span>
              </label>
              <select
                id="product-category"
                className={`form-input form-select ${errors.category ? 'input-error' : ''}`}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Electronics">Electronics</option>
                <option value="Audio">Audio</option>
                <option value="Wearables">Wearables</option>
                <option value="Gaming">Gaming</option>
                <option value="Accessories">Accessories</option>
              </select>
              {errors.category && <span className="field-error-text">{errors.category}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="product-rating" className="form-label">
                RATING (1-5) <span className="required-star">*</span>
              </label>
              <input
                id="product-rating"
                type="number"
                step="0.1"
                min="1"
                max="5"
                className={`form-input ${errors.rating ? 'input-error' : ''}`}
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder="5"
              />
              {errors.rating && <span className="field-error-text">{errors.rating}</span>}
            </div>
          </div>

          {/* PRICE & QUANTITY ROW */}
          <div className="form-row-2">
            <div className="form-group">
              <label htmlFor="product-price" className="form-label">
                PRICE ($) <span className="required-star">*</span>
              </label>
              <input
                id="product-price"
                type="number"
                step="0.01"
                min="0.01"
                className={`form-input ${errors.price ? 'input-error' : ''}`}
                placeholder="99.99"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {errors.price && <span className="field-error-text">{errors.price}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="product-inventory" className="form-label">
                INVENTORY (STOCK) <span className="required-star">*</span>
              </label>
              <input
                id="product-inventory"
                type="number"
                min="0"
                step="1"
                className={`form-input ${errors.inventory ? 'input-error' : ''}`}
                placeholder="4"
                value={inventory}
                onChange={(e) => setInventory(e.target.value)}
              />
              {errors.inventory && <span className="field-error-text">{errors.inventory}</span>}
            </div>
          </div>

          {/* FEATURE IMAGE URL */}
          <div className="form-group">
            <label htmlFor="product-image" className="form-label">
              FEATURE IMAGE URL <span className="required-star">*</span>
            </label>
            <input
              id="product-image"
              type="url"
              className={`form-input ${errors.imageUrl ? 'input-error' : ''}`}
              placeholder="https://images.unsplash.com/photo-..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            {errors.imageUrl && <span className="field-error-text">{errors.imageUrl}</span>}

            {/* Presets Chips (as in Screenshot 4) */}
            <div className="presets-container">
              <span className="presets-label">Presets:</span>
              <div className="presets-list">
                {PRESET_IMAGES.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    className={`preset-chip ${imageUrl === preset.url ? 'active' : ''}`}
                    onClick={() => handleApplyPreset(preset)}
                  >
                    {renderPresetIcon(preset.icon)}
                    <span>{preset.name}</span>
                    {imageUrl === preset.url && <Check size={12} className="check-icon" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="form-group">
            <label htmlFor="product-desc" className="form-label">
              DESCRIPTION <span className="required-star">*</span>
            </label>
            <textarea
              id="product-desc"
              rows={2}
              className={`form-input form-textarea ${errors.description ? 'input-error' : ''}`}
              placeholder="Product summary..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && <span className="field-error-text">{errors.description}</span>}
          </div>

          {/* SPECIFICATIONS */}
          <div className="form-group">
            <label htmlFor="product-specs" className="form-label">
              SPECIFICATIONS <span className="required-star">*</span>
            </label>
            <textarea
              id="product-specs"
              rows={2}
              className={`form-input form-textarea ${errors.specification ? 'input-error' : ''}`}
              placeholder="Technical specs..."
              value={specification}
              onChange={(e) => setSpecification(e.target.value)}
            />
            {errors.specification && <span className="field-error-text">{errors.specification}</span>}
          </div>

          {/* FORM FOOTER */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-save"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
