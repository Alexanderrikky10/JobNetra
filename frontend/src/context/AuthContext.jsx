import { createContext, useEffect, useState } from "react";
import authService from "../services/auth.service";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [session, setSession] = useState({
    token: "",
    user: {},
  });

  const login = ({ token, user }) => {
    localStorage.setItem("session", JSON.stringify({ token, user }));
    setSession({ token, user });
  };

  const logout = async () => {
    await authService.logout();
    localStorage.removeItem("session");
    setSession({ token: "", user: {} });
  };

  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) {
      try {
        const { token, user } = JSON.parse(session);
        setSession({ token, user });
      } catch (err) {
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        login,
        logout,
        isAuthenticated: !!session.token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
