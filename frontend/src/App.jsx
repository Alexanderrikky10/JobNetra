import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import { useContext } from "react";
import { DarkMode } from "./context/DarkMode";
import DetailJobPage from "./pages/detailJob";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import Tutorial from "./pages/tutorial";
import { ProtectedRoute } from "./hooks/ProtectedRoute";
import { AuthRoute } from "./hooks/AuthRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RegisterPage from "./pages/register";

const queryClient = new QueryClient();

function App() {
  const { isDarkMode } = useContext(DarkMode);
  return (
    <div
      className={`w-full min-h-screen ${
        isDarkMode ? "bg-[var(--bg-dark)]" : "bg-[var(--bg-light)]"
      }`}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={
                <AuthRoute>
                  <LoginPage />
                </AuthRoute>
              }
            />
            <Route
              path="/register"
              element={
                <AuthRoute>
                  <RegisterPage />
                </AuthRoute>
              }
            />
            <Route
              path="/jobs"
              element={
                <ProtectedRoute>
                  <DetailJobPage />
                </ProtectedRoute>
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/tutorial" element={<Tutorial />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
