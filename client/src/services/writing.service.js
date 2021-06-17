import http from "../http-common";

class WritingDataService {
  getAll() {
    return http.get("/writings");
  }

  get(id) {
    return http.get(`/writings/${id}`);
  }

  create(data) {
    return http.post("/writings", data);
  }

  update(id, data) {
    return http.put(`/writings/${id}`, data);
  }

  delete(id) {
    return http.delete(`/writings/${id}`);
  }

  findByTitle(title) {
    return http.get(`/writings?title=${title}`);
  }
}

export default new WritingDataService();
