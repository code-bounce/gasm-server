import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { models } from "./models";

export default new Elysia({ prefix: "/api" })
  .use(cors())
  .get("/", () => "Hello Elysia")
  .use(models)
  .listen(3000);
