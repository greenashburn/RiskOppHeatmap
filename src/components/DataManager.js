import React, { useState, useEffect } from 'react';
import { X, Save, AlertTriangle, TrendingUp } from 'lucide-react';
import { categories, riskLevels, opportunityLevels, impactLevels, statusOptions } from '../utils/sampleData';

const DataManager = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Strategic',
    riskLevel: 'Medium',
    opportunityLevel: 'Medium',
    impact: 'Medium',
    probability: 0.5,
    owner: '',
    status: 'Planning',
    tags: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title || '',
        description: item.description || '',
        category: item.category || 'Strategic',
        riskLevel: item.riskLevel || 'Medium',
        opportunityLevel: item.opportunityLevel || 'Medium',
        impact: item.impact || 'Medium',
        probability: item.probability || 0.5,
        owner: item.owner || '',
        status: item.status || 'Planning',
        tags: item.tags ? item.tags.join(', ') : ''
      });
    }
  }, [item]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.owner.trim()) {
      newErrors.owner = 'Owner is required';
    }

    if (formData.probability < 0 || formData.probability > 1) {
      newErrors.probability = 'Probability must be between 0 and 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const submitData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      probability: parseFloat(formData.probability)
    };

    onSave(submitData);
  };

  const getRiskColor = (level) => {
    const colors = {
      'Low': 'text-green-600 bg-green-100',
      'Medium': 'text-yellow-600 bg-yellow-100',
      'High': 'text-orange-600 bg-orange-100',
      'Critical': 'text-red-600 bg-red-100'
    };
    return colors[level] || colors['Medium'];
  };

  const getOpportunityColor = (level) => {
    const colors = {
      'Low': 'text-red-600 bg-red-100',
      'Medium': 'text-yellow-600 bg-yellow-100',
      'High': 'text-green-600 bg-green-100',
      'Critical': 'text-green-600 bg-green-100'
    };
    return colors[level] || colors['Medium'];
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">
            {item ? 'Edit Item' : 'Add New Item'}
          </h2>
          <button onClick={onCancel} className="close-btn">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input
              type="text"
              className={`form-input ${errors.title ? 'border-red-500' : ''}`}
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter item title"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea
              className={`form-textarea ${errors.description ? 'border-red-500' : ''}`}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Enter detailed description"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Category and Owner */}
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Owner *</label>
              <input
                type="text"
                className={`form-input ${errors.owner ? 'border-red-500' : ''}`}
                value={formData.owner}
                onChange={(e) => handleChange('owner', e.target.value)}
                placeholder="Team/Person responsible"
              />
              {errors.owner && <p className="text-red-500 text-sm mt-1">{errors.owner}</p>}
            </div>
          </div>

          {/* Risk and Opportunity Levels */}
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Risk Level
              </label>
              <select
                className="form-select"
                value={formData.riskLevel}
                onChange={(e) => handleChange('riskLevel', e.target.value)}
              >
                {riskLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Opportunity Level
              </label>
              <select
                className="form-select"
                value={formData.opportunityLevel}
                onChange={(e) => handleChange('opportunityLevel', e.target.value)}
              >
                {opportunityLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Impact and Probability */}
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Impact</label>
              <select
                className="form-select"
                value={formData.impact}
                onChange={(e) => handleChange('impact', e.target.value)}
              >
                {impactLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Probability (0-1)</label>
              <input
                type="number"
                min="0"
                max="1"
                step="0.1"
                className={`form-input ${errors.probability ? 'border-red-500' : ''}`}
                value={formData.probability}
                onChange={(e) => handleChange('probability', parseFloat(e.target.value))}
              />
              {errors.probability && <p className="text-red-500 text-sm mt-1">{errors.probability}</p>}
            </div>
          </div>

          {/* Status and Tags */}
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Tags</label>
              <input
                type="text"
                className="form-input"
                value={formData.tags}
                onChange={(e) => handleChange('tags', e.target.value)}
                placeholder="Comma-separated tags"
              />
            </div>
          </div>

          {/* Preview */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-3">Preview</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Risk Level:</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(formData.riskLevel)}`}>
                  {formData.riskLevel}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Opportunity Level:</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getOpportunityColor(formData.opportunityLevel)}`}>
                  {formData.opportunityLevel}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Impact:</span>
                <span className="font-medium">{formData.impact}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Probability:</span>
                <span className="font-medium">{(formData.probability * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {item ? 'Update' : 'Create'} Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DataManager;
