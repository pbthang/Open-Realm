import WritingCommentDataService from "../../services/writingComment.service";

it("Get all writing comments", async () => {
  const response = await WritingCommentDataService.getAll();
  expect(response.status).toBe(200);
  expect(response.data.length).toBe(3);
});

it("Get writing comment with id", async () => {
  const response = await WritingCommentDataService.get(1);
  expect(response.status).toBe(200);
  expect(response.data.id).toBe("1");
});

it("Create a writing comment", async () => {
  const response = await WritingCommentDataService.create({
    user_id: "123",
    writing_id: 1,
  });
  expect(response.status).toBe(201);
});

it("Update a writing comment", async () => {
  const response = await WritingCommentDataService.update(1, {
    user_id: "123",
    writing_id: 2,
  });
  expect(response.status).toBe(200);
  expect(response.data.id).toBe("1");
});

it("Delete a writing comment", async () => {
  const response = await WritingCommentDataService.delete(1);
  expect(response.status).toBe(200);
  expect(response.data.id).toBe("1");
});

it("Get by prompt id", async () => {
  const response = await WritingCommentDataService.findByPost(1);
  expect(response.status).toBe(200);
});
