import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import dns from "dns";

// Force IPv4 to prevent connection hangs on dual-stack systems
dns.setDefaultResultOrder("ipv4first");

// Use DIRECT_URL (port 5432) as the pooler port (6543) is unreachable locally
const connectionString =
  process.env.DIRECT_URL || process.env.DATABASE_URL || "";

const pool = new Pool({
  connectionString,
  connectionTimeoutMillis: 5000,
});
const adapter = new PrismaPg(pool);

const prismaClientSingleton = () => {
  return new PrismaClient({ adapter });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
