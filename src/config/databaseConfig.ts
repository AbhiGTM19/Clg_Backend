import { createPool, Pool, PoolOptions } from 'mysql2';

// Extracting only specific function from mysql module
const { DB_PORT, DB_HOST, DB_USER, DB_PASS, MYSQL_DB } = process.env;

// Manage parallel connections to work on the database
const poolConfig: PoolOptions = {
  port: 3308,
  host: "localhost",
  user: "root",
  password: "",
  database: "User_Auth",
  connectionLimit: 10,
};

const pool: Pool = createPool(poolConfig);

/*To check if the connection is getting established ->
 pool.getConnection((err, cnn) => {
  console.log("connection error")
  console.log(err);
  console.log("connection error end")
})
 */
export default pool;
