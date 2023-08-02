import { User } from 'shared/types';
import React, { createContext, useContext, useState } from 'react';
import { getStoredUser, setStoredUser, clearStoreduser } from 'user-storage';

interface AuthContextProps {
  user: User | null;
  saveUser: (user: User | null) => void;
}

const AuthContext: React.Context<AuthContextProps> = createContext(
  {} as AuthContextProps
);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = getStoredUser();
    return storedUser ? storedUser : null;
  });

  const saveUser = (user: User | null) => {
    setUser(user);
    // save user if user exists, otherwise if user is null, remove
    if (user) setStoredUser(user);
    else clearStoreduser();
  };

  return (
    <AuthContext.Provider value={{ user, saveUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
