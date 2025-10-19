import React from 'react';
import { Filter, Search, X } from 'lucide-react';
import { categories, riskLevels, opportunityLevels } from '../utils/sampleData';

const FilterPanel = ({ filters, onFiltersChange, items }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      category: 'all',
      riskLevel: 'all',
      opportunityLevel: 'all',
      searchTerm: ''
    });
  };

  const getFilterCounts = () => {
    const counts = {
      category: {},
      riskLevel: {},
      opportunityLevel: {}
    };

    if (items && Array.isArray(items)) {
      items.forEach(item => {
        if (item && item.category) {
          counts.category[item.category] = (counts.category[item.category] || 0) + 1;
        }
        if (item && item.riskLevel) {
          counts.riskLevel[item.riskLevel] = (counts.riskLevel[item.riskLevel] || 0) + 1;
        }
        if (item && item.opportunityLevel) {
          counts.opportunityLevel[item.opportunityLevel] = (counts.opportunityLevel[item.opportunityLevel] || 0) + 1;
        }
      });
    }

    return counts;
  };

  const counts = getFilterCounts();
  const hasActiveFilters = filters.category !== 'all' || filters.riskLevel !== 'all' || 
                          filters.opportunityLevel !== 'all' || filters.searchTerm;

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Search */}
        <div className="form-group">
          <label className="form-label flex items-center gap-2">
            <Search className="w-4 h-4" />
            Search
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Search items..."
            value={filters.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <option value="all">All Categories ({items ? items.length : 0})</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category} ({counts.category[category] || 0})
              </option>
            ))}
          </select>
        </div>

        {/* Risk Level Filter */}
        <div className="form-group">
          <label className="form-label">Risk Level</label>
          <select
            className="form-select"
            value={filters.riskLevel}
            onChange={(e) => handleFilterChange('riskLevel', e.target.value)}
          >
            <option value="all">All Risk Levels ({items ? items.length : 0})</option>
            {riskLevels.map(level => (
              <option key={level} value={level}>
                {level} ({counts.riskLevel[level] || 0})
              </option>
            ))}
          </select>
        </div>

        {/* Opportunity Level Filter */}
        <div className="form-group">
          <label className="form-label">Opportunity Level</label>
          <select
            className="form-select"
            value={filters.opportunityLevel}
            onChange={(e) => handleFilterChange('opportunityLevel', e.target.value)}
          >
            <option value="all">All Opportunity Levels ({items ? items.length : 0})</option>
            {opportunityLevels.map(level => (
              <option key={level} value={level}>
                {level} ({counts.opportunityLevel[level] || 0})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Stats</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Items:</span>
            <span className="font-medium">{items ? items.length : 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">High Risk:</span>
            <span className="font-medium text-red-600">
              {(counts.riskLevel['High'] || 0) + (counts.riskLevel['Critical'] || 0)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">High Opportunity:</span>
            <span className="font-medium text-green-600">
              {(counts.opportunityLevel['High'] || 0) + (counts.opportunityLevel['Critical'] || 0)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">In Progress:</span>
            <span className="font-medium text-blue-600">
              {items ? items.filter(item => item && item.status === 'In Progress').length : 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
