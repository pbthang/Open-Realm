import axios from "axios";

const API_TOKEN = (async () => {
  try {
    const TOKEN = await axios.post(
      "https://dev-d1rzgdpx.jp.auth0.com/oauth/token",
      {
        client_id: "aRMCF2DqGDJAuWdrIoDrPj510devAf0y",
        client_secret: "LzHIjU3JGxO4hPJjQ2pH6EBoqcyBSt_TeiS-YIzJvfHjuGtzQjyx3C0NI7PVpBJv",
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
