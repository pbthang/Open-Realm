import axios from "axios";
import ACCESS_TOKEN from "../auth0MgmtAPIToken";

class UserDataService {
  async getAll() {
    const TOKEN = await ACCESS_TOKEN;
    const response = await axios.request({
      method: "GET",
      url: "https://dev-d1rzgdpx.jp.auth0.com/api/v2/users",
      params: { search_engine: "v3" },
      headers: {
        authorization: `Bearer ${TOKEN}`,
      },
    });
    return response;
  }

  async get(id) {
    const TOKEN = await ACCESS_TOKEN;
    const response = await axios.request({
      method: "GET",
      url: `https://dev-d1rzgdpx.jp.auth0.com/api/v2/users/${id}`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return response;
  }

  async patch(id, data) {
    const TOKEN = await ACCESS_TOKEN;
    const response = await axios.patch(
      `https://dev-d1rzgdpx.jp.auth0.com/api/v2/users/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    return response;
  }

  async resendEmail(user_id) {
    const TOKEN = await ACCESS_TOKEN;
    const response = await axios.post(
      "https://dev-d1rzgdpx.jp.auth0.com/api/v2/jobs/verification-email",
      {
        user_id,
        client_id: process.env.REACT_APP_MGMT_API_CLIENT_ID,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    return response;
  }
}

export default new UserDataService();
