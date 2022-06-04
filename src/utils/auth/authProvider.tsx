import React, { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "../../api/users";
import { User } from "../../types";

type AuthContextProps = {
  currentUser: User | null | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
};

export const AuthContext = createContext<AuthContextProps>({
  currentUser: undefined,
  setCurrentUser: () => {
    throw Error("No default value!");
  },
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );

  useEffect(() => {
    const inner = async () => {
      try {
        const res = await getCurrentUser()
        const user: User = res.data
        setCurrentUser(user)
      } catch {
        setCurrentUser(null)
      }
    }
    inner()
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
