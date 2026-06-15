import "./globals.css";
import Providers from "./context/Providers";

export const metadata = {
  metadataBase: new URL('https://merkato-store-pr.vercel.app'),
  title: "Merkato Store — Your Premium Marketplace",
  description: "Merkato Store — Discover premium products at unbeatable prices. Your ultimate online shopping destination.",
  icons: {
    icon: '/assets/favicon.png',
    shortcut: '/assets/favicon.png',
    apple: '/assets/favicon.png',
  },
  openGraph: {
    title: "Merkato Store — Your Premium Marketplace",
    description: "Discover premium products at unbeatable prices. Your ultimate online shopping destination.",
    url: 'https://merkato-store-pr.vercel.app',
    siteName: 'Merkato Store',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Merkato Store Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: "Merkato Store — Your Premium Marketplace",
    description: "Discover premium products at unbeatable prices.",
    images: ['/images/logo.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}



