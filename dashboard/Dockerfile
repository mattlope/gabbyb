FROM node:20-alpine

WORKDIR /app

# Install dependencies first (better caching)
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Copy application code
COPY . .

# Create data directory for SQLite persistence
# In Railway, mount a volume at /data to persist the database
RUN mkdir -p /data

ENV NODE_ENV=production
ENV DATA_DIR=/data

EXPOSE 3000

CMD ["node", "server.js"]
