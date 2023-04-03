import mysql from "mysql2"
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DBHost,
  user: process.env.DBUser,
  password: process.env.DBPassword,
  database: process.env.DBdb,
  
}).promise();

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }

  console.log('Connected to MySQL database.');
});

export default connection;