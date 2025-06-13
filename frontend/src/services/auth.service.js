import api from "../lib/api";

const authService = {
  login: (payload) => {
    payload = {
      ...payload,
      device_name: "browser",
    };
    return api.post("/login", payload);
  },

  logout: () => api.delete("/logout"),

  register: (payload) => {
    payload = {
      ...payload,
      device_name: "browser",
    };
    return api.post("/register", payload);
  },

  forgotPassword: (payload) => api.post("/resetPassword", payload),

  resetPassword: (payload) => api.post("/NewPassword", payload),
};

export default authService;
