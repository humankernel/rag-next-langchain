
# TODO

- [x] change UI
- [ ] Tests
- [ ] fix prepare-docs
- [ ] dockerize
- [ ] accesibility


# Getting Started

## Start Ollama

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

## Start Postgres (pg-vector)

```sh
# download pv-vector (w/ vpn)
docker pull ankane/pgvector:latest

# move to project folder
docker compose up -d
```

## Start webpage

```sh
pnpm dev

# or
pnpm dev --turbo

# or
npx next dev --turbo
```