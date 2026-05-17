import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business Automation Tools & AI Business Tools',
  description:
    'Explore business automation and AI tools for invoicing, operations, workflow automation, and revenue growth for startups and small businesses.',
  alternates: {
    canonical: '/business-automation-tools',
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

