# 📃 RAG - Next + Langchain

This is a RAG app. In other words a chatbot with a local modal that response using your documents an only your documents

<video controls src="screenshots/output.mp4" title="Title"></video>

## Getting Started

### Start Ollama

```sh
# create the model
ollama create <name> -f '.\Modelfile - Llama2'


# the machine that runs ollama have to set this env variables
OLLAMA_HOST  =  0.0.0.0
OLLAMA_ORIGINS = *
OLLAMA_KEEP_ALIVE = 30

# run ollama
ollama serve
```

### Start Postgres (pg-vector)

```sh
# download pv-vector (w/ vpn)
docker pull ankane/pgvector:latest

# move to project folder
docker compose up -d
```

### Start webpage

```sh
pnpm dev

# or
pnpm dev --turbo

# or
npx next dev --turbo
```
