import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { LangProvider } from "./context/LangContext";

export const metadata = {
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
        <LangProvider>
          <Header />
          {children}
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
