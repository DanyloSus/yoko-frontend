import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:8876/api/v1",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

export default axios;
