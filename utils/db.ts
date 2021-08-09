import { Client } from "pg";

export const db = new Client(process.env.DATABASE_URL);

db.connect();
