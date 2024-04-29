import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.BASE_BACKEND_URL,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

export default axios;
