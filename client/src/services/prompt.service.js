import http from "../http-common";

class PromptDataService {
  getAll() {
    return http.get("/prompts");
  }

  get(id) {
    return http.get(`/prompts/${id}`);
  }

  create(data) {
    return http.post("/prompts", data);
  }

  update(id, data) {
    return http.put(`/prompts/${id}`, data);
  }

  delete(id) {
    return http.delete(`/prompts/${id}`);
  }

  findByTitle(title) {
    return http.get(`/prompts?title=${title}`);
  }
}

export default new PromptDataService();
