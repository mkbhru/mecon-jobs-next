import mysql from "mysql2/promise";

const db = mysql.createPool({
  // host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  host: "127.0.0.1", // or localhost
  user: "rec_section",
  password: "Mecon@123",
  database: "jobs_cms"
});

export default db;
