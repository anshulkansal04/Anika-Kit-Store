import { createContext, useContext, useState, useCallback } from 'react';
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
  const [loading, setLoading] = useState(false);

  // Call this only from admin pages to check if a session cookie is valid
  const verifySession = useCallback(async () => {
    setLoading(true);
    try {
      const response = await authService.verifyToken();
      if (response.success) {
        setAdmin(response.data.admin);
        return true;
      }
      setAdmin(null);
      return false;
    } catch {
      setAdmin(null);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      if (response.success) {
        setAdmin(response.data.admin);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch {
      // Cookie might already be expired — ignore
    }
    setAdmin(null);
  };

  const register = async (name, email, password) => {
    try {
      const response = await authService.register(name, email, password);
      if (response.success) {
        setAdmin(response.data.admin);
        return { success: true };
      }
      return { success: false, message: response.message };
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
    loading,
    login,
    logout,
    register,
    verifySession,
    isAuthenticated: !!admin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 