import apiManager from "./apiManager";

const subscription = async (queryObj) => {
  const response = apiManager.axios
    .post(`/subscriptions`, queryObj)
    .then((response) => {
      return { status: 200, data: response.data };
    })
    .catch((err) => {
      return {
        status: err.response.status,
        message: err.response.message || "Subscription failed",
      };
    });
  return response;
};

const listSubscriptions = async () => {
  const response = apiManager.axios
    .get(`/subscriptions/users`)
    .then((response) => {
      return { status: 200, data: response.data };
    })
    .catch((err) => {
      return {
        status: err.response.status,
        message: err.response.message || "Fetching bookings failed",
      };
    });
  return response;
};

export default {
  subscription,
  listSubscriptions,
};
