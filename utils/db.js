import mysql from "mysql2/promise";

// Create the MySQL connection pool
const db = mysql.createPool({
  // host: process.env.DB_HOST,
  // port: process.env.DB_PORT,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootpassword",
  database: "jobs_cms",
});
// console.log(process.env.DB_HOST);

// Add a debugging connection check
// async function checkConnection() {
//   try {
//     const [rows] = await db.query("SELECT 1");
//     console.log("Database connection successful:", rows);
//   } catch (error) {
//     console.error("Error connecting to the database:", error.message);
//   }
// }

// // Run the connection check
// checkConnection();

export default db;
