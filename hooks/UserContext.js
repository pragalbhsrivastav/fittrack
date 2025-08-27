"use client";

import api from "@/lib/axios";
// context/UserContext.js or .ts
import { createContext, useContext, useEffect, useState } from "react";

// Step 1: Create context
const UserContext = createContext();

// Step 2: Create provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { onboarded: true/false, name, email... }

  async function getProfile() {
    const res = await api.get("/profile");
    return res.data;
  }

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (!token) return

      getProfile().then((res) => {
        setUser(res?.data);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Step 3: Custom hook to use context
export const useUser = () => useContext(UserContext);
