import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserInfo = localStorage.getItem('userInfo');
    
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }

    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []); 

  const login = (jwtToken, userData) => {
    localStorage.setItem('token', jwtToken);
    localStorage.setItem('userInfo', JSON.stringify(userData));

    setToken(jwtToken);
    setIsAuthenticated(true);
    setUserInfo(userData);
    setCookie(jwtToken)
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');

    setIsAuthenticated(false);
    setToken('');
    setUserInfo(null);
    deleteCookie()
  };

  const setCookie = (jwtToken) => {
    Cookies.set('token', jwtToken, { expires: 7 });
  };

  const deleteCookie = () => {
    document.cookie = `token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
