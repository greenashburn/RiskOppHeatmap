// Sample data for the Risk Opportunity Heatmap
export const generateSampleData = () => {
  return [
    {
      id: '1',
      title: 'New Market Expansion',
      description: 'Opportunity to expand into European markets with high growth potential',
      category: 'Strategic',
      riskLevel: 'Medium',
      opportunityLevel: 'High',
      impact: 'High',
      probability: 0.7,
      owner: 'Marketing Team',
      status: 'In Progress',
      createdAt: '2024-01-15T10:00:00Z',
      tags: ['growth', 'international', 'revenue']
    },
    {
      id: '2',
      title: 'Cybersecurity Breach',
      description: 'Potential security vulnerability in customer data systems',
      category: 'Operational',
      riskLevel: 'High',
      opportunityLevel: 'Low',
      impact: 'Critical',
      probability: 0.3,
      owner: 'IT Security',
      status: 'Monitoring',
      createdAt: '2024-01-10T14:30:00Z',
      tags: ['security', 'compliance', 'data']
    },
    {
      id: '3',
      title: 'AI Integration Project',
      description: 'Implementing AI-driven customer service automation',
      category: 'Technology',
      riskLevel: 'Medium',
      opportunityLevel: 'High',
      impact: 'Medium',
      probability: 0.8,
      owner: 'Product Team',
      status: 'Planning',
      createdAt: '2024-01-20T09:15:00Z',
      tags: ['ai', 'automation', 'efficiency']
    },
    {
      id: '4',
      title: 'Regulatory Compliance Changes',
      description: 'New data protection regulations requiring system updates',
      category: 'Compliance',
      riskLevel: 'High',
      opportunityLevel: 'Low',
      impact: 'High',
      probability: 0.9,
      owner: 'Legal Team',
      status: 'Urgent',
      createdAt: '2024-01-05T16:45:00Z',
      tags: ['compliance', 'legal', 'regulations']
    },
    {
      id: '5',
      title: 'Partnership with Tech Giant',
      description: 'Strategic partnership opportunity with major technology company',
      category: 'Strategic',
      riskLevel: 'Low',
      opportunityLevel: 'High',
      impact: 'High',
      probability: 0.6,
      owner: 'Business Development',
      status: 'Negotiating',
      createdAt: '2024-01-18T11:20:00Z',
      tags: ['partnership', 'strategic', 'growth']
    },
    {
      id: '6',
      title: 'Supply Chain Disruption',
      description: 'Potential disruption in key supplier relationships',
      category: 'Operational',
      riskLevel: 'High',
      opportunityLevel: 'Low',
      impact: 'Medium',
      probability: 0.4,
      owner: 'Operations',
      status: 'Monitoring',
      createdAt: '2024-01-12T13:10:00Z',
      tags: ['supply-chain', 'logistics', 'operations']
    },
    {
      id: '7',
      title: 'Customer Experience Innovation',
      description: 'New mobile app features to enhance customer engagement',
      category: 'Product',
      riskLevel: 'Low',
      opportunityLevel: 'Medium',
      impact: 'Medium',
      probability: 0.8,
      owner: 'Product Team',
      status: 'In Progress',
      createdAt: '2024-01-22T08:30:00Z',
      tags: ['mobile', 'ux', 'engagement']
    },
    {
      id: '8',
      title: 'Economic Downturn Impact',
      description: 'Potential impact of economic recession on customer spending',
      category: 'Financial',
      riskLevel: 'High',
      opportunityLevel: 'Low',
      impact: 'High',
      probability: 0.5,
      owner: 'Finance Team',
      status: 'Monitoring',
      createdAt: '2024-01-08T15:00:00Z',
      tags: ['economic', 'revenue', 'market']
    },
    {
      id: '9',
      title: 'Talent Acquisition',
      description: 'Hiring key technical talent to accelerate product development',
      category: 'Human Resources',
      riskLevel: 'Low',
      opportunityLevel: 'High',
      impact: 'High',
      probability: 0.7,
      owner: 'HR Team',
      status: 'Active',
      createdAt: '2024-01-25T12:00:00Z',
      tags: ['hiring', 'talent', 'development']
    },
    {
      id: '10',
      title: 'Data Privacy Violation',
      description: 'Risk of accidental data exposure due to system misconfiguration',
      category: 'Compliance',
      riskLevel: 'Medium',
      opportunityLevel: 'Low',
      impact: 'Critical',
      probability: 0.2,
      owner: 'IT Security',
      status: 'Mitigating',
      createdAt: '2024-01-14T10:45:00Z',
      tags: ['privacy', 'data', 'compliance']
    }
  ];
};

export const categories = [
  'Strategic',
  'Operational', 
  'Technology',
  'Compliance',
  'Product',
  'Financial',
  'Human Resources',
  'Marketing'
];

export const riskLevels = ['Low', 'Medium', 'High', 'Critical'];
export const opportunityLevels = ['Low', 'Medium', 'High', 'Critical'];
export const impactLevels = ['Low', 'Medium', 'High', 'Critical'];
export const statusOptions = ['Planning', 'In Progress', 'Monitoring', 'Urgent', 'Active', 'Negotiating', 'Mitigating'];
