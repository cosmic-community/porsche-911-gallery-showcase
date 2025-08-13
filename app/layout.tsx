import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import CosmicBadge from '@/components/CosmicBadge';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Porsche 911 Gallery Showcase',
  description: 'A stunning visual showcase of Porsche 911 automotive photography. Experience the legendary sports cars through breathtaking professional photography.',
  keywords: 'Porsche 911, automotive photography, sports cars, gallery, photography showcase',
  authors: [{ name: 'Porsche 911 Gallery' }],
  openGraph: {
    title: 'Porsche 911 Gallery Showcase',
    description: 'A stunning visual showcase of Porsche 911 automotive photography',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Porsche 911 Gallery Showcase',
    description: 'A stunning visual showcase of Porsche 911 automotive photography',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string;

  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-900 text-gray-100">
          {children}
        </div>
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  );
}