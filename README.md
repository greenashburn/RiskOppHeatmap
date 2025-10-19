# Critical Risk Management Dashboard

A modern, business-focused web application for visualizing and managing risk and opportunity data through an interactive heatmap interface.

## Features

### 🎯 Interactive Heatmap Visualization
- **Risk vs Opportunity Matrix**: Visual representation of items positioned by risk and opportunity levels
- **Color-coded Items**: Intuitive color scheme (green for high opportunity/low risk, red for high risk/low opportunity)
- **Size-based Impact**: Item size reflects impact level (Critical, High, Medium, Low)
- **Hover Tooltips**: Detailed information on hover
- **Click to Edit**: Click any item to edit its details

### 📊 Data Management
- **Add New Items**: Comprehensive form with validation
- **Edit Existing Items**: Modify all item properties
- **Delete Items**: Remove items from the heatmap
- **Local Storage**: Data persists between sessions

### 🔍 Advanced Filtering
- **Search**: Text search across titles and descriptions
- **Category Filter**: Filter by business categories (Strategic, Operational, Technology, etc.)
- **Risk Level Filter**: Filter by risk levels (Low, Medium, High, Critical)
- **Opportunity Level Filter**: Filter by opportunity levels
- **Quick Stats**: Real-time statistics and counts

### 📈 Export & Reporting
- **CSV Export**: Download data for spreadsheet analysis
- **JSON Export**: Raw data for system integration
- **HTML Report**: Formatted business report
- **Share Functionality**: Share current view

### 🎨 Modern UI/UX
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Professional Styling**: Clean, business-appropriate interface
- **Intuitive Navigation**: Easy-to-use controls and interactions
- **Accessibility**: Keyboard navigation and screen reader support

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd /Users/jamespark/Downloads/RiskOppHeatmapApp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to view the application.

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Usage

### Adding Items
1. Click the "Add Item" button in the header
2. Fill in the required fields:
   - **Title**: Brief description of the risk/opportunity
   - **Description**: Detailed explanation
   - **Category**: Business category (Strategic, Operational, etc.)
   - **Risk Level**: Low, Medium, High, or Critical
   - **Opportunity Level**: Low, Medium, High, or Critical
   - **Impact**: Expected impact level
   - **Probability**: Likelihood (0-1 scale)
   - **Owner**: Responsible team/person
   - **Status**: Current status
   - **Tags**: Comma-separated keywords

### Using the Heatmap
- **View Items**: Items appear as colored circles on the matrix
- **Position**: X-axis represents risk level, Y-axis represents opportunity level
- **Colors**: 
  - 🟢 Green: High opportunity, low risk (investigate)
  - 🔴 Red: High risk, low opportunity (mitigate)
  - 🟠 Orange: High risk, high opportunity (manage carefully)
  - 🔵 Blue: Low risk, low opportunity (monitor)
- **Size**: Larger circles indicate higher impact
- **Interact**: Click items to edit, hover for quick info

### Filtering Data
- Use the filter panel on the right to narrow down items
- Search by text, filter by category, risk level, or opportunity level
- View quick statistics and counts

### Exporting Data
- **CSV**: Download for Excel/Google Sheets analysis
- **JSON**: Raw data for system integration
- **HTML Report**: Professional formatted report
- **Share**: Share current view with others

## Sample Data

The app comes with 10 sample items covering various business scenarios:
- Market expansion opportunities
- Cybersecurity risks
- Technology implementations
- Regulatory compliance
- Strategic partnerships
- Supply chain issues
- Customer experience improvements
- Economic impacts
- Talent acquisition
- Data privacy concerns

## Technical Details

### Built With
- **React 18**: Modern React with hooks
- **Lucide React**: Beautiful, customizable icons
- **CSS3**: Custom styling with modern features
- **Local Storage**: Client-side data persistence

### Project Structure
```
src/
├── components/
│   ├── Header.js              # Application header
│   ├── RiskOpportunityHeatmap.js  # Main heatmap visualization
│   ├── DataManager.js         # Add/edit item modal
│   ├── FilterPanel.js         # Filtering controls
│   └── ExportPanel.js         # Export functionality
├── utils/
│   └── sampleData.js          # Sample data and constants
├── App.js                     # Main application component
├── index.js                   # Application entry point
└── index.css                  # Global styles
```

### Data Model
Each item contains:
- `id`: Unique identifier
- `title`: Item title
- `description`: Detailed description
- `category`: Business category
- `riskLevel`: Risk assessment (Low/Medium/High/Critical)
- `opportunityLevel`: Opportunity assessment (Low/Medium/High/Critical)
- `impact`: Expected impact (Low/Medium/High/Critical)
- `probability`: Likelihood (0-1)
- `owner`: Responsible party
- `status`: Current status
- `tags`: Array of keywords
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## Customization

### Adding New Categories
Edit `src/utils/sampleData.js` and add to the `categories` array.

### Modifying Risk/Opportunity Levels
Update the `riskLevels` and `opportunityLevels` arrays in `sampleData.js`.

### Styling Changes
Modify `src/index.css` for global styles or add component-specific styles.

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License
This project is for business use. Please ensure compliance with your organization's policies.

## Support
For questions or issues, please refer to the code comments or create an issue in your project repository.
