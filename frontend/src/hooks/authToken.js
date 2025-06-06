export const getToken = () => {
  const session = localStorage.getItem("session");
  if (!session | (session?.token === "")) return null;

  try {
    const { token } = JSON.parse(session);
    return token;
  } catch {
    return null;
  }
};
