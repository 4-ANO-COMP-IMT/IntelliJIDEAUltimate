// src/contexts/AuthContext.tsx

import React, { createContext, useState, useEffect, useContext, PropsWithChildren, useCallback, useMemo } from 'react';
import Cookies from 'js-cookie';



// Definição do contexto de autenticação
interface AllowedRolesContextType {
  allowedRoles: ('admin' | 'user')[];
}

// Criação do contexto
export const AllowedRolesContext = createContext<AllowedRolesContextType | undefined>(undefined);

interface AllowedRolesProviderProps extends PropsWithChildren {
  roles: ('admin' | 'user')[];
}

export const AllowedRolesProvider: React.FC<AllowedRolesProviderProps> = ({ children, roles }) => {
 
   
  const [allowedRoles, setAllowedRoles] = useState<('admin' | 'user')[]>(roles);

  return (
    <AllowedRolesContext.Provider value={{ allowedRoles }}>
      {children}
    </AllowedRolesContext.Provider>
  );
};

// Hook para usar o contexto de autenticação de forma mais simples
export const useAllowedRoles = (): AllowedRolesContextType => {
  const context = useContext(AllowedRolesContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
