import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Web and App Development Agency',
  description:
    'Talk to Yantrix Labs about website development, mobile app development, SaaS product builds, and business automation solutions.',
  alternates: {
    canonical: 'https://yantrixlab.com/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
