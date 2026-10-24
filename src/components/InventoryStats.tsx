import React from 'react';
import { DollarSign, Layers, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { Product } from '../types';

interface InventoryStatsProps {
  products: Product[];
}

export const InventoryStats: React.FC<InventoryStatsProps> = ({ products }) => {
  // Compute overall total of all subtotals: sum(price * quantity)
  const overallTotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const totalStockUnits = products.reduce((sum, p) => sum + p.quantity, 0);
  const lowStockCount = products.filter((p) => p.quantity < 5).length;

  return (
    <div className="stats-container">
      {/* Overall Total Value Card */}
      <div className="stat-card primary">
        <div className="stat-icon-wrapper primary">
          <DollarSign size={22} />
        </div>
        <div className="stat-details">
          <span className="stat-label">Overall Inventory Value (Total)</span>
          <span className="stat-value total-highlight">
            ${overallTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="stat-subtext">Sum of all product subtotals (Price × Qty)</span>
        </div>
      </div>

      {/* Total Products in Catalog */}
      <div className="stat-card">
        <div className="stat-icon-wrapper">
          <Layers size={22} />
        </div>
        <div className="stat-details">
          <span className="stat-label">Total Products</span>
          <span className="stat-value">{products.length} Items</span>
          <span className="stat-subtext">Active listings in database</span>
        </div>
      </div>

      {/* Total Units in Stock */}
      <div className="stat-card">
        <div className="stat-icon-wrapper success">
          <CheckCircle2 size={22} />
        </div>
        <div className="stat-details">
          <span className="stat-label">Stock In Hand</span>
          <span className="stat-value">{totalStockUnits} Units</span>
          <span className="stat-subtext">Total available quantity</span>
        </div>
      </div>

      {/* Low Stock Alerts */}
      <div className={`stat-card ${lowStockCount > 0 ? 'warning' : ''}`}>
        <div className={`stat-icon-wrapper ${lowStockCount > 0 ? 'warning' : ''}`}>
          <AlertTriangle size={22} />
        </div>
        <div className="stat-details">
          <span className="stat-label">Low Stock Alerts</span>
          <span className={`stat-value ${lowStockCount > 0 ? 'warning-text' : ''}`}>
            {lowStockCount} Products
          </span>
          <span className="stat-subtext">
            {lowStockCount > 0 ? 'Quantity is below 5 units' : 'All items sufficiently stocked'}
          </span>
        </div>
      </div>
    </div>
  );
};

