import http from "../http-common";

class ChapterDataService {
  getAll() {
    return http.get("/chapters");
  }

  get(id) {
    return http.get(`/chapters/${id}`);
  }

  create(data) {
    return http.post("/chapters", data);
  }

  update(id, data) {
    return http.put(`/chapters/${id}`, data);
  }

  delete(id) {
    return http.delete(`/chapters/${id}`);
  }

  findByTitle(title) {
    return http.get(`/chapters?title=${title}`);
  }
}

export default new ChapterDataService();
