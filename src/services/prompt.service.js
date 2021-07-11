import HTTP from "../http-common";

class PromptDataService {
  async getAll() {
    const http = await HTTP;
    const response = await http.get("/prompts");
    return response;
  }

  async get(id) {
    const http = await HTTP;
    const response = await http.get(`/prompts/${id}`);
    return response;
  }

  async create(data) {
    const http = await HTTP;
    const response = await http.post("/prompts", data);
    return response;
  }

  async update(id, data) {
    const http = await HTTP;
    const response = await http.put(`/prompts/${id}`, data);
    return response;
  }

  async delete(id) {
    const http = await HTTP;
    const response = await http.delete(`/prompts/${id}`);
    return response;
  }

  async findByTitle(title) {
    const http = await HTTP;
    const response = await http.get(`/prompts?title=${title}`);
    return response;
  }

  async search(string) {
    const http = await HTTP;
    const response = await http.get(`/prompts?q=${string}`);
    return response;
  }

  async findByAuthorId(id) {
    const http = await HTTP;
    const response = await http.get(`/prompts?author_id=${id}`);
    return response;
  }
}

export default new PromptDataService();
