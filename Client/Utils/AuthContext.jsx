import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// const navigate = useNavigate()
// Create the AuthContext
export  const AuthContext = createContext();
// Create a provider component
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const handleAuth = (newToken,newUser) => {
    setToken(newToken);
    setUser(newUser);
    // navigate('/auth')
  };

  return (
    <AuthContext.Provider value={{ token, handleAuth, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider