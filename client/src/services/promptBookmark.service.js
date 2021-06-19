import http from "../http-common";

class PromptBookmarkDataService {
  getAll() {
    return http.get("/promptBookmarks");
  }

  get(id) {
    return http.get(`/promptBookmarks/${id}`);
  }

  create(data) {
    return http.post("/promptBookmarks", data);
  }

  update(id, data) {
    return http.put(`/promptBookmarks/${id}`, data);
  }

  delete(id) {
    return http.delete(`/promptBookmarks/${id}`);
  }

  findByUserId(id) {
    return http.get(`/promptBookmarks?user_id=${id}`);
  }

  delete(user_id, prompt_id) {
    const promptBookmarkId = http.get(`/promptBookmarks?user_id=${user_id}&prompt_id=${prompt_id}`).id;
    return delete(promptBookmarkId);
  }
}

export default new PromptBookmarkDataService();
