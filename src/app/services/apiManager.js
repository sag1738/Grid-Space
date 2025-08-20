import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL; // ? URL where the API has been hosted

axios.defaults.timeout = 10000; // ? Max time to wait for an response ~10sec

// ? appends the auth token to all of the request headers
axios.interceptors.request.use(
  async (req) => {
    const token = localStorage.getItem("Authentication"); // ? fetch the token from the local storage

    console.log(token);
    // * if the token exists
    if (token) {
      req.headers.Authorization = `Bearer ${token}`; // ? append the token under the key Authorization
    }
    return req;
  },
  (error) => {
    // ! if any error occurs throw the error
    return Promise.reject(error);
  }
);

axios.defaults.headers.post["Content-Type"] = "application/json"; // ? content type of the request body
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
// * this file prepares add the necessary contents to all of the API requests to reduce repition

export default {
  axios,
};
