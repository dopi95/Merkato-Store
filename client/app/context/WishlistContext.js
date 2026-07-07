"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("merkato_wishlist");
      if (saved) setIds(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem("merkato_wishlist", JSON.stringify(ids));
  }, [ids, loaded]);

  const toggle = useCallback((id) => {
    setIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }, []);

  const isWished = useCallback((id) => ids.includes(id), [ids]);

  return (
    <WishlistContext.Provider value={{ ids, toggle, isWished, count: ids.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
};
