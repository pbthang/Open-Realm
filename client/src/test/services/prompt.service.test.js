import PromptDataService from "../../services/prompt.service";
import { server } from "./handlers";

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

it("Get all prompts", async () => {
  const response = await PromptDataService.getAll("AAA");
  expect(response.status).toBe(200);
  expect(response.data.length).toBe(3);
});

it("Get prompt with id", async () => {
  const response = await PromptDataService.get(1);
  expect(response.status).toBe(200);
  expect(response.data.id).toBe("1");
});

it("Get prompt with query params", async () => {
  const titleResponse = await PromptDataService.findByTitle("Lorem Ipsum");
  const authorIdResponse = await PromptDataService.findByAuthorId("123");
  expect(titleResponse.status).toBe(200);
  expect(titleResponse.data.length).toBe(3);
  expect(authorIdResponse.status).toBe(200);
  expect(authorIdResponse.data.length).toBe(3);
});

it("Create a prompt", async () => {
  const response = await PromptDataService.create({
    title: "Title",
    content: "Content",
  });
  expect(response.status).toBe(201);
});

it("Update a prompt", async () => {
  const response = await PromptDataService.update(1, {
    content: "New content",
  });
  expect(response.status).toBe(200);
  expect(response.data.id).toBe("1");
});

it("Delete a prompt", async () => {
  const response = await PromptDataService.delete(1);
  expect(response.status).toBe(200);
  expect(response.data.id).toBe("1");
});
