import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";

export default axios.create({
  baseURL: isProduction ? "https://openrealmapi.herokuapp.com/api" : "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
  },
});
