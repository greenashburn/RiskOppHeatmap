import React, { useState } from 'react';
import { Download, FileText, BarChart3, Share2 } from 'lucide-react';

const ExportPanel = ({ items }) => {
  const [isExporting, setIsExporting] = useState(false);

  const exportToCSV = () => {
    setIsExporting(true);
    
    const headers = [
      'Title',
      'Description', 
      'Category',
      'Risk Level',
      'Opportunity Level',
      'Impact',
      'Probability',
      'Owner',
      'Status',
      'Tags',
      'Created At'
    ];

    const csvContent = [
      headers.join(','),
      ...items.map(item => [
        `"${item.title}"`,
        `"${item.description}"`,
        item.category,
        item.riskLevel,
        item.opportunityLevel,
        item.impact,
        item.probability,
        `"${item.owner}"`,
        item.status,
        `"${item.tags ? item.tags.join(', ') : ''}"`,
        item.createdAt
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `risk-opportunity-heatmap-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => setIsExporting(false), 1000);
  };

  const exportToJSON = () => {
    setIsExporting(true);
    
    const dataStr = JSON.stringify(items, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `risk-opportunity-heatmap-${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => setIsExporting(false), 1000);
  };

  const generateReport = () => {
    setIsExporting(true);
    
    // Generate HTML report
    const reportHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Risk Opportunity Heatmap Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .summary { background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
          .item { border: 1px solid #ddd; margin-bottom: 15px; padding: 15px; border-radius: 8px; }
          .item-header { font-weight: bold; font-size: 18px; margin-bottom: 10px; }
          .item-details { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
          .risk-high { color: #dc2626; }
          .risk-medium { color: #d97706; }
          .risk-low { color: #059669; }
          .opp-high { color: #059669; }
          .opp-medium { color: #d97706; }
          .opp-low { color: #dc2626; }
          .tags { margin-top: 10px; }
          .tag { background: #e5e7eb; padding: 2px 8px; border-radius: 4px; margin-right: 5px; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Risk Opportunity Heatmap Report</h1>
          <p>Generated on ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div class="summary">
          <h2>Summary</h2>
          <p><strong>Total Items:</strong> ${items.length}</p>
          <p><strong>High Risk Items:</strong> ${items.filter(item => item.riskLevel === 'High' || item.riskLevel === 'Critical').length}</p>
          <p><strong>High Opportunity Items:</strong> ${items.filter(item => item.opportunityLevel === 'High' || item.opportunityLevel === 'Critical').length}</p>
          <p><strong>In Progress:</strong> ${items.filter(item => item.status === 'In Progress').length}</p>
        </div>
        
        <h2>Items</h2>
        ${items.map(item => `
          <div class="item">
            <div class="item-header">${item.title}</div>
            <p>${item.description}</p>
            <div class="item-details">
              <div><strong>Category:</strong> ${item.category}</div>
              <div><strong>Owner:</strong> ${item.owner}</div>
              <div><strong>Risk Level:</strong> <span class="risk-${item.riskLevel.toLowerCase()}">${item.riskLevel}</span></div>
              <div><strong>Opportunity Level:</strong> <span class="opp-${item.opportunityLevel.toLowerCase()}">${item.opportunityLevel}</span></div>
              <div><strong>Impact:</strong> ${item.impact}</div>
              <div><strong>Probability:</strong> ${(item.probability * 100).toFixed(0)}%</div>
              <div><strong>Status:</strong> ${item.status}</div>
              <div><strong>Created:</strong> ${new Date(item.createdAt).toLocaleDateString()}</div>
            </div>
            ${item.tags && item.tags.length > 0 ? `
              <div class="tags">
                ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
              </div>
            ` : ''}
          </div>
        `).join('')}
      </body>
      </html>
    `;

    const blob = new Blob([reportHtml], { type: 'text/html' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `risk-opportunity-report-${new Date().toISOString().split('T')[0]}.html`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => setIsExporting(false), 1000);
  };

  const shareData = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Risk Opportunity Heatmap',
        text: `Risk Opportunity Heatmap with ${items.length} items`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link copied to clipboard!');
      });
    }
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Download className="w-5 h-5" />
        Export & Share
      </h3>

      <div className="space-y-3">
        <button
          onClick={exportToCSV}
          disabled={isExporting || items.length === 0}
          className="w-full btn btn-secondary flex items-center justify-center gap-2"
        >
          <FileText className="w-4 h-4" />
          {isExporting ? 'Exporting...' : 'Export to CSV'}
        </button>

        <button
          onClick={exportToJSON}
          disabled={isExporting || items.length === 0}
          className="w-full btn btn-secondary flex items-center justify-center gap-2"
        >
          <BarChart3 className="w-4 h-4" />
          {isExporting ? 'Exporting...' : 'Export to JSON'}
        </button>

        <button
          onClick={generateReport}
          disabled={isExporting || items.length === 0}
          className="w-full btn btn-primary flex items-center justify-center gap-2"
        >
          <FileText className="w-4 h-4" />
          {isExporting ? 'Generating...' : 'Generate Report'}
        </button>

        <button
          onClick={shareData}
          className="w-full btn btn-success flex items-center justify-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>

      {items.length === 0 && (
        <p className="text-sm text-gray-500 mt-3 text-center">
          Add some items to enable export
        </p>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Export Options</h4>
        <div className="text-xs text-gray-600 space-y-1">
          <p><strong>CSV:</strong> Spreadsheet format for data analysis</p>
          <p><strong>JSON:</strong> Raw data for integration</p>
          <p><strong>Report:</strong> Formatted HTML report</p>
          <p><strong>Share:</strong> Share current view</p>
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;
