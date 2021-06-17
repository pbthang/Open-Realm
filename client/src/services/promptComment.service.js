import http from "../http-common";

class PromptCommentDataService {
  getAll() {
    return http.get("/promptComments");
  }

  get(id) {
    return http.get(`/promptComments/${id}`);
  }

  create(data) {
    return http.post("/promptComments", data);
  }

  update(id, data) {
    return http.put(`/promptComments/${id}`, data);
  }

  delete(id) {
    return http.delete(`/promptComments/${id}`);
  }
}

export default new PromptCommentDataService();
