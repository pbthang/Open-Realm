import { rest } from "msw";
import { setupServer } from "msw/node";

const promptHandlers = [
  rest.get("http://localhost:8080/api/prompts", (req, res, ctx) => {
    // const { title } = req.url.searchParams.get("title");
    return res(ctx.status(200), ctx.json([{ id: 1 }, { id: 2 }, { id: 3 }]));
  }),
  rest.get("http://localhost:8080/api/prompts/:id", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: req.params.id }));
  }),
  rest.post("http://localhost:8080/api/prompts", (req, res, ctx) => {
    return res(ctx.status(201));
  }),
  rest.put("http://localhost:8080/api/prompts/:id", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: req.params.id }));
  }),
  rest.delete("http://localhost:8080/api/prompts/:id", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: req.params.id }));
  }),
];

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

export const handlers = [
  ...promptHandlers,
  ...writingHandlers,
  ...promptBookmarkHandlers,
  ...writingBookmarkHandlers,
  ...promptCommentHandlers,
  ...writingCommentHandlers,
];

export const server = setupServer(...handlers);
