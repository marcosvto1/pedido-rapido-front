import React, { createContext, useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthParams, AuthService } from "../services/auth";

export interface UserType {
  name: string;
}

export interface AuthContextType {
  user: any,
  signIn(params: AuthParams): void;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextType>({
  signIn: (params: AuthParams) => {},
  signOut: () => {},
  user: { name: '' }
});

export const useAuth = () => {
  return useContext(AuthContext);
}
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const [user, setUser] = useState<any>(null);

  const signIn = async ({ email, password }: AuthParams) => {
    const response = await AuthService.sign_in({ email, password});
    setUser(response.data);
  }

  const signOut = () => {}

  const value = {
    user,
    signIn,
    signOut
  }

  return <AuthContext.Provider value={value}>
    { children }
  </AuthContext.Provider>
}

export function RequireAuth({ children}: { children: JSX.Element })  {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/auth/sign_in" state={{ from: location }} replace />
  }

  return children;
}