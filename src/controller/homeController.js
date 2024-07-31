import userService from '../service/userService';

const hanleHelloWorld = (req, res) => {
    return res.render("home.ejs");
}

const handleUserPage = async (req, res) => {
    let userList = await userService.getUserList();
    await userService.deleteUser(4);
    return res.render("user.ejs", { userList });
}


const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    userService.createNewUser(email, password, username);
    userService.getUserList();
    return res.redirect("/user");
}

const handleDeleteUser = (req, res) => {
    userService.deleteUser(req.params.id);
    return res.redirect("/user");
}

module.exports = {
    hanleHelloWorld, handleUserPage, handleCreateNewUser, handleDeleteUser
}