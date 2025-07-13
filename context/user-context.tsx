"use client";
import { createContext } from "react";

export const UserContext = createContext({
  name: "",
  id: "",
});

export const UserProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <UserContext.Provider value={{ name: "", id: "" }}>
      {children}
    </UserContext.Provider>
  );
};
