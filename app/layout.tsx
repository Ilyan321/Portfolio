import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ilyan Khan — Systems & AI Engineer',
  description: 'Production developer portfolio & Generative AI systems architecture showcase for Ilyan Khan.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#08090A] text-[#F3F4F6] min-h-screen font-sans antialiased">
        {children}
        <GoogleAnalytics gaId="G-SYC3BYGN7J" />
      </body>
    </html>
  );
}
