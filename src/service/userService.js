import bcrypt from "bcryptjs";
// Get the client
import mysql from "mysql2";
const salt = bcrypt.genSaltSync(10);

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "jwt",
});

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);

  return hashPassword;
};

const createNewUser = (email, password, username) => {
  let hashPassword = hashUserPassword(password);

  // A simple SELECT query
  connection.query(
    "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
    [email, hashPassword, username],
    function (err, results, fields) {
      console.log(results); // results contains rows returned by server
    }
  );
};

const getUserList = () => {
  const users = [];
  connection.query("SELECT * FROM users", function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    console.log(results);
  });
};

module.exports = {
  createNewUser,
  getUserList,
};
