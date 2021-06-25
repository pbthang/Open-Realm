import axios from "axios";

const isDevelopment = process.env.REACT_APP_ENV === "development";

export default axios.create({
  baseURL: isDevelopment ? "http://localhost:8080/api" : "https://openrealmapi.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
  },
});
