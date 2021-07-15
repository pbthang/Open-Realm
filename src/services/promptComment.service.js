import HTTP from "../api/http-common";

class PromptCommentDataService {
  async getAll() {
    const http = await HTTP;
    const res = await http.get("/promptComments");
    return res;
  }

  async get(id) {
    const http = await HTTP;
    const res = await http.get(`/promptComments/${id}`);
    return res;
  }

  async create(data) {
    const http = await HTTP;
    const res = await http.post("/promptComments", data);
    return res;
  }

  async update(id, data) {
    const http = await HTTP;
    const res = await http.put(`/promptComments/${id}`, data);
    return res;
  }

  async delete(id) {
    const http = await HTTP;
    const res = await http.delete(`/promptComments/${id}`);
    return res;
  }

  async findByPost(postID) {
    const http = await HTTP;
    const res = await http.get(`/promptComments?post_id=${postID}`);
    return res;
  }
}

export default new PromptCommentDataService();
