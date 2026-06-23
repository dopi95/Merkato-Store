"use client";
import { LangProvider } from "./LangContext";
import { CurrencyProvider } from "./CurrencyContext";
import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";
import { AuthProvider } from "./AuthContext";

export default function Providers({ children }) {
  return (
    <LangProvider>
      <CurrencyProvider>
        <CartProvider>
          <WishlistProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </WishlistProvider>
        </CartProvider>
      </CurrencyProvider>
    </LangProvider>
  );
}
