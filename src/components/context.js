"use client";
import { createContext, useMemo } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({ children, value }) {
  const isLogin = () => {
    if (typeof window !== "undefined") {
      const userDetails = localStorage.getItem("userDetailsStorage") || "";
      if (userDetails !== "") {
        return true;
      } else {
        return false;
      }
    }
  };

  const getLoginUser = () => {
    if (typeof window !== "undefined") {
      const getUserDetails = JSON.parse(
        localStorage.getItem("userDetailsStorage") || "{}"
      );
      return getUserDetails;
    }
  };

  const contextValue = useMemo(
    () => ({
      getLoginUser,
      isLogin,
      ...value,
    }),
    [value]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
