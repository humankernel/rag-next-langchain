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

// export const env = envSchema.parse(process.env)

export const env = envSchema.parse({
    PG_HOST: "127.0.0.1",
    PG_PORT: "5432",
    PG_USER: "postgres",
    PG_PASS: "1234",
    PG_DATABASE: "postgres",
    OLLAMA_URL: "http://127.0.0.1:11434",
    OLLAMA_MODEL: "llama2",
    DOCS_PATH: "docs"
}
)
