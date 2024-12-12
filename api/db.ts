import { sql } from "@vercel/postgres";

export const createTarget = async (url: string) => {
  const { rows } =
    await sql`INSERT INTO targets (id, slug, url) VALUES (${Math.random()
      .toString(36)
      .substring(7)}, ${Math.random()
      .toString(36)
      .substring(7)}, ${url}) RETURNING *`;

  return rows[0];
};

export const findTargetBySlug = async (slug: string) => {
  if (!slug.match(/^[a-zA-Z0-9]+$/)) {
    throw new Error("Invalid slug");
  }

  const { rows } = await sql`SELECT * FROM targets WHERE slug = ${slug}`;

  return rows[0];
};
