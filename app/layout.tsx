import { GoogleAnalytics } from '@next/third-parties/google';
import { Instrument_Serif, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import type { Metadata } from 'next';

const instrumentSerif = Instrument_Serif({ 
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-instrument'
});

const plusJakarta = Plus_Jakarta_Sans({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-jakarta'
});

const jetbrainsMono = JetBrains_Mono({ 
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-jetbrains'
});

export const metadata: Metadata = {
  title: 'Ilyan Khan — Systems & AI Engineer',
  description: 'Production developer portfolio & Generative AI systems architecture showcase for Ilyan Khan.',
  applicationName: 'Ilyan Khan',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Ilyan Khan — Systems & AI Engineer',
    description: 'Production developer portfolio & Generative AI systems architecture showcase for Ilyan Khan.',
    url: 'https://www.ilyankhan.tech',
    siteName: 'Ilyan Khan',
    images: [
      {
        url: 'https://www.ilyankhan.tech/pp.jpeg',
        width: 800,
        height: 600,
        alt: 'Ilyan Khan - Systems Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ilyan Khan',
    alternateName: ['Ilyan Khan Portfolio', 'ilyankhan.tech'],
    url: 'https://www.ilyankhan.tech',
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${instrumentSerif.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} bg-[var(--bg-canvas)] text-[var(--text-dark)] min-h-screen font-sans-clean antialiased`}>
        {children}
        <GoogleAnalytics gaId="G-SYC3BYGN7J" />
      </body>
    </html>
  );
}
