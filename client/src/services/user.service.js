import axios from "axios";
import ACCESS_TOKEN from "../auth0MgmtAPIToken";

class UserDataService {
  async getAll() {
    const response = await axios.request({
      method: "GET",
      url: "https://dev-d1rzgdpx.jp.auth0.com/api/v2/users",
      params: { search_engine: "v3" },
      headers: {
        authorization: `Bearer ${await ACCESS_TOKEN}`,
      },
    });
    return response;
  }

  async get(id) {
    const response = await axios.request({
      method: "GET",
      url: `https://dev-d1rzgdpx.jp.auth0.com/api/v2/users/${id}`,
      headers: {
        authorization: `Bearer ${await ACCESS_TOKEN}`,
      },
    });
    console.log(response.data);
    return response;
  }

  async patch(id, data) {
    // return http.put(`/books/${id}`, data);
    const response = await axios.patch(
      `https://dev-d1rzgdpx.jp.auth0.com/api/v2/users/${id}`,
      data,
      {
        authorization: `Bearer ${await ACCESS_TOKEN}`,
      }
    );
    return response;
  }
}

export default new UserDataService();
