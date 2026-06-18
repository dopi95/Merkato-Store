"use client";
import { LangProvider } from "./LangContext";
import { CurrencyProvider } from "./CurrencyContext";
import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";

export default function Providers({ children }) {
  return (
    <LangProvider>
      <CurrencyProvider>
        <CartProvider>
          <WishlistProvider>
            {children}
          </WishlistProvider>
        </CartProvider>
      </CurrencyProvider>
    </LangProvider>
  );
}
