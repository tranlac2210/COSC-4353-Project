import mysql from "mysql2"
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DBHost,
  user: process.env.DBUser,
  password: process.env.DBPassword,
  database: process.env.DBdb,
  
}).promise();

export default pool;