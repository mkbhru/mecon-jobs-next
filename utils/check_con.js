import mysql from "mysql2";

const db = mysql.createConnection({
  host: "127.0.0.1", // or localhost
  user: "rec_section",
  password: "Mecon@123",
  database: "jobs_cms",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: ", err.stack);
    return;
  }
  console.log("Connected to database");
});
