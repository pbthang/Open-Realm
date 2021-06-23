import { rest } from "msw";
import { setupServer } from "msw/node";

// PROMPT HANDLERS
const promptHandlers = [
  rest.get("http://localhost:8080/api/prompts", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          title: "title one",
          author_id: "1",
          content: "content one",
          numberOfBookmarks: 0,
          createdAt: "2021-06-21T11:28:08.404Z",
        },
        {
          id: 2,
          title: "title two",
          author_id: "2",
          content: "content two",
          numberOfBookmarks: 0,
          createdAt: "2021-06-21T11:28:08.404Z",
        },
        {
          id: 3,
          title: "title three",
          author_id: "3",
          content: "content three",
          numberOfBookmarks: 0,
          createdAt: "2021-06-21T11:28:08.404Z",
        },
      ])
    );
  }),
  rest.get("http://localhost:8080/api/prompts/:id", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: req.params.id,
        title: "title",
        author_id: "1",
        content: "content",
        numberOfBookmarks: 0,
        createdAt: "2021-06-21T11:28:08.404Z",
      })
    );
  }),
  rest.post("http://localhost:8080/api/prompts", (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(req.body));
  }),
  rest.put("http://localhost:8080/api/prompts/:id", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: req.params.id, ...req.body }));
  }),
  rest.delete("http://localhost:8080/api/prompts/:id", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: req.params.id }));
  }),
];

// WRITING HANDLERS
const writingHandlers = [
  rest.get("http://localhost:8080/api/writings", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([{ id: 1 }, { id: 2 }, { id: 3 }]));
  }),
  rest.get("http://localhost:8080/api/writings/:id", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: req.params.id, prompt_id: 3 }));
  }),
  rest.post("http://localhost:8080/api/writings", (req, res, ctx) => {
    return res(ctx.status(201));
  }),
  rest.put("http://localhost:8080/api/writings/:id", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: req.params.id }));
  }),
  rest.delete("http://localhost:8080/api/writings/:id", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: req.params.id }));
  }),
];

//PROMPT BOOKMARK HANDLERS
const promptBookmarkHandlers = [
  rest.get("http://localhost:8080/api/promptBookmarks", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([{ id: 1 }, { id: 2 }, { id: 3 }]));
  }),
  rest.get("http://localhost:8080/api/promptBookmarks/:id", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: req.params.id, prompt_id: 3 }));
  }),
  rest.post("http://localhost:8080/api/promptBookmarks", (req, res, ctx) => {
    return res(ctx.status(201));
  }),
  rest.put("http://localhost:8080/api/promptBookmarks/:id", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: req.params.id }));
  }),
  rest.delete(
    "http://localhost:8080/api/promptBookmarks/:id",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ id: req.params.id }));
    }
  ),
  rest.get(
    "http://localhost:8080/api/promptBookmarks/getbyuser/getprompts",
    (req, res, ctx) => {
      if (req.url.searchParams.has("user_id")) {
        return res(
          ctx.status(200),
          ctx.json([{ id: 1 }, { id: 2 }, { id: 3 }])
        );
      } else {
        return res(ctx.status(400));
      }
    }
  ),
  rest.delete("http://localhost:8080/api/promptBookmarks/", (req, res, ctx) => {
    if (
      req.url.searchParams.has("user_id") &&
      req.url.searchParams.has("prompt_id")
    ) {
      return res(ctx.status(200), ctx.json({ id: req.params.id }));
    } else {
      return res(ctx.status(400));
    }
  }),
];

// WRITING BOOKMARK HANDLERS
const writingBookmarkHandlers = [
  rest.get("http://localhost:8080/api/writingBookmarks", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([{ id: 1 }, { id: 2 }, { id: 3 }]));
  }),
  rest.get(
    "http://localhost:8080/api/writingBookmarks/:id",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ id: req.params.id, prompt_id: 3 })
      );
    }
  ),
  rest.post("http://localhost:8080/api/writingBookmarks", (req, res, ctx) => {
    return res(ctx.status(201));
  }),
  rest.put(
    "http://localhost:8080/api/writingBookmarks/:id",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ id: req.params.id }));
    }
  ),
  rest.delete(
    "http://localhost:8080/api/writingBookmarks/:id",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ id: req.params.id }));
    }
  ),
  rest.get(
    "http://localhost:8080/api/writingBookmarks/getbyuser/getwritings",
    (req, res, ctx) => {
      if (req.url.searchParams.has("user_id")) {
        return res(
          ctx.status(200),
          ctx.json([{ id: 1 }, { id: 2 }, { id: 3 }])
        );
      } else {
        return res(ctx.status(400));
      }
    }
  ),
  rest.delete(
    "http://localhost:8080/api/writingBookmarks/",
    (req, res, ctx) => {
      if (
        req.url.searchParams.has("user_id") &&
        req.url.searchParams.has("writing_id")
      ) {
        return res(ctx.status(200), ctx.json({ id: req.params.id }));
      } else {
        return res(ctx.status(400));
      }
    }
  ),
];

// PROMPT COMMENT HANDLERS
const promptCommentHandlers = [
  rest.get("http://localhost:8080/api/promptComments", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([{ id: 1 }, { id: 2 }, { id: 3 }]));
  }),
  rest.get("http://localhost:8080/api/promptComments/:id", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: req.params.id, prompt_id: 3 }));
  }),
  rest.post("http://localhost:8080/api/promptComments", (req, res, ctx) => {
    return res(ctx.status(201));
  }),
  rest.put("http://localhost:8080/api/promptComments/:id", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: req.params.id }));
  }),
  rest.delete(
    "http://localhost:8080/api/promptComments/:id",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ id: req.params.id }));
    }
  ),
];

// WRITING COMMENT HANDLERS
const writingCommentHandlers = [
  rest.get("http://localhost:8080/api/writingComments", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([{ id: 1 }, { id: 2 }, { id: 3 }]));
  }),
  rest.get("http://localhost:8080/api/writingComments/:id", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: req.params.id, prompt_id: 3 }));
  }),
  rest.post("http://localhost:8080/api/writingComments", (req, res, ctx) => {
    return res(ctx.status(201));
  }),
  rest.put("http://localhost:8080/api/writingComments/:id", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: req.params.id }));
  }),
  rest.delete(
    "http://localhost:8080/api/writingComments/:id",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ id: req.params.id }));
    }
  ),
];

const userHandler = [
  rest.post(
    "https://dev-d1rzgdpx.jp.auth0.com/oauth/token",
    (req, res, ctx) => {
      if (
        req.body.client_id &&
        req.body.client_secret &&
        req.body.audience &&
        req.body.grant_type
      ) {
        return res(
          ctx.status(201),
          ctx.json({ token_type: "Bearer", access_token: "secret_token" })
        );
      } else {
        return res(ctx.status(400));
      }
    }
  ),
  rest.get(
    "https://dev-d1rzgdpx.jp.auth0.com/api/v2/users",
    (req, res, ctx) => {
      if (req.headers.has("authorization")) {
        return res(
          ctx.status(200),
          ctx.json([{ id: 1 }, { id: 2 }, { id: 3 }])
        );
      } else {
        return res(ctx.status(401));
      }
    }
  ),
  rest.get(
    "https://dev-d1rzgdpx.jp.auth0.com/api/v2/users/:id",
    (req, res, ctx) => {
      if (req.headers.has("authorization")) {
        return res(
          ctx.status(200),
          ctx.json({
            id: req.params.id,
            email: "email@gmail.com",
            name: "John Doe",
            picture: "https://via.placeholder.com/150",
          })
        );
      }
    }
  ),
];

export const handlers = [
  ...promptHandlers,
  ...writingHandlers,
  ...promptBookmarkHandlers,
  ...writingBookmarkHandlers,
  ...promptCommentHandlers,
  ...writingCommentHandlers,
  ...userHandler,
];

const server = setupServer(...handlers);

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

export { server };
