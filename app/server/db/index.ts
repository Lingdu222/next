import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

// 创建postgres连接
const client = new Pool({
  connectionString: process.env.DATABASE_URL,
})

// 创建drizzle实例
export const db = drizzle(client, { schema })

// 导出schema以便在其他地方使用
export * from './schema'
