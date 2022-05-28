import { Loader } from "@mantine/core";
import { getAuth } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import "./../firebase";

type User = {
  email: string | null;
};

type AuthContextProps = {
  currentUser: User | null | undefined;
  signedIn: boolean;
};

export const AuthContext = createContext<AuthContextProps>({
  currentUser: undefined,
  signedIn: false,
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser({ email: user.email });
        setSignedIn(true);
      } else {
        setSignedIn(true);
      }
    });
  });

  if (signedIn) {
    return (
      <AuthContext.Provider value={{ currentUser, signedIn }}>
        {children}
      </AuthContext.Provider>
    );
  } else {
    return <Loader />;
  }
};
