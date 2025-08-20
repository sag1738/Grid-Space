import apiManager from "./apiManager";

const booking = async (queryObj) => {
  const response = apiManager.axios
    .post(`/bookings`, queryObj)
    .then((response) => {
      return { status: 200, data: response.data };
    })
    .catch((err) => {
      return {
        status: err.response.status,
        message: err.response.message || "Booking failed",
      };
    });
  return response;
};

const listBookings = async () => {
  const response = apiManager.axios
    .get(`/bookings`)
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

const approveBookings = async (id) => {
  const response = apiManager.axios
    .patch(`/bookings/${id}/approve`, {})
    .then((response) => {
      return { status: 200, data: response.data };
    })
    .catch((err) => {
      return {
        status: err.response.status,
        message: err.response.message || "Error Approving Bookings",
      };
    });
  return response;
};

const deleteBookings = async (id) => {
  const response = apiManager.axios
    .delete(`/bookings/${id}`)
    .then((response) => {
      return { status: 200, data: response.data };
    })
    .catch((err) => {
      return {
        status: err.response.status,
        message: err.response.message || "Error Approving Bookings",
      };
    });
  return response;
};

export default {
  booking,
  listBookings,
  approveBookings,
  deleteBookings,
};
