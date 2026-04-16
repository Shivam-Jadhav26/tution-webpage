import { createContext, useContext, useState, ReactNode } from 'react';
import { User, Role } from '../types';
import { mockUser, mockAdmin } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  role: Role;
  login: (role: Role) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>('guest');
  const [user, setUser] = useState<User|null>(null);

  const login = (newRole: Role) => {
    setRole(newRole);
    if (newRole === 'student') setUser(mockUser);
    if (newRole === 'admin') setUser(mockAdmin);
  };

  const logout = () => {
    setRole('guest');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      role, 
      login, 
      logout, 
      isAuthenticated: role !== 'guest' 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
