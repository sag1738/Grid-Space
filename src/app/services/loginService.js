import apiManager from "./apiManager";

const login = async (queryObj) => {
  const message = await apiManager.axios
    .post(`/login`, queryObj)
    .then((response) => {
      localStorage.setItem("Authentication", response.data.access_token);
      localStorage.setItem("userId", response.data.user.id);

      // Check if user has admin role
      const isAdmin = response.data.user.roles.some(
        (role) => role.name === "admin"
      );
      localStorage.setItem("isAdmin", isAdmin.toString()); // Store as string

      localStorage.setItem("setupTime", new Date().getTime());
      return response;
    })
    .catch((e) => {
      return {
        status: e.status,
        message: e.response,
      };
    });
  return message;
};

export default {
  login,
};
