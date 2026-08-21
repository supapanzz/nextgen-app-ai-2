// src/lib/prisma.ts
import "dotenv/config"
import { PrismaMariaDb } from "@prisma/adapter-mariadb"
import { PrismaClient } from "../../generated/prisma/client"

const adapter = process.env.DATABASE_URL ? new PrismaMariaDb(process.env.DATABASE_URL) : undefined;

const prismaClientSingleton = () => {
  if (adapter) {
    return new PrismaClient({ adapter })
  }
  return new PrismaClient({ adapter: undefined as any })
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma

export default prisma