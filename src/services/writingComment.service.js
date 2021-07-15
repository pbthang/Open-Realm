import HTTP from "../api/http-common";

class WritingCommentDataService {
  async getAll() {
    const http = await HTTP;
    return await http.get("/writingComments");
  }

  async get(id) {
    const http = await HTTP;
    return await http.get(`/writingComments/${id}`);
  }

  async create(data) {
    const http = await HTTP;
    return await http.post("/writingComments", data);
  }

  async update(id, data) {
    const http = await HTTP;
    return await http.put(`/writingComments/${id}`, data);
  }

  async delete(id) {
    const http = await HTTP;
    return await http.delete(`/writingComments/${id}`);
  }

  async findByPost(postID) {
    const http = await HTTP;
    return await http.get(`/writingComments?post_id=${postID}`);
  }
}

export default new WritingCommentDataService();
