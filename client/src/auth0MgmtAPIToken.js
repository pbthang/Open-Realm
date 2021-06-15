import axios from "axios";

const ACCESS_TOKEN = (async () => {
  const TOKEN = await axios.post(
    "https://dev-d1rzgdpx.jp.auth0.com/oauth/token",
    {
      client_id: "BAhbwdqvE0H4AJsipKsGbd8oJnsKXujZ",
      client_secret:
        "xtdHTnZzQERByW4wmxM0lVnp1ns9oSa-NZSv2E35_93UQg9zxw3yzHCIkaHwt8QH",
      audience: "https://dev-d1rzgdpx.jp.auth0.com/api/v2/",
      grant_type: "client_credentials",
    }
  );
  console.log(TOKEN.data.access_token);
  return TOKEN.data.access_token;
})();

export default ACCESS_TOKEN;
