import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Stenson Fields Christian Fellowship',
  description: 'Welcome to Stenson Fields Christian Fellowship - Rooted in Truth, Reaching in Love',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}