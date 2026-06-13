import "./globals.css";

export const metadata = {
  title: "Merkato Store",
  description: "Merkato Store - Your online marketplace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
