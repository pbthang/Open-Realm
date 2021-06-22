import PromptBookmarkDataService from "../../services/promptBookmark.service";
import { server } from "./handlers";

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

it("Get all prompt bookmarks", async () => {
  const response = await PromptBookmarkDataService.getAll();
  expect(response.status).toBe(200);
  expect(response.data.length).toBe(3);
});

it("Get prompt bookmark with id", async () => {
  const response = await PromptBookmarkDataService.get(1);
  expect(response.status).toBe(200);
  expect(response.data.id).toBe("1");
});

it("Create a prompt bookmark", async () => {
  const response = await PromptBookmarkDataService.create({
    user_id: "123",
    prompt_id: 1,
  });
  expect(response.status).toBe(201);
});

it("Update a prompt bookmark", async () => {
  const response = await PromptBookmarkDataService.update(1, {
    user_id: "123",
    prompt_id: 2,
  });
  expect(response.status).toBe(200);
  expect(response.data.id).toBe("1");
});

it("Delete a prompt bookmark", async () => {
  const response = await PromptBookmarkDataService.delete(1);
  expect(response.status).toBe(200);
  expect(response.data.id).toBe("1");
});

it("Get prompt bookmark with user_id", async () => {
  const response = await PromptBookmarkDataService.findByUserId(1);
  expect(response.status).toBe(200);
});

it("Delete prompt bookmark by user_id and prompt_id", async () => {
  const response = await PromptBookmarkDataService.deleteByUserAndPrompt(
    "1",
    1
  );
  expect(response.status).toBe(200);
});
