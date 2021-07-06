import axios from "axios";
import API_TOKEN from "./auth0apiServerToken";

const isProduction = process.env.REACT_APP_ENV === "production";

const HTTP = (async () => {
  const TOKEN = await API_TOKEN;
  const router = axios.create({
    baseURL: isProduction
      ? "https://api.hedgeing.xyz/api"
      : "http://localhost:8080/api",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${TOKEN}`
    },
  });
  return router;
})();


export default HTTP
