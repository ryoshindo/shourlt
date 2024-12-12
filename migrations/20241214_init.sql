CREATE TABLE "targets" (
    "id" TEXT PRIMARY KEY NOT NULL,
    "url" TEXT NOT NULL,
    "slug" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);
