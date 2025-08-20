// app/services/signupService.js
import apiManager from "./apiManager";

const register = async (queryObj) => {
  try {
    const response = await apiManager.axios.post(`/register`, queryObj);
    
    // Only store tokens if response is successful
    localStorage.setItem("Authentication", response.data.access_token);
    localStorage.setItem("userId", response.data.user.id);
    localStorage.setItem("setupTime", new Date().getTime());
    
    return {
      status: response.status,
      data: response.data,
    };
  } catch (e) {
    // Handle Axios errors
    if (e.response) {
      return {
        status: e.response.status,
        message: e.response.data?.error || "Registration failed. Please try again.",
      };
    }
    
    // Handle other errors
    return {
      status: 500,
      message: "An unexpected error occurred. Please try again.",
    };
  }
};

export default { register };