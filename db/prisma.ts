import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = `${process.env.DATABASE_URL}`;

// Instantiates the Prisma adapter using the Neon connection pool
const adapter = new PrismaPg({ connectionString });

export const prisma = new PrismaClient({ adapter });