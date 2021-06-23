/**
 * @jest-environment node
 */

import UserDataService from "../../services/user.service";
import ACCESS_TOKEN from "../../auth0MgmtAPIToken";
import "./handlers";

it("Get access token", async () => {
  const TOKEN = await ACCESS_TOKEN;
  expect(TOKEN).toBeTruthy();
});

it("Get all users", async () => {
  const response = await UserDataService.getAll();
  expect(response.status).toBe(200);
});

it("Get user by id", async () => {
  const response = await UserDataService.get("1");
  expect(response.status).toBe(200);
});
