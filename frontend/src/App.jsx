import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import { useContext, useEffect } from "react";
import { DarkMode } from "./context/DarkMode";
import DetailJobPage from "./pages/detailJob";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import Tutorial from "./pages/tutorial";
import { AuthRoute } from "./hooks/AuthRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RegisterPage from "./pages/register";
import ForgotPassword from "./pages/forgotPassword/forgotPassword";
import EmailConfirmation from "./pages/emailConfirmation";
import ResetPassword from "./pages/resetPassword";
import InputSkill from "./pages/inputSkill";
import NotFound from "./pages/notFound";

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
              path="/forgot-password"
              element={
                <AuthRoute>
                  <ForgotPassword />
                </AuthRoute>
              }
            />

            <Route
              path="/email-success"
              element={
                <AuthRoute>
                  <EmailConfirmation />
                </AuthRoute>
              }
            />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/jobs" element={<DetailJobPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/skills" element={<InputSkill />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
