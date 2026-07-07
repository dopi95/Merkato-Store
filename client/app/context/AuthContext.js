"use client";
import { createContext, useContext, useState, useEffect } from "react";

const DEMO_USER = {
  name: "Abebe Kebede",
  email: "abebe.kebede@example.com",
  phone: "+251 911 234 567",
  dob: "1990-06-15",
  gender: "Male",
  avatar: null,
  joined: "January 2023",
};

const AuthContext = createContext({
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      if (localStorage.getItem("merkato_auth") === "true") {
        setUser(DEMO_USER);
      }
    } catch {}
  }, []);

  function login() {
    setUser(DEMO_USER);
    localStorage.setItem("merkato_auth", "true");
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("merkato_auth");
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
