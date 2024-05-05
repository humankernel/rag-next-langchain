import postgres from "postgres";
import { env } from "@/lib/env";

export const sql = postgres({
    host: env.PG_HOST,
    port: env.PG_PORT,
    user: env.PG_USER,
    pass: env.PG_PASS,
    database: env.PG_DATABASE
});
