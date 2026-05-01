import { Client } from "pg";

// Using IPv4 IP address instead of domain
const connectionString = "postgresql://postgres.iukildbzvxrcsivgvlrm:Dvy1uAGWU5ZfyYSM@13.213.241.248:5432/postgres";

async function main() {
  const client = new Client({ connectionString });
  try {
    console.log("Connecting to IPv4 IP directly...");
    await client.connect();
    console.log("Connected directly to IP!");
    const res = await client.query('SELECT NOW()');
    console.log("Time:", res.rows[0]);
  } catch (err) {
    console.error("Error connecting:", err);
  } finally {
    await client.end();
  }
}

main();
