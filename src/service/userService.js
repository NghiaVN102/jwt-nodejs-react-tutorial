import bcrypt from 'bcryptjs';
import mysql from "mysql2/promise";
import bluebird from 'bluebird';
import db from '../models/index';
// Create the connection to database, specify bluebird as promise

const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashPassword(password);

    try{
        await db.User.create({
            email: email,
            password: hashPass,
            username: username
        })
    } catch (err) {
        console.log(err);
    } 
}

const getUserList = async () => {
    const connection = await mysql.createConnection({host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird});

    try{
        const [rows, fields] = await connection.execute('SELECT * FROM user');
        return rows;
    } catch (err) {
        console.log(err);
    } 
}

const deleteUser = async (id) => {
    const connection = await mysql.createConnection({host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird});

    try{
        const [rows, fields] = await connection.execute('DELETE FROM user WHERE id = ?', [id]);
        return rows;
    } catch (err) {
        console.log(err);
    } 
}

const getUserById = async (id) =>{
    const connection = await mysql.createConnection({host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird});

    try{
        const [rows, fields] = await connection.execute('SELECT * FROM user WHERE id = ?', [id]);
        return rows;
    } catch (err) {
        console.log(err);
    } 
}

const updateUserInfor = async (email, username, id) => {
    const connection = await mysql.createConnection({host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird});

    try{
        const [rows, fields] = await connection.execute('UPDATE user SET email = ?, username = ? WHERE id = ?', [email, username, id]);
        return rows;
    } catch (err) {
        console.log(err);
    } 
}

module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUserInfor
}