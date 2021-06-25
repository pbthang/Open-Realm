import { render, screen } from "@testing-library/react";
import App from "./App";
import puppeteer from "puppeteer";

it("renders Open Realm text", () => {
  render(<App />);
  const linkElement = screen.getByText(/Open Realm/i);
  expect(linkElement).toBeInTheDocument();
});

let browser;

it("Login with valid credentials", async () => {
  browser = await puppeteer.launch({ headless: false, slowMo: 10 });
  const page = await browser.newPage();
  await page.goto("http:localhost:3000/home");
  await page.type("#username", "openrealmtest01@gmail.com");
  await page.type("#password", "Openrealm123");
  await page.click("button[name='action']");
  page.close();
}, 10000);

xit("Navigate through pages", async () => {
  const page = await browser.newPage();
  await page.goto("http:localhost:3000/home");

  await page.waitForSelector("a#homeNav");
  await page.click("a#homeNav");
  await page.waitForSelector("#homePostContainer");
  const numberOfPosts = await page.$eval(
    "#homePostContainer",
    (el) => el.children.length
  );
  expect(numberOfPosts).toBeGreaterThan(0);

  await page.waitForSelector("a#profileNav");
  await page.click("a#profileNav");
  await page.waitForSelector("#profileName", { visible: true });
  await page.waitForSelector("#profileUsername", { visible: true });
  await page.waitForSelector("#profileEmail", { visible: true });

  await page.waitForSelector("a#createNav");
  await page.click("a#createNav");

  await page.waitForSelector("a#bookmarkedNav");
  await page.click("a#bookmarkedNav");

  await page.waitForSelector("a#aboutNav");
  await page.click("a#aboutNav");
  page.close();
  browser.close();
}, 30000);
