import WritingDataService from "../../services/writing.service";
import { server } from "./handlers";

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

it("Get all writings", async () => {
  const response = await WritingDataService.getAll("AAA");
  expect(response.status).toBe(200);
  expect(response.data.length).toBe(3);
});

it("Get writing with id", async () => {
  const response = await WritingDataService.get(1);
  expect(response.status).toBe(200);
  expect(response.data.id).toBe("1");
});

it("Get writing with query params", async () => {
  const titleResponse = await WritingDataService.findByTitle("Lorem Ipsum");
  const authorIdResponse = await WritingDataService.findByAuthorId("123");
  const promptIdResponse = await WritingDataService.findByAuthorId(2);
  expect(titleResponse.status).toBe(200);
  expect(titleResponse.data.length).toBe(3);
  expect(authorIdResponse.status).toBe(200);
  expect(authorIdResponse.data.length).toBe(3);
  expect(promptIdResponse.status).toBe(200);
  expect(promptIdResponse.data.length).toBe(3);
});

it("Create a writing", async () => {
  const response = await WritingDataService.create({
    title: "Title",
    content: "Content",
  });
  expect(response.status).toBe(201);
});

it("Update a writing", async () => {
  const response = await WritingDataService.update(1, {
    content: "New content",
  });
  expect(response.status).toBe(200);
  expect(response.data.id).toBe("1");
});

it("Delete a writing", async () => {
  const response = await WritingDataService.delete(1);
  expect(response.status).toBe(200);
  expect(response.data.id).toBe("1");
});

it("Get the prompt of a writing", async () => {
  const response = await WritingDataService.getPrompt(1);
  expect(response.status).toBe(200);
  expect(response.data.id).toBe("3");
});
