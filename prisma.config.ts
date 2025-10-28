import 'dotenv/config';           // ← loads your .env
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: env('DATABASE_URL'),    // picks up DATABASE_URL from .env
  },
  migrations: {
    path: 'prisma/migrations',
  },
  engine: 'classic',// for dev, can switch to binary later
});
