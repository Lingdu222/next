import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './app/server/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '123123',
    database: 'postgres',
    ssl: false,
  },
})
