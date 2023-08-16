import { AnyPgColumn, integer, pgTable, primaryKey, serial, text, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    username: varchar('username', { length: 30 }).notNull(),
    email: varchar('email', { length: 30 }).notNull(),
    password: varchar('password', { length: 255 }).notNull(),
    fullName: text('full_name').notNull(),
    age: integer('age').notNull(),
    gender: varchar('gender', { length: 10 }).notNull(),
});


export const userData = pgTable('userData', {
    userId: integer('user_id').notNull().references((): AnyPgColumn => users.id),
    key: varchar('key', { length: 30 }).notNull(),
    value: varchar('value', { length: 30 }).notNull(),
}, (table) => {
    return {
      pk: primaryKey(table.userId, table.key),
    };
});