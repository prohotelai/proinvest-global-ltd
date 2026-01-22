import { PrismaClient } from '@/lib/generated/prisma';
import { PrismaLibSql } from '@prisma/adapter-libsql';

// PrismaClient is attached to the `globalThis` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const databaseUrl = process.env.DATABASE_URL || 'file:./dev.db';
  
  try {
    const adapter = new PrismaLibSql({ url: databaseUrl });
    
    return new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  } catch (error) {
    console.error('Failed to create Prisma client with database URL:', databaseUrl);
    console.error('Error:', error instanceof Error ? error.message : error);
    throw new Error(
      `Database configuration error. Please check DATABASE_URL environment variable. ` +
      `Expected format: "file:./path/to/db.db" for SQLite or a LibSQL connection URL.`
    );
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
