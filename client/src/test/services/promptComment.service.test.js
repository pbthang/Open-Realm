import PromptCommentDataService from "../../services/promptComment.service";
import "./handlers";

it("Get all prompt comments", async () => {
  const response = await PromptCommentDataService.getAll();
  expect(response.status).toBe(200);
  expect(response.data.length).toBe(3);
});

it("Get prompt comment with id", async () => {
  const response = await PromptCommentDataService.get(1);
  expect(response.status).toBe(200);
  expect(response.data.id).toBe("1");
});

it("Create a prompt comment", async () => {
  const response = await PromptCommentDataService.create({
    user_id: "123",
    prompt_id: 1,
  });
  expect(response.status).toBe(201);
});

it("Update a prompt comment", async () => {
  const response = await PromptCommentDataService.update(1, {
    user_id: "123",
    prompt_id: 2,
  });
  expect(response.status).toBe(200);
  expect(response.data.id).toBe("1");
});

it("Delete a prompt comment", async () => {
  const response = await PromptCommentDataService.delete(1);
  expect(response.status).toBe(200);
  expect(response.data.id).toBe("1");
});

it("Get by prompt id", async () => {
  const response = await PromptCommentDataService.findByPost(1);
  expect(response.status).toBe(200);
});
