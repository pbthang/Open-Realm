import HTTP from "../http-common";

class WritingBookmarkDataService {
  async getAll() {
    const http = await HTTP;
    return await http.get("/writingBookmarks");
  }

  async get(id) {
    const http = await HTTP;
    return await http.get(`/writingBookmarks/${id}`);
  }

  async create(data) {
    const http = await HTTP;
    return await http.post("/writingBookmarks", data);
  }

  async update(id, data) {
    const http = await HTTP;
    return await http.put(`/writingBookmarks/${id}`, data);
  }

  async delete(id) {
    const http = await HTTP;
    return await http.delete(`/writingBookmarks/${id}`);
  }

  async findByUserId(id) {
    const http = await HTTP;
    return await http.get(`/writingBookmarks/getbyuser/getwritings?user_id=${id}`);
  }

  async deleteByUserAndWriting(user_id, writing_id) {
    const http = await HTTP;
    return await http.delete(
      `/writingBookmarks?user_id=${user_id}&writing_id=${writing_id}`
    );
  }
}

export default new WritingBookmarkDataService();
