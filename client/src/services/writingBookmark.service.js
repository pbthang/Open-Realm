import http from "../http-common";

class WritingBookmarkDataService {
  getAll() {
    return http.get("/writingBookmarks");
  }

  get(id) {
    return http.get(`/writingBookmarks/${id}`);
  }

  create(data) {
    return http.post("/writingBookmarks", data);
  }

  update(id, data) {
    return http.put(`/writingBookmarks/${id}`, data);
  }

  delete(id) {
    return http.delete(`/writingBookmarks/${id}`);
  }

  findByUserId(id) {
    return http.get(`/writingBookmarks?user_id=${id}`);
  }
}

export default new WritingBookmarkDataService();
