"use client";
import { createContext } from "react";

export const UserContext = createContext({
  name: "Anonymous",
  id: "guest_123",
});

export const UserProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <UserContext.Provider value={{ name: "Anonymous", id: "guest_123" }}>
      {children}
    </UserContext.Provider>
  );
};
