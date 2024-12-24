import { PrismaClient } from "@prisma/client";

let db : PrismaClient;


let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!db) {
        db = new PrismaClient();
    }
    prisma = db;
}

export default prisma