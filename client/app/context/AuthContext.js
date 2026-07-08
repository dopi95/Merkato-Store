"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

const AuthContext = createContext({ user: null, isLoggedIn: false, login: async () => {}, logout: () => {} });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("merkato_token");
    if (!token) { setLoading(false); return; }
    axios.get(`${API}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => setUser(r.data))
      .catch(() => localStorage.removeItem("merkato_token"))
      .finally(() => setLoading(false));
  }, []);

  async function login(email, password) {
    const { data } = await axios.post(`${API}/auth/login`, { email, password });
    localStorage.setItem("merkato_token", data.token);
    setUser(data.user);
    return data;
  }

  async function loginWithToken(token) {
    localStorage.setItem("merkato_token", token);
    const { data } = await axios.get(`${API}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
    setUser(data);
    return data;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("merkato_token");
  }

  function updateUser(data) {
    setUser(prev => ({ ...prev, ...data }));
  }

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, loginWithToken, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
