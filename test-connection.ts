import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// Using port 5432 directly
const connectionString = "postgresql://postgres.iukildbzvxrcsivgvlrm:Dvy1uAGWU5ZfyYSM@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres?connection_limit=1";

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    const data = await prisma.testimonial.findMany();
    console.log("Success! Found:", data.length);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
