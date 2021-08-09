import axios from "axios";

const instance = axios.create({
  headers: { "X-Requested-With": "XMLHttpRequest" },
  timeout: 2000,
});

export default instance;
