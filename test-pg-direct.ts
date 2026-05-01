import { Client } from "pg";

const connectionString = "postgresql://postgres:Dvy1uAGWU5ZfyYSM@db.iukildbzvxrcsivgvlrm.supabase.co:5432/postgres";

async function main() {
  const client = new Client({ connectionString });
  try {
    console.log("Connecting direct db domain...");
    await client.connect();
    console.log("Connected directly to db domain!");
    const res = await client.query('SELECT NOW()');
    console.log("Time:", res.rows[0]);
  } catch (err) {
    console.error("Error connecting:", err);
  } finally {
    await client.end();
  }
}

main();
