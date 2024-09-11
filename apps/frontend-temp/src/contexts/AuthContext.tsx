import React, { createContext, useState, useEffect, useContext, PropsWithChildren, useCallback, useMemo } from 'react';
import Cookies from 'js-cookie';

// Definição da interface do usuário
interface User {
  username: string;
  user_id: string;
  session_token: string;
  role: 'admin' | 'user';
}

// Definição do contexto de autenticação
interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// Função para carregar o estado inicial do usuário dos cookies
const loadUserFromCookies = (): User | null => {
  const session_token = Cookies.get('session_token');
  const username = Cookies.get('username');
  const user_id = Cookies.get('user_id');
  const role = Cookies.get('user_role') as 'admin' | 'user' | null;

  if (session_token && username && user_id && role) {
    return {
      username,
      user_id,
      session_token,
      role,
    };
  }

  return null;
};

// Criação do contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // Inicializa o estado diretamente com os cookies
  const [user, setUser] = useState<User | null>(loadUserFromCookies);
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  useEffect(() => {
    // Atualiza o estado se os cookies mudarem
    if (user) {
      setIsAuthenticated(true);
    }
  }, [user]);

  const login = useCallback((user: User) => {
    // Armazena os dados do usuário nos cookies
    Cookies.set('session_token', user.session_token);
    Cookies.set('username', user.username);
    Cookies.set('user_id', user.user_id);
    Cookies.set('user_role', user.role);

    // Define o estado do usuário
    setUser(user);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    // Remove os cookies
    Cookies.remove('session_token');
    Cookies.remove('username');
    Cookies.remove('user_id');
    Cookies.remove('user_role');

    // Limpa o estado do usuário
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({ user, login, logout, isAuthenticated }),
    [user, login, logout, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook para usar o contexto de autenticação de forma mais simples
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
