import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import { useContext } from "react";
import { DarkMode } from "./context/DarkMode";

function App() {
  const { isDarkMode } = useContext(DarkMode);
  return (
    <div
      className={`w-full min-h-screen ${
        isDarkMode ? "bg-[var(--bg-dark)]" : "bg-[var(--bg-light)"
      }`}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
