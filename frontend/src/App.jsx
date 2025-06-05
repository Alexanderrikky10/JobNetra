import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import { useContext } from "react";
import { DarkMode } from "./context/DarkMode";
import DetailJobPage from "./pages/detailJob";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import Tutorial from "./pages/tutorial";

function App() {
  const { isDarkMode } = useContext(DarkMode);
  return (
    <div
      className={`w-full min-h-screen ${
        isDarkMode ? "bg-[var(--bg-dark)]" : "bg-[var(--bg-light)]"
      }`}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/jobs" element={<DetailJobPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/tutorial" element={<Tutorial />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
