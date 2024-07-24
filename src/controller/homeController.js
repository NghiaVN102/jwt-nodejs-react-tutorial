import userService from '../service/userService';

const hanleHelloWorld = (req, res) => {
    return res.render("home.ejs");
}

const handleUserPage = async (req, res) => {
    let userList = await userService.getUserList();
    return res.render("user.ejs", { userList });
}


const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    // userService.createNewUser(email, password, username);
    userService.getUserList();
    return res.send("handleCreateNewUser");
}

module.exports = {
    hanleHelloWorld, handleUserPage, handleCreateNewUser
}