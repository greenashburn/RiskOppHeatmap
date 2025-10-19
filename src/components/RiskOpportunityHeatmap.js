import React, { useState } from 'react';
import { AlertTriangle, TrendingUp } from 'lucide-react';

const RiskOpportunityHeatmap = ({ items, onItemClick }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  // Debug logging
  console.log('RiskOpportunityHeatmap received items:', items);
  console.log('Items type:', typeof items, 'Is array:', Array.isArray(items));
  console.log('Items length:', items ? items.length : 'undefined');

  // Convert risk and opportunity levels to numeric values for positioning
  const getLevelValue = (level) => {
    const levels = { 'Low': 1, 'Medium': 2, 'High': 3, 'Critical': 4 };
    return levels[level] || 1;
  };

  // Get color based on risk and opportunity levels
  const getItemColor = (riskLevel, opportunityLevel) => {
    const riskValue = getLevelValue(riskLevel);
    const oppValue = getLevelValue(opportunityLevel);
    
    // High opportunity, low risk = green
    if (oppValue >= 3 && riskValue <= 2) return '#10b981';
    // High risk, low opportunity = red
    if (riskValue >= 3 && oppValue <= 2) return '#ef4444';
    // Both high = orange
    if (riskValue >= 3 && oppValue >= 3) return '#f59e0b';
    // Both low = blue
    if (riskValue <= 2 && oppValue <= 2) return '#3b82f6';
    // Medium levels = yellow
    return '#eab308';
  };

  // Get item size based on impact
  const getItemSize = (impact) => {
    const sizes = { 'Low': 50, 'Medium': 60, 'High': 70, 'Critical': 80 };
    return sizes[impact] || 50;
  };

  // Position items on the heatmap
  const positionedItems = items.map((item, index) => {
    const riskValue = getLevelValue(item.riskLevel);
    const oppValue = getLevelValue(item.opportunityLevel);
    
    // Position items within the 4x4 grid quadrants
    // Container is h-96 (384px), so we'll use percentage-based positioning
    
    // X position: risk level (1-4) maps to center of each column
    const xPercent = ((riskValue - 1) / 3) * 100; // 0%, 33.33%, 66.66%, 100%
    const x = (xPercent / 100) * 100; // 0%, 33.33%, 66.66%, 100%
    
    // Y position: opportunity level (1-4) maps to center of each row, inverted
    const yPercent = ((4 - oppValue) / 3) * 100; // 100%, 66.66%, 33.33%, 0%
    const y = (yPercent / 100) * 100; // 100%, 66.66%, 33.33%, 0%
    
    const color = getItemColor(item.riskLevel, item.opportunityLevel);
    const size = getItemSize(item.impact);
    
    console.log(`Item ${index}: ${item.title}, Risk: ${item.riskLevel} (${riskValue}), Opp: ${item.opportunityLevel} (${oppValue}), Position: (${x}%, ${y}%), Color: ${color}, Size: ${size}`);
    
    const positionedItem = {
      ...item,
      x: x,
      y: y,
      color: color,
      size: size
    };
    
    console.log(`Positioned item ${index}:`, positionedItem);
    return positionedItem;
  });

  // Debug logging
  console.log('Positioned items:', positionedItems);
  console.log('Positioned items length:', positionedItems.length);
  console.log('First positioned item:', positionedItems[0]);
  console.log('First positioned item x,y:', positionedItems[0]?.x, positionedItems[0]?.y);
  console.log('First positioned item color:', positionedItems[0]?.color);
  console.log('First positioned item size:', positionedItems[0]?.size);

  // Show message if no items
  if (!items || items.length === 0) {
    return (
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Risk vs Opportunity Matrix</h2>
        </div>
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">No items to display</div>
          <p className="text-gray-400">Add some risk or opportunity items to see them on the heatmap</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Risk vs Opportunity Matrix</h2>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>High Opportunity, Low Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>High Risk, Low Opportunity</span>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Grid Background */}
        <div className="relative w-full h-96 rounded-lg border-2 border-gray-300 overflow-hidden">
          {/* Checkerboard Background */}
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 h-full">
            {/* Top row */}
            <div className="bg-green-100 border-r border-b border-gray-300"></div>
            <div className="bg-orange-100 border-r border-b border-gray-300"></div>
            <div className="bg-green-100 border-r border-b border-gray-300"></div>
            <div className="bg-orange-100 border-b border-gray-300"></div>
            
            {/* Second row */}
            <div className="bg-orange-100 border-r border-b border-gray-300"></div>
            <div className="bg-green-100 border-r border-b border-gray-300"></div>
            <div className="bg-orange-100 border-r border-b border-gray-300"></div>
            <div className="bg-green-100 border-b border-gray-300"></div>
            
            {/* Third row */}
            <div className="bg-green-100 border-r border-b border-gray-300"></div>
            <div className="bg-orange-100 border-r border-b border-gray-300"></div>
            <div className="bg-green-100 border-r border-b border-gray-300"></div>
            <div className="bg-orange-100 border-b border-gray-300"></div>
            
            {/* Bottom row */}
            <div className="bg-orange-100 border-r border-gray-300"></div>
            <div className="bg-green-100 border-r border-gray-300"></div>
            <div className="bg-orange-100 border-r border-gray-300"></div>
            <div className="bg-green-100"></div>
          </div>

          {/* Grid Lines */}
          <div className="absolute inset-0">
            {/* Vertical lines - divide into 4 columns */}
            {[1, 2, 3].map(i => (
              <div
                key={`v-${i}`}
                className="absolute top-0 bottom-0 border-l-2 border-gray-500"
                style={{ left: `${(i * 25)}%` }}
              />
            ))}
            {/* Horizontal lines - divide into 4 rows */}
            {[1, 2, 3].map(i => (
              <div
                key={`h-${i}`}
                className="absolute left-0 right-0 border-t-2 border-gray-500"
                style={{ top: `${(i * 25)}%` }}
              />
            ))}
          </div>

          {/* Risk Axis Labels (X-axis) */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-between px-2 text-xs font-medium text-gray-700">
            <span>Low Risk</span>
            <span>Medium Risk</span>
            <span>High Risk</span>
            <span>Critical Risk</span>
          </div>
          
          {/* Opportunity Axis Labels (Y-axis) */}
          <div className="absolute left-2 top-0 bottom-0 flex flex-col justify-between py-2 text-xs font-medium text-gray-700">
            <span className="transform -rotate-90 whitespace-nowrap origin-center">Critical Opportunity</span>
            <span className="transform -rotate-90 whitespace-nowrap origin-center">High Opportunity</span>
            <span className="transform -rotate-90 whitespace-nowrap origin-center">Medium Opportunity</span>
            <span className="transform -rotate-90 whitespace-nowrap origin-center">Low Opportunity</span>
          </div>

          {/* Quadrant Labels */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Top-left: High Opportunity, Low Risk */}
            <div className="absolute top-2 left-2 text-xs font-bold text-green-800 bg-white/80 px-1 py-0.5 rounded">
              High Opportunity<br/>Low Risk
            </div>
            {/* Top-right: High Opportunity, High Risk */}
            <div className="absolute top-2 right-2 text-xs font-bold text-orange-800 bg-white/80 px-1 py-0.5 rounded text-right">
              High Opportunity<br/>High Risk
            </div>
            {/* Bottom-left: Low Opportunity, Low Risk */}
            <div className="absolute bottom-2 left-2 text-xs font-bold text-blue-800 bg-white/80 px-1 py-0.5 rounded">
              Low Opportunity<br/>Low Risk
            </div>
            {/* Bottom-right: Low Opportunity, High Risk */}
            <div className="absolute bottom-2 right-2 text-xs font-bold text-red-800 bg-white/80 px-1 py-0.5 rounded text-right">
              Low Opportunity<br/>High Risk
            </div>
          </div>



          {/* Items */}
          {positionedItems.map((item, index) => {
            console.log(`Rendering item ${index}: ${item.title} at position (${item.x}%, ${item.y}%)`);
            
            return (
              <div
                key={item.id}
                style={{
                  position: 'absolute',
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                  cursor: 'pointer'
                }}
                onClick={() => onItemClick(item)}
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div
                  style={{
                    width: `${item.size}px`,
                    height: `${item.size}px`,
                    backgroundColor: item.color,
                    borderRadius: '50%',
                    border: '2px solid white',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '12px'
                  }}
                  title={`${item.title} - Risk: ${item.riskLevel}, Opportunity: ${item.opportunityLevel}`}
                >
                  {item.title.charAt(0).toUpperCase()}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-700 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              Risk Levels
            </h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-100 border border-red-300"></div>
                <span>Critical</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-100 border border-orange-300"></div>
                <span>High</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-100 border border-yellow-300"></div>
                <span>Medium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-100 border border-green-300"></div>
                <span>Low</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-700 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              Opportunity Levels
            </h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-100 border border-green-300"></div>
                <span>Critical</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-100 border border-yellow-300"></div>
                <span>High</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-100 border border-orange-300"></div>
                <span>Medium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-100 border border-red-300"></div>
                <span>Low</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {hoveredItem && (
        <div className="absolute z-30 bg-white border border-gray-200 rounded-lg shadow-lg p-3 max-w-xs">
          <h4 className="font-semibold text-gray-800 mb-1">{hoveredItem.title}</h4>
          <p className="text-sm text-gray-600 mb-2">{hoveredItem.description}</p>
          <div className="flex gap-4 text-xs">
            <span className="text-red-600">Risk: {hoveredItem.riskLevel}</span>
            <span className="text-green-600">Opportunity: {hoveredItem.opportunityLevel}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskOpportunityHeatmap;
