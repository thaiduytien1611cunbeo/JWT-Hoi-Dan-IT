import bcrypt from "bcryptjs";
// Get the client
import mysql from "mysql2/promise";
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);

  return hashPassword;
};

const createNewUser = async (email, password, username) => {
  let hashPassword = hashUserPassword(password);
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
  });

  try {
    const [users, fields] = await connection.execute(
      "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
      [email, hashPassword, username]
    );
  } catch (err) {
    console.log(1);
    console.log(err);
  }
};

const getUserList = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
  });
  try {
    const [users, fields] = await connection.execute("SELECT * FROM users");

    return users;
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
  });
  try {
    const [users, fields] = await connection.execute(
      "DELETE FROM users WHERE id=?",
      [id]
    );

    return users;
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
  });
  try {
    const [users, fields] = await connection.execute(
      "SELECT users.* FROM users WHERE users.id=?",
      [id]
    );

    return users;
  } catch (err) {
    console.log(err);
  }
};

const updateUserInfo = async (email, username, id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
  });

  try {
    const [users, fields] = await connection.execute(
      "UPDATE users SET email = ?, username = ? WHERE users.id=?",
      [email, username, id]
    );

    return users;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  updateUser,
  updateUserInfo,
};
