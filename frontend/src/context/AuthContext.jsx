import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('admin_token'));

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          const response = await authService.verifyToken();
          if (response.success) {
            setAdmin(response.data.admin);
          } else {
            // Token is invalid, remove it
            localStorage.removeItem('admin_token');
            setToken(null);
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          localStorage.removeItem('admin_token');
          setToken(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      if (response.success) {
        const { token: newToken, admin: adminData } = response.data;
        localStorage.setItem('admin_token', newToken);
        setToken(newToken);
        setAdmin(adminData);
        return { success: true };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
    setAdmin(null);
  };

  const register = async (name, email, password) => {
    try {
      const response = await authService.register(name, email, password);
      if (response.success) {
        const { token: newToken, admin: adminData } = response.data;
        localStorage.setItem('admin_token', newToken);
        setToken(newToken);
        setAdmin(adminData);
        return { success: true };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const value = {
    admin,
    token,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!admin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 