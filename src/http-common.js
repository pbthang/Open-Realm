import axios from "axios";

const isProduction = process.env.REACT_APP_ENV === "production";

export default axios.create({
  baseURL: isProduction
    ? "https://api.hedgeing.xyz/api"
    : "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
  },
});
