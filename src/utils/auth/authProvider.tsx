import { Loader } from "@mantine/core";
import { getAuth } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { User } from "../../types";
import "./../firebase";

type AuthContextProps = {
  currentUser: User | null | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
  signedIn: boolean;
};

export const AuthContext = createContext<AuthContextProps>({
  currentUser: undefined,
  setCurrentUser: () => {
    throw Error("No default value!");
  },
  signedIn: false,
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );
  const [signedIn, checkSignedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser({ id: null, name: null, email: user.email });
        checkSignedIn(true);
      } else {
        checkSignedIn(true);
      }
    });
  });

  if (signedIn) {
    return (
      <AuthContext.Provider value={{ currentUser, setCurrentUser, signedIn }}>
        {children}
      </AuthContext.Provider>
    );
  } else {
    return <Loader />;
  }
};
