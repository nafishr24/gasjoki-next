import { Client } from "pg";

const connectionString = "postgresql://postgres.iukildbzvxrcsivgvlrm:Dvy1uAGWU5ZfyYSM@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres";

async function main() {
  const client = new Client({ connectionString });
  try {
    console.log("Connecting...");
    await client.connect();
    console.log("Connected to 5432!");
    const res = await client.query('SELECT NOW()');
    console.log("Time:", res.rows[0]);
  } catch (err) {
    console.error("Error connecting 5432:", err);
  } finally {
    await client.end();
  }
}

main();
