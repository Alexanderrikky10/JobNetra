import { createContext, useEffect, useState } from "react";
import authService from "../services/auth.service";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  console.log(session);

  const login = ({ token, user }) => {
    localStorage.setItem("session", JSON.stringify({ token, user }));
    setSession({ token, user });
  };

  const logout = async () => {
    await authService.logout();
    localStorage.removeItem("session");
    setSession(null);
  };

  useEffect(() => {
    const local = localStorage.getItem("session");
    if (local) {
      try {
        const { token, user } = JSON.parse(local);
        setSession({ token, user });
      } catch {
        logout();
      }
    } else {
      setSession({ token: "", user: {} });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        login,
        logout,
        isAuthenticated: session?.token?.length > 0,
        isLoadingAuthentication: session === null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
