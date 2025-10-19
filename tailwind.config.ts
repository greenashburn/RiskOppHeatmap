import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        risk: {
          high: '#B91C1C',
          medium: '#F97316',
          low: '#FACC15'
        },
        opportunity: {
          high: '#2563EB',
          medium: '#22D3EE',
          low: '#86EFAC'
        }
      }
    }
  },
  plugins: []
};

export default config;
