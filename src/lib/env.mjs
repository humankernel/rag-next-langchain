import { z } from "zod";

const envSchema = z.object({
    PG_HOST: z.string().ip().min(1),
    PG_PORT: z.coerce.number().min(1),
    PG_USER: z.string().min(1),
    PG_PASS: z.string().min(1),
    PG_DATABASE: z.string().min(1),
    OLLAMA_URL: z.string().url().min(1),
    OLLAMA_MODEL: z.string().min(1),
    DOCS_PATH: z.string().trim().min(1),
});

export const env = envSchema.parse(process.env)

