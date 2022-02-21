import Cookies from "js-cookie";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthParams, AuthService } from "../services/auth";

export interface UserType {
  name: string;
}

export interface AuthContextType {
  user: any,
  signIn(params: AuthParams): void;
  signOut(): Promise<boolean>;
  getAccount(): any;
}

export const AuthContext = createContext<AuthContextType>({
  signIn: (params: AuthParams) => {},
  signOut: () => Promise.resolve(true),
  user: { name: '' },
  getAccount: () => {}
});

export const useAuth = () => {
  return useContext(AuthContext);
}
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (user === null) {
      const user = getAccount();
      setUser(user);
    }
  }, [user])

  const signIn = async ({ email, password }: AuthParams) => {
    const response = await AuthService.sign_in({ email, password});
    Cookies.set('@api-user', JSON.stringify(response.data))
    setUser(response.data);
    return response.data.type_profile;
  }

  const signOut = async () => {
    const response = await AuthService.sign_out();
    if (response.success) {
      setUser({});
      Cookies.remove('@api-data');
      Cookies.remove('@api-user');
      return true;
    }
    return false;
  }

  const getAccount = () => {
    const cookie = Cookies.get('@api-user')
    if (!cookie) return null;
    const account = JSON.parse(cookie);
    return account;
  }

  const value = {
    user,
    signIn,
    signOut,
    getAccount
  }

  return <AuthContext.Provider value={value}>
    { children }
  </AuthContext.Provider>
}

export function RequireAuth({ children}: { children: JSX.Element })  {
  let auth = useAuth();
  let location = useLocation();
  if (!auth.getAccount()) {
    return <Navigate to="/auth/sign_in" state={{ from: location }} replace />
  }
  return children;
}