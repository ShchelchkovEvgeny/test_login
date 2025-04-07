"use client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState<any>({ status: "fetching", data: null });

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser)
        setUser({ status: "logged", data: JSON.parse(storedUser) });
    } catch (error) {
      setUser({ status: "guest", data: null });
    }
  }, []);

  const login = (userData: any) => {
    setUser({ status: "logged", data: userData });
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser({ status: "fetching", data: null });
    localStorage.removeItem("user");
    redirect("/login");
  };

  return { user, login, logout };
};
