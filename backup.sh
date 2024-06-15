#!/bin/bash

# Variables
SOURCE_DIR="./db"
DEST_DIR="/mnt/d/backup"
LOG_FILE="/mnt/d/backup/backup.log"
DATE=$(date +'%Y-%m-%d')

# Crear la carpeta de destino si no existe
mkdir -p "$DEST_DIR"

# Realizar el backup incremental
rsync -av --delete "$SOURCE_DIR" "$DEST_DIR" >> "$LOG_FILE" 2>&1

# Registrar el resultado
echo "Backup completado el $DATE" >> "$LOG_FILE"
