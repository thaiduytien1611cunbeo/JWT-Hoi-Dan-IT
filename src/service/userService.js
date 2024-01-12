import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
import db from "../models/index";

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);

  return hashPassword;
};

const createNewUser = async (email, password, username) => {
  let hashPassword = hashUserPassword(password);
  await db.User.create({
    username,
    email,
    password: hashPassword,
  });
};

const getUserList = async () => {
  let user = [];
  user = await db.User.findAll();

  return user;
};

const deleteUser = async (userId) => {
  await db.User.destroy({
    where: {
      id: userId,
    },
  });
};

const updateUser = async (id) => {
  let user = {};
  user = await db.User.findOne({
    where: { id: id },
  });

  return user;
};

const updateUserInfo = async (email, username, id) => {
  await db.User.update(
    { email, username },
    {
      where: { id: id },
    }
  );
};

module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  updateUser,
  updateUserInfo,
};
