import HTTP from "../api/http-common";

class PromptBookmarkDataService {
  async getAll() {
    const http = await HTTP;
    const res = await http.get("/promptBookmarks");
    return res;
  }

  async get(id) {
    const http = await HTTP;
    const res = await http.get(`/promptBookmarks/${id}`);
    return res;
  }

  async create(data) {
    const http = await HTTP;
    const res = await http.post("/promptBookmarks", data);
    return res;
  }

  async update(id, data) {
    const http = await HTTP;
    const res = await http.put(`/promptBookmarks/${id}`, data);
    return res;
  }

  async delete(id) {
    const http = await HTTP;
    const res = await http.delete(`/promptBookmarks/${id}`);
    return res;
  }

  async findByUserId(id) {
    const http = await HTTP;
    const res = await http.get(
      `/promptBookmarks/getbyuser/getprompts?user_id=${id}`
    );
    return res;
  }

  async deleteByUserAndPrompt(user_id, prompt_id) {
    const http = await HTTP;
    const res = await http.delete(
      `/promptBookmarks?user_id=${user_id}&prompt_id=${prompt_id}`
    );
    return res;
  }
}

export default new PromptBookmarkDataService();
