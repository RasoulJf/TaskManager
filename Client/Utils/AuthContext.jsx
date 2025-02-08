import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// const navigate = useNavigate()
// Create the AuthContext
export  const AuthContext = createContext();
// Create a provider component
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);

  const handleAuth = (newToken,newUser) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("token", newToken);
  };

  return (
    <AuthContext.Provider value={{ token, handleAuth, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider