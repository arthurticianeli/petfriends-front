import { jwtDecode } from "jwt-decode";
import { AccessTokenDto } from "modules/authentication/domain/dtos/AccessTokenDto";
import { UserSessionToken } from "modules/authentication/domain/dtos/UserSessionToken";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const AUTH_PARAM = "_auth";

interface AuthContextType {
  userSession: UserSessionToken | null;
  initSession: (token: AccessTokenDto) => void;
  clearSession: () => void;
  getUserSession: () => UserSessionToken | null;
  isSessionValid: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [userSession, setUserSession] = useState<UserSessionToken | null>(null);

  const initSession = (token: AccessTokenDto) => {
    if (token.data.accessToken) {
      const decodedToken: any = jwtDecode(token.data.accessToken);

      const newUserSession: UserSessionToken = {
        accessToken: token.data.accessToken,
        email: decodedToken.sub,
        name: decodedToken.name,
        expiration: decodedToken.exp,
      };

      localStorage.setItem(AUTH_PARAM, JSON.stringify(newUserSession));
      setUserSession(newUserSession);
    }
  };

  const getUserSession = (): UserSessionToken | null => {
    const session = localStorage.getItem(AUTH_PARAM);
    if (session) {
      const userSession: UserSessionToken = JSON.parse(session);
      return userSession;
    }

    return null;
  };

  const isSessionValid = (): boolean => {
    const user: UserSessionToken | null = getUserSession();
    if (!user) {
      return false;
    }

    return new Date(user.expiration * 1000) > new Date();
  };

  const clearSession = () => {
    localStorage.removeItem(AUTH_PARAM);
    setUserSession(null);
    navigate("/");
  };

  return useMemo(
    () => (
      <AuthContext.Provider
        value={{
          userSession,
          initSession,
          getUserSession,
          isSessionValid,
          clearSession,
        }}
      >
        {children}
      </AuthContext.Provider>
    ),
    [userSession, children]
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
