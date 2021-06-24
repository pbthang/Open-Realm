import axios from "axios";

export default axios.create({
  baseURL: "https://openrealmapi.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
  },
});
