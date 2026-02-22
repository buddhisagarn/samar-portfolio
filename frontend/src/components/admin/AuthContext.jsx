import { createContext, useState, useEffect } from "react";
import API from "../../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      const token = sessionStorage.getItem("token");

      if (token) {
        API.defaults.headers.common.Authorization = `Bearer ${token}`;
        setUser({ role: "admin" }); // later: fetch /me
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  const login = (token) => {
    sessionStorage.setItem("token", token);
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser({ role: "admin" });
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    delete API.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
