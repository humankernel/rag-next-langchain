import { Pool } from "pg"
import { env } from "@/lib/env";

export const sql = new Pool({
    host: env.PG_HOST,
    port: env.PG_PORT,
    user: env.PG_USER,
    password: env.PG_PASS,
    database: env.PG_DATABASE
});
