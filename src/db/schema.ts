import { integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    username: varchar('username', { length: 30 }).notNull(),
    email: varchar('email', { length: 30 }).notNull(),
    password: varchar('password', { length: 30 }).notNull(),
    fullName: text('full_name').notNull(),
    age: integer('age').notNull(),
    gender: varchar('gender', { length: 10 }).notNull(),
});


export const userData = pgTable('userData', {
    key: varchar('key', { length: 30 }).primaryKey().notNull(),
    value: varchar('value', { length: 30 }).notNull(),
});
