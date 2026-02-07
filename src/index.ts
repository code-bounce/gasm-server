import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { models } from "./models";

const app = new Elysia({ prefix: "/api" })
  .use(cors())
  .get("/", () => "Hello Elysia")
  .use(models)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
