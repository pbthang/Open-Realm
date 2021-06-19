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

  findByAuthorId(id) {
    return http.get(`/writings?author_id=${id}`);
  }

  findByPromptId(id) {
    return http.get(`/writings?prompt_id=${id}`);
  }

  getPrompt(writingId) {
    const promptId = this.get(writingId).prompt_id;
    return http.get(`/prompts/${promptId}`);
  }
}

export default new WritingDataService();
