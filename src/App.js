import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import RiskOpportunityHeatmap from './components/RiskOpportunityHeatmap';
import DataManager from './components/DataManager';
import FilterPanel from './components/FilterPanel';
import ExportPanel from './components/ExportPanel';
import { generateSampleData } from './utils/sampleData';

function App() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    riskLevel: 'all',
    opportunityLevel: 'all',
    searchTerm: ''
  });
  const [showDataManager, setShowDataManager] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Load sample data on first render
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('riskOpportunityData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        console.log('Loading saved data:', parsedData);
        setItems(Array.isArray(parsedData) ? parsedData : []);
      } else {
        const sampleData = generateSampleData();
        console.log('Loading sample data:', sampleData);
        setItems(Array.isArray(sampleData) ? sampleData : []);
        localStorage.setItem('riskOpportunityData', JSON.stringify(sampleData));
      }
    } catch (error) {
      console.error('Error loading data:', error);
      const sampleData = generateSampleData();
      setItems(Array.isArray(sampleData) ? sampleData : []);
    }
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = items || [];

    if (filters.category !== 'all') {
      filtered = filtered.filter(item => item && item.category === filters.category);
    }

    if (filters.riskLevel !== 'all') {
      filtered = filtered.filter(item => item && item.riskLevel === filters.riskLevel);
    }

    if (filters.opportunityLevel !== 'all') {
      filtered = filtered.filter(item => item && item.opportunityLevel === filters.opportunityLevel);
    }

    if (filters.searchTerm) {
      filtered = filtered.filter(item => 
        item && item.title && item.description &&
        (item.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
         item.description.toLowerCase().includes(filters.searchTerm.toLowerCase()))
      );
    }

    console.log('Filtered items:', filtered);
    setFilteredItems(filtered);
  }, [items, filters]);

  const handleAddItem = (item) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    localStorage.setItem('riskOpportunityData', JSON.stringify(updatedItems));
    setShowDataManager(false);
  };

  const handleUpdateItem = (updatedItem) => {
    const updatedItems = items.map(item => 
      item.id === updatedItem.id ? { ...updatedItem, updatedAt: new Date().toISOString() } : item
    );
    setItems(updatedItems);
    localStorage.setItem('riskOpportunityData', JSON.stringify(updatedItems));
    setEditingItem(null);
    setShowDataManager(false);
  };


  const handleEditItem = (item) => {
    setEditingItem(item);
    setShowDataManager(true);
  };

  const handleItemClick = (item) => {
    handleEditItem(item);
  };

  console.log('App render - items:', items.length, 'filteredItems:', filteredItems.length);
  console.log('Items array:', items);
  console.log('FilteredItems array:', filteredItems);

  return (
    <div className="App">
      <Header 
        onAddItem={() => setShowDataManager(true)}
        itemCount={filteredItems.length}
      />
      
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <div className="lg:col-span-3">
            <RiskOpportunityHeatmap 
              items={filteredItems}
              onItemClick={handleItemClick}
            />
          </div>
          
          <div className="space-y-6">
            <FilterPanel 
              filters={filters}
              onFiltersChange={setFilters}
              items={items}
            />
            
            <ExportPanel 
              items={filteredItems}
            />
          </div>
        </div>
      </div>

      {showDataManager && (
        <DataManager
          item={editingItem}
          onSave={editingItem ? handleUpdateItem : handleAddItem}
          onCancel={() => {
            setShowDataManager(false);
            setEditingItem(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
