import axios from "axios";

const API_TOKEN = (async () => {
  try {
    const TOKEN = await axios.post(
      "https://dev-d1rzgdpx.jp.auth0.com/oauth/token",
      {
        client_id: process.env.REACT_APP_API_CLIENT_ID,
        client_secret: process.env.REACT_APP_API_SECRET,
        audience: "https://api.hedgeing.xyz",
        grant_type: "client_credentials"
      }
    );
    return TOKEN.data.access_token;
  } catch (err) {
    console.error(err);
  }
})();

export default API_TOKEN;
