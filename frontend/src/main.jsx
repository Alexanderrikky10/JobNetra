import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import DarkModeContextProvider from "./context/DarkMode.jsx";
import AuthProvider from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DarkModeContextProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </DarkModeContextProvider>
  </StrictMode>
);
