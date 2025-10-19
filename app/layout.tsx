import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Risk–Opportunity Heatmap',
  description:
    'Collaborative platform for mapping business risks and opportunities in real time.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
