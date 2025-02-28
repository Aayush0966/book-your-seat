import { PrismaClient } from "@prisma/client";

let db: PrismaClient | undefined;

let prisma: PrismaClient;

if (process.env.APP_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!db) {
        db = new PrismaClient();
    }
    prisma = db;
}

export default prisma