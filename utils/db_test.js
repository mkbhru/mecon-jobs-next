const mysql = require("mysql2");

const connection = mysql.createConnection({
  // host: "localhost",
  // port: 3306,
  // user: "root",
  // password: "rootpassword",
  // database: "jobs_cms",
  host: "mysql-12597ac8-manishmpib-e39d.g.aivencloud.com",
  port: 28682,
  user: "avnadmin",
  password: "AVNS_8AqbwFtQj3tjh3GPcrH",
  database: "jobs_cms",
});

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});
