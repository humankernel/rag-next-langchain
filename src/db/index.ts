import { env } from "../env";
import pg from "pg";

export const sql = new pg.Pool({
	host: env.PG_HOST,
	port: env.PG_PORT,
	user: env.PG_USER,
	password: env.PG_PASS,
	database: env.PG_DATABASE,
});
