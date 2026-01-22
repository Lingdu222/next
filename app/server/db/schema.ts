import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
/**
 * 需要通过定义 TypeScript 模型来创建数据库表
 * 使用 drizzle-orm 中的函数来定义表和列
 */
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});