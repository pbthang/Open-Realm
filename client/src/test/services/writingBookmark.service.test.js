import WritingBookmarkDataService from "../../services/writingBookmark.service";

it("Get all writing bookmarks", async () => {
  const response = await WritingBookmarkDataService.getAll();
  expect(response.status).toBe(200);
  expect(response.data.length).toBe(3);
});

it("Get writing bookmark with id", async () => {
  const response = await WritingBookmarkDataService.get(1);
  expect(response.status).toBe(200);
  expect(response.data.id).toBe("1");
});

it("Create a writing bookmark", async () => {
  const response = await WritingBookmarkDataService.create({
    user_id: "123",
    writing_id: 1,
  });
  expect(response.status).toBe(201);
});

it("Update a writing bookmark", async () => {
  const response = await WritingBookmarkDataService.update(1, {
    user_id: "123",
    writing_id: 2,
  });
  expect(response.status).toBe(200);
  expect(response.data.id).toBe("1");
});

it("Delete a writing bookmark", async () => {
  const response = await WritingBookmarkDataService.delete(1);
  expect(response.status).toBe(200);
  expect(response.data.id).toBe("1");
});

it("Get writing bookmark with user_id", async () => {
  const response = await WritingBookmarkDataService.findByUserId(1);
  expect(response.status).toBe(200);
});

it("Delete prompt bookmark by user_id and prompt_id", async () => {
  const response = await WritingBookmarkDataService.deleteByUserAndWriting(
    "1",
    1
  );
  expect(response.status).toBe(200);
});
