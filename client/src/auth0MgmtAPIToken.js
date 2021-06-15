import axios from "axios";

const ACCESS_TOKEN = (async () => {
  const TOKEN = await axios.post(
    "https://dev-d1rzgdpx.jp.auth0.com/oauth/token",
    {
      client_id: process.env.REACT_APP_MGMT_API_CLIENT_ID,
      client_secret: process.env.REACT_APP_MGMT_API_CLIENT_SECRET,
      audience: "https://dev-d1rzgdpx.jp.auth0.com/api/v2/",
      grant_type: "client_credentials",
    }
  );
  return TOKEN.data.access_token;
})();

export default ACCESS_TOKEN;
