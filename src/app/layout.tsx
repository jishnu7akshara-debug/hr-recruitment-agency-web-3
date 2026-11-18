import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-serif',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://treoconsultancy.in'),
  title: {
    default: 'Treo Consultancy | Artful IT & Technology Talent Search',
    template: '%s | Treo Consultancy',
  },
  description:
    'Premier high-conviction IT recruitment firm in India. Cinematic precision in engineering matchmaking for venture-backed unicorns and global technology leaders.',
  keywords: [
    'IT Recruitment India',
    'Tech Recruitment Consultancy Bangalore',
    'Staff Engineer Search',
    'DevOps Engineers India',
    'Golang Architects',
    'Tech Talent Headhunting',
  ],
  authors: [{ name: 'Talenty Consultancy' }],
  creator: 'Talenty Consultancy',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://talenty.in',
    title: 'Talenty Consultancy | Artful IT & Technology Talent Search',
    description:
      'Cinematic precision in engineering matchmaking for venture-backed unicorns and global technology leaders.',
    siteName: 'Talenty Consultancy',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-[#08090C] text-[#F8F7F4] selection:bg-[#C5A880] selection:text-[#08090C]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
