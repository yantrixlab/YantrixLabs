import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom Software Development Services | Web, Mobile & SaaS',
  description:
    'Custom software development services for startups and SMEs: web apps, mobile apps, SaaS platforms, MVP builds, and long-term product engineering support.',
  alternates: {
    canonical: '/services',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
