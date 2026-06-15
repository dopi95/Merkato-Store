import "./globals.css";
import Providers from "./context/Providers";

export const metadata = {
  metadataBase: new URL('https://merkatostore.com'),
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
    url: 'https://merkatostore.com',
    siteName: 'Merkato Store',
    images: [
      {
        url: '/assets/favicon.png',
        width: 512,
        height: 512,
        alt: 'Merkato Store Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: "Merkato Store — Your Premium Marketplace",
    description: "Discover premium products at unbeatable prices.",
    images: ['/assets/favicon.png'],
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



