import useService from "../service/userService";
const handleHelloWorld = (req, res) => {
  return res.render("home.ejs");
};

const handleUserPage = async (req, res) => {
  // Model : Get data from DATABASE
  const userList = await useService.getUserList();

  return res.render("user.ejs", {
    userList,
  });
};

const handleCreateNewUser = (req, res) => {
  let { email, password, username } = req.body;

  useService.createNewUser(email, password, username);

  return res.redirect("/user");
};

const handleDeleteUser = async (req, res) => {
  const id = req.params.id;
  await useService.deleteUser(id);

  return res.redirect("/user");
};

const getUpdateUserPage = async (req, res) => {
  const id = req.params.id;
  const user = await useService.updateUser(id);
  let userUpdate = {};
  if (user && user.length > 0) {
    userUpdate = user[0];
  }
  return res.render("user-update.ejs", { userUpdate });
};

const handleUpdateUser = async (req, res) => {
  let { email, username, id } = req.body;

  await useService.updateUserInfo(email, username, id);
  return res.redirect("/user");
};

module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleCreateNewUser,
  handleDeleteUser,
  getUpdateUserPage,
  handleUpdateUser,
};
