import HTTP from "../http-common";

class WritingDataService {
  async getAll() {
    const http = await HTTP;
    const res = await http.get("/writings");
    return res;
  }

  async get(id) {
    const http = await HTTP;
    const res = await http.get(`/writings/${id}`);
    return res;
  }

  async create(data) {
    const http = await HTTP;
    const res = await http.post("/writings", data);
    return res;
  }

  async update(id, data) {
    const http = await HTTP;
    const res = await http.put(`/writings/${id}`, data);
    return res;
  }

  async delete(id) {
    const http = await HTTP;
    const res = await http.delete(`/writings/${id}`);
    return res;
  }

  async findByTitle(title) {
    const http = await HTTP;
    const res = await http.get(`/writings?title=${title}`);
    return res;
  }

  async search(string) {
    const http = await HTTP;
    const response = await http.get(`/writings?q=${string}`);
    return response;
  }

  async findByAuthorId(id) {
    const http = await HTTP;
    const res = await http.get(`/writings?author_id=${id}`);
    return res;
  }

  async findByPromptId(id) {
    const http = await HTTP;
    const res = await http.get(`/writings?prompt_id=${id}`);
    return res;
  }

  async getPrompt(writingId) {
    const http = await HTTP;
    const response = await this.get(writingId);
    return await http.get(`/prompts/${response.data.prompt_id}`);
  }
}

export default new WritingDataService();
