import api from "../lib/api";

const authService = {
  login: (payload) => {
    payload = {
      ...payload,
      device_name: "browser",
    };
    return api.post("/login", payload);
  },

  register: (payload) => {
    payload = {
      ...payload,
      device_name: "browser",
    };
    return api.post("/register", payload);
  },
};

export default authService;
