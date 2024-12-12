import { Hono } from "hono";
import { env } from "hono/adapter";
import { handle } from "hono/vercel";
import { createTarget, findTargetBySlug } from "./db";

export const config = {
  runtime: "edge",
};

const app = new Hono();

app.post("/api/targets", async (c) => {
  try {
    const body = await c.req.json();

    const url = body["url"] as string;

    if (!url) {
      return c.json(
        {
          message: "url is required",
        },
        400
      );
    }

    const result = await createTarget(url);

    const { SHOURLT_URL } = env<{ SHOURLT_URL: string }>(c);

    return c.json(
      {
        origin: `${SHOURLT_URL}/${result["slug"]}`,
      },
      201
    );
  } catch (e) {
    console.error(e);
    return c.json(
      {
        message: "internal server error",
      },
      500
    );
  }
});

app.get("/:slug", async (c) => {
  const slug = c.req.param("slug");
  const result = await findTargetBySlug(slug);

  return c.redirect(result.url);
});

export default handle(app);
