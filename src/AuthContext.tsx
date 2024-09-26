import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  username: string | null;
  login: (username: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("username")
  );

  const login = (username: string) => {
    setUsername(username);
    localStorage.setItem("username", username);
  };

  const logout = () => {
    setUsername(null);
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
