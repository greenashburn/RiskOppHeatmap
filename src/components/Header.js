import React from 'react';
import { Plus, BarChart3 } from 'lucide-react';

const Header = ({ onAddItem, itemCount }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Critical Risk Management Dashboard</h1>
              <p className="text-sm text-gray-600">Strategic Business Risk & Opportunity Analysis</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-600">Total Items</div>
              <div className="text-2xl font-bold text-blue-600">{itemCount}</div>
            </div>
            
            <button
              onClick={onAddItem}
              className="btn btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Item
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
