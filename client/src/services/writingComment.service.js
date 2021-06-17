import http from "../http-common";

class WritingCommentDataService {
  getAll() {
    return http.get("/writingComments");
  }

  get(id) {
    return http.get(`/writingComments/${id}`);
  }

  create(data) {
    return http.post("/writingComments", data);
  }

  update(id, data) {
    return http.put(`/writingComments/${id}`, data);
  }

  delete(id) {
    return http.delete(`/writingComments/${id}`);
  }

  findByTitle(title) {
    return http.get(`/writingComments?title=${title}`);
  }
}

export default new WritingCommentDataService();
